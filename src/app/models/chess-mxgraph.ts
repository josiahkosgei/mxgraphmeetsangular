import { getItemByType } from './graph-item';
import { GraphItemTypes } from './graph-item-types.enum';
import MxGraphFactory, { mxgraph } from 'mxgraph';

const localMxgraph = require('mxgraph')();

const { mxGraph, mxEvent, mxCell, mxGeometry, mxEditor, mxImage,
  mxStackLayout, mxLayoutManager, mxGraphModel, mxSwimlaneManager,
  mxObjectCodec, mxUtils, mxPerimeter, mxConstants, mxPanningManager,
  mxEdgeStyle, mxPoint } = localMxgraph;

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
export class FieldmxPoint extends mxPoint {
  constructor(width, height) {
    super(width, height);
  }
}
export class GraphItemEdge extends mxCell {
  private _target: GraphItemVertex;
  private _source: GraphItemVertex;
  private _name = '';
  parent: any;
  style: string;

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
    this.style = style != null ? style : 'defaultEdge;verticalAlign=top;verticalLabelPosition=bottom;edgeStyle=orthogonalEdgeStyle;rounded=1;fontColor=black';
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
  connectable: boolean;
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
  x: number;
  y: number;
  readonly width: number = 60;
  readonly height: number = 60;
  name: string;
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
export class FieldMxgraph extends mxGraph {
  border: number;
  timerAutoScroll: boolean;
  centerZoom: boolean;
  swimlaneNesting: boolean;
  constructor(node: HTMLElement) {
    super(node);
    mxEvent.disableContextMenu(node);

    this.setConnectable(true);
    this.timerAutoScroll = true;
    this.setPanning(true);
    this.centerZoom = true;
    this.setDropEnabled(true);
    // this.swimlaneNesting = false;
    this.connectionHandler.connectImage = new mxImage('../assets/icons/gif/connector.gif', 16, 16);
    // this.styling();
    // this.minFitScale = null;
  }
  insertEdge(parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style) {
    return this.addCell(new GraphItemEdge({ parent, id, value, style, target, source }));
  }
  createEdge(parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style) {
    this.addCell(new GraphItemEdge({ parent, id, value, style, target, source }));
  }
  addListenerCHANGE(func: Function) {
    this.getModel().addListener(mxEvent.CHANGE, func);
  }
  addListenerCELL_CONNECTED(func: Function) {
    this.getModel().addListener(mxEvent.CELL_CONNECTED, func);
  }
  removeListenerCHANGE() {
    mxEvent.removeAllListeners(mxEvent.CHANGE);
  }
  selectedModel(func: Function) {
    this.getSelectionModel().addListener(mxEvent.CHANGE, func);
  }
  toJSON(): ChessGraphData {
    const grouping = [];
    const cells = Object.values<GraphItemVertex | GraphItemEdge>(this.model.cells);
    for (const [i, v] of cells.entries()) {
      const tmp = this.model.getParent(cells[i]);
      if (cells[i].vertex && (this.isPool(tmp) || this.isPool(cells[i]))) {
        grouping.push(cells[i]);
      }
    }
    return {
      grouping,
      graph: cells.filter((item) => item instanceof GraphItemVertex).map((item: GraphItemVertex) => item.toJSON()),
    };
  }
}
export class FieldMxEditor extends mxEditor {
  defaultGroup: string;
  defaultEdge: string;
  layoutDiagram: boolean;
  maintainSwimlanes: boolean;
  swimlaneRequired: boolean;
  forcedInserting: boolean;
  graph: any;
  model: any;
  constructor(node: HTMLElement) {
    const config = mxUtils.load(
      '../assets/mxgraph/config/keyhandler-commons.xml').
      getDocumentElement();
    super(config);
    this.maintainSwimlanes = true;
    this.swimlaneRequired = true;
    this.forcedInserting = true;
    const editor = this;
    editor.setGraphContainer(node);
    this.graph = editor.graph;
    this.model = this.graph.getModel();
    this.onInit();
    this.graph.connectionHandler.connectImage = new mxImage('../assets/icons/gif/connector.gif', 16, 16);

  }
  onInit() {

    this.graph.createPanningManager = () => {
      const pm = new mxPanningManager(this);
      pm.border = 30;

      return pm;
    };
    // Auto-resizes the container
    this.graph.border = 80;
    this.graph.getView().translate = new mxPoint(this.graph.border / 2, this.graph.border / 2);
    this.graph.setResizeContainer(true);

    this.styling();
    // Installs double click on middle control point and
    // changes style of edges between empty and this value
    this.graph.alternateEdgeStyle = 'elbow=vertical';
    // Adds automatic layout and various switches if the
    // graph is enabled
    if (this.graph.isEnabled()) {
      // Allows new connections but no dangling edges
      this.graph.setConnectable(true);
      this.graph.setAllowDanglingEdges(false);
      // End-states are no valid sources
      const previousIsValidSource = this.graph.isValidSource;

      this.graph.isValidSource = (cell) => {
        if (cell) {
          if (previousIsValidSource.apply(cell, arguments)) {
            const style = this.graph.getModel().getStyle(cell);
            return style == null || !(style === 'end' || style.indexOf('end') === 0);
          }
          return false;
        }
      };

      this.graph.isValidTarget = (cell) => {
        const style = this.graph.getModel().getStyle(cell);

        return !this.graph.getModel().isEdge(cell) && !this.graph.isSwimlane(cell) &&
          (style == null || !(style === 'state' || style.indexOf('state') === 0));
      };
      // cells on edges to split edges
      this.graph.setDropEnabled(true);
      this.graph.setSplitEnabled(false);
      // Returns true for valid drop operations
      this.graph.isValidDropTarget = (target, cells, evt) => {
        if (this.graph.isSplitEnabled() && this.graph.isSplitTarget(target, cells, evt)) {
          return true;
        }

        let lane = false;
        let pool = false;
        let cell = false;

        // Checks if any lanes or pools are selected
        for (const [i, v] of cells.entries()) {
          const tmp = this.graph.getModel().getParent(cells[i]);
          lane = lane || this.graph.isPool(tmp);
          pool = pool || this.graph.isPool(cells[i]);
          cell = cell || !(lane || pool);
        }
        return !pool && cell !== lane && ((lane && this.graph.isPool(target)) ||
          (cell && this.graph.isPool(this.graph.getModel().getParent(target))));
      };

      // Adds new method for identifying a pool
      this.graph.isPool = (cell) => {
        const parent = this.graph.getModel().getParent(cell);
        return parent != null && this.graph.getModel().getParent(parent) === this.graph.getModel().getRoot();
      };

      // Changes swimlane orientation while collapsed
      const that = this;
      this.graph.model.getStyle = function(cell){
        let style = mxGraphModel.prototype.getStyle.apply(this, arguments);
        if (that.graph.isCellCollapsed(cell)) {
          if (style != null) {
            style += ';';
          } else {
            style = '';
          }

          style += 'horizontal=1;align=left;spacingLeft=14;';
        }
        return style;
      };
      // Keeps widths on collapse/expand
      const foldingHandler = (sender, evt) => {
        const cells = evt.getProperty('cells');
        for (const [i, v] of cells.entries()) {
          const geo = this.graph.model.getGeometry(cells[i]);

          if (geo.alternateBounds != null) {
            geo.width = geo.alternateBounds.width;
          }
        }
      };
      this.graph.addListener(mxEvent.FOLD_CELLS, foldingHandler);

      this.graph.insertCustomEdge = (parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style) => {
        return this.graph.addCell(new GraphItemEdge({ parent, id, value, style, target, source }));
      };
      this.graph.addListenerCHANGE = (func: Function) => {
        this.graph.getModel().addListener(mxEvent.CHANGE, func);
      };
      this.graph.addListenerCELL_CONNECTED = (func: Function) => {
        this.graph.getModel().addListener(mxEvent.CELL_CONNECTED, func);
      };
      this.graph.removeListenerCHANGE = () => {
        mxEvent.removeAllListeners(mxEvent.CHANGE);
      };
      this.graph.selectedModel = (func: Function) => {
        this.graph.getSelectionModel().addListener(mxEvent.CHANGE, func);
      };
    }

    // Applies size changes to siblings and parents
    new mxSwimlaneManager(this.graph);

    // Creates a stack depending on the orientation of the swimlane
    const layout = new mxStackLayout(this.graph, false);

    // Makes sure all children fit into the parent swimlane
    layout.resizeParent = true;

    // Applies the size to children if parent size changes
    layout.fill = true;

    // Only update the size of swimlanes
    layout.isVertexIgnored = (vertex) => {
      return !this.graph.isSwimlane(vertex);
    };

    // Keeps the lanes and pools stacked
    const layoutMgr = new mxLayoutManager(this.graph);

    layoutMgr.getLayout = (cell) => {
      if (!this.graph.model.isEdge(cell) && this.graph.getModel().getChildCount(cell) > 0 &&
        (this.model.getParent(cell) === this.model.getRoot() || this.graph.isPool(cell))) {
        layout.fill = this.graph.isPool(cell);

        return layout;
      }

      return null;
    };

  }
  styling() {


    // Changes the default vertex style in-place
    let style = this.graph.getStylesheet().getDefaultVertexStyle();
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_SWIMLANE;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'white';
    style[mxConstants.STYLE_FONTSIZE] = 11;
    style[mxConstants.STYLE_STARTSIZE] = 22;
    style[mxConstants.STYLE_HORIZONTAL] = false;
    style[mxConstants.STYLE_FONTCOLOR] = 'black';
    style[mxConstants.STYLE_STROKECOLOR] = 'black';
    delete style[mxConstants.STYLE_FILLCOLOR];

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
    style[mxConstants.STYLE_FONTSIZE] = 10;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_HORIZONTAL] = true;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    delete style[mxConstants.STYLE_STARTSIZE];
    style[mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
    this.graph.getStylesheet().putCellStyle('process', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
    delete style[mxConstants.STYLE_ROUNDED];
    this.graph.getStylesheet().putCellStyle('state', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RHOMBUS;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RhombusPerimeter;
    style[mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
    style[mxConstants.STYLE_SPACING_TOP] = 40;
    style[mxConstants.STYLE_SPACING_RIGHT] = 64;
    this.graph.getStylesheet().putCellStyle('condition', style);

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_DOUBLE_ELLIPSE;
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.EllipsePerimeter;
    style[mxConstants.STYLE_SPACING_TOP] = 28;
    style[mxConstants.STYLE_FONTSIZE] = 14;
    style[mxConstants.STYLE_FONTSTYLE] = 1;
    delete style[mxConstants.STYLE_SPACING_RIGHT];
    this.graph.getStylesheet().putCellStyle('end', style);

    style = this.graph.getStylesheet().getDefaultEdgeStyle();
    style[mxConstants.STYLE_EDGE] = mxEdgeStyle.ElbowConnector;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_BLOCK;
    style[mxConstants.STYLE_ROUNDED] = true;
    style[mxConstants.STYLE_FONTCOLOR] = 'black';
    style[mxConstants.STYLE_STROKECOLOR] = 'black';

    style = mxUtils.clone(style);
    style[mxConstants.STYLE_DASHED] = true;
    style[mxConstants.STYLE_ENDARROW] = mxConstants.ARROW_OPEN;
    style[mxConstants.STYLE_STARTARROW] = mxConstants.ARROW_OVAL;
    this.graph.getStylesheet().putCellStyle('crossover', style);

  }
}

