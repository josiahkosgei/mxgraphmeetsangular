import { GraphItemTypes } from './graph-item-types.enum';
import { getItemByType } from './graph-item';
import { mxgraph } from 'mxgraph';
import MxGraphFactory from 'mxgraph';

const _mxgraph: typeof mxgraph = MxGraphFactory({});
const { mxGraph, mxEvent, mxCell, mxGeometry, mxEditor, mxImage, mxStackLayout, mxLayoutManager,
  mxGraphModel, mxSwimlaneManager, mxObjectCodec, mxUtils, mxPerimeter, mxConstants, mxPanningManager } = _mxgraph;

class JsonCodec extends mxObjectCodec {
  constructor() {
    super(null, null, null, null);
  }
  encode(value) {
    const xmlDoc = mxUtils.createXmlDocument();
    const newObject = xmlDoc.createElement('Object');
    // tslint:disable-next-line: forin
    for (const prop in value) {
      newObject.setAttribute(prop, value[prop]);
    }
    return newObject;
  }
  decode(model) {
    return Object.keys(model.cells).map(
      (iCell) => {
        const currentCell = model.getCell(iCell);
        return (currentCell.value !== undefined) ? currentCell : null;
      }
    ).filter((item) => (item !== null));
  }
  animate(model) {
    return Object.keys(model.cells).map(
      (iCell) => {
        const currentCell = model.getCell(iCell);
        if (currentCell) {
          return (currentCell.value !== undefined) ? currentCell : null;
        }
      }
    ).filter((item) => (item !== null));
  }
}
export interface ChessGraphData {
  graph: any[];
  grouping: any[];
}
interface GraphItemVertexData {
  id?: string;
  value: string;
  x: number;
  y: number;
  style: string;
  graphItemType: GraphItemTypes;
}
export class ChessMxCell extends mxCell {

}
export class GraphItemEdge extends mxCell {
  private _target: GraphItemVertex;
  private _source: GraphItemVertex;
  private _name = '';

  constructor({ parent, id, value, source, target, style }:
    { parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style: string }) {
    super(null, new mxGeometry(), '');
    this.setEdge(true);
    if (id) {
      this.setId(id);
    }
    // this.geometry.relatibe = true;

    this.value = value;
    this.cellSource = source;
    this.cellTarget = target;
    this.parent = parent;
    this.style = style != null ? style
      : 'defaultEdge;verticalAlign=top;verticalLabelPosition=bottom;edgeStyle=orthogonalEdgeStyle;rounded=1;fontColor=black';
  }

  get value(): string {
    return this._name;
  }
  set value(val: string) {
    this._name = val;
  }

  get cellSource(): GraphItemVertex {
    return this._source;
  }
  set cellSource(s: GraphItemVertex) {
    this._source = s;
  }

  get cellTarget(): GraphItemVertex {
    return this._target;
  }
  set cellTarget(t: GraphItemVertex) {
    this._target = t;
  }

  toJSON(): object {
    return this;
  }
}
export abstract class GraphItemVertex extends mxCell {
    constructor({ id, value, x = 0, y = 0, style, graphItemType: graphItemType }:
    { id?: string, value: string, x: number, y: number, style: string, graphItemType: GraphItemTypes }) {
    super(null, new mxGeometry(0, 0, 100, 100), '');
    this.setVertex(true);
    if (id) {
      this.setId(id);
    }
    this.x = x;
    this.y = y;
    // this.graphItemType = graphItemType;
    this.value = value;
    this.connectable = true;
    this.setStyle(style);
  }

  get cellGeometry() {
    return new mxGeometry(this.x, this.y, this.width, this.height);
  }
  set cellGeometry({ x, y }: { x: number, y: number }) {
    this.x = x;
    this.y = y;
  }
  get value(): string {
    return this.name;
  }
  set value(newName: string) {
    this.name = newName;
  }


  abstract get type(): GraphItemTypes;
  private x: number;
  private y: number;
  private readonly width: number = 60;
  private readonly height: number = 60;
  private name: string;
  static getItem({ id, value, x = 0, y = 0, style, graphItemType }: GraphItemVertexData): GraphItemVertex {
    // tslint:disable-next-line: no-use-before-declare
    const genericItem = new GenericGraphItem<any>({ id, value, x, y, style, graphItemType });
    return genericItem;
  }

  toJSON(): object {
    return this;
  }
}
class GenericGraphItem<T> extends GraphItemVertex {
  private graphItemType: any = null;
  get type(): GraphItemTypes {
    return getItemByType(this.graphItemType);
  }
  set type(itemType) {
    this.graphItemType = itemType;
  }
}
export class ChessMxgraph extends mxGraph {
  constructor(node: HTMLElement) {
    super(node);
    mxEvent.disableContextMenu(node);
    this.setConnectable(true);
    //  this.allowAutoPanning = true;
    this.timerAutoScroll = true;
    // this.snapToTerminals = true;
    // this.graphHandler.guidesEnabled = true;
    this.setPanning(true);
    this.centerZoom = true;
    this.setDropEnabled(true);
    //  this.alternateEdgeStyle = 'elbow=vertical';
    this.swimlaneNesting = false;
    this.connectionHandler.connectImage = new mxImage('../assets/icons/gif/connector.gif', 16, 16);
    this.styling();
    this.minFitScale = null;
  }

  insertEdge(parent: ChessMxCell, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style) {
    this.addCell(new GraphItemEdge({ parent, id, value, style, target, source }));
  }

  createEdge(parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style) {
    this.addCell(new GraphItemEdge({ parent, id, value, style, target, source }));
  }

  insertModel() {
  }
  toJSON(): ChessGraphData {
    const grouping = [];
    const cells = Object.values<GraphItemVertex | GraphItemEdge>(this.model.cells);
    for (let i = 0; i < cells.length; i++) {
      const tmp = this.model.getParent(cells[i]);
      if (cells[i].vertex) {
        grouping.push(cells[i]);
      }
    }
    return {
      grouping,
      graph: cells.filter((item) => item instanceof GraphItemVertex).map((item: GraphItemVertex) => item.toJSON()),
    };
  }
  getJsonModel() {
    const encoder = new JsonCodec();
    const jsonNodes = encoder.decode(this.getModel());
    return {
      graph: jsonNodes
    };
  }
  animateJsonModel(vertices: number[]) {
    const encoder = new JsonCodec();
    const jsonNodes = encoder.animate(this.getModel());
    const filtereded = jsonNodes.filter((item) => {
      return vertices.includes(Number(item.id));
    });
    return {
      graph: filtereded
    };
  }
  generateJsonModel() {
    const jsonNodes = this.getJsonModel();
    return jsonNodes; // this.stringifyWithoutCircular(jsonNodes);
  }
  addListenerCHANGE(func: Function) {
    this.getModel().addListener(mxEvent.CHANGE, func);
  }
  addListenerCELL_CONNECTED(func: Function) {
    this.getModel().addListener(mxEvent.CELL_CONNECTED, func);
  }
  ramoveListenerCHANGE() {
    mxEvent.removeAllListeners(mxEvent.CHANGE);
  }
  selectedModel(func: Function) {
    this.getSelectionModel().addListener(mxEvent.CHANGE, func);
  }
  styling() {
    // Changes the default vertex style in-place
    let style = this.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_FONTSIZE] = 11;
    style[mxConstants.STYLE_STARTSIZE] = 22;
    style[mxConstants.STYLE_FOLDABLE] = false;
    style[mxConstants.STYLE_FONTCOLOR] = 'black';
    style[mxConstants.STYLE_STROKECOLOR] = 'black';
    delete style[mxConstants.STYLE_FILLCOLOR];

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
    style[mxConstants.STYLE_SPACING_TOP] = 28;
    style[mxConstants.STYLE_FONTSIZE] = 14;
    style[mxConstants.STYLE_FONTSTYLE] = 1;
    delete style[mxConstants.STYLE_SPACING_RIGHT];
    this.getStylesheet().putCellStyle('end', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_DASHED] = true;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
    this.getStylesheet().putCellStyle('crossover', style);
  }
}
