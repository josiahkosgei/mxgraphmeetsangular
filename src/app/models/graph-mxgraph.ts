import { getItemByType } from './graph-item';
import { GraphItemTypes } from './graph-item-types.enum';

const mx = require('mxgraph')();

export const { mxGraph, mxEvent, mxCell, mxGeometry, mxEditor, mxImage, mxToolbar,
  mxStackLayout, mxLayoutManager, mxGraphModel, mxSwimlaneManager,
  mxObjectCodec, mxUtils, mxPerimeter, mxConstants, mxPanningManager,
  mxEdgeStyle, mxPoint, mxCellRenderer, mxResources, mxDragSource } = mx;
export class FieldmxResources {
  constructor() {
  }
  static changes() {
    return mxResources.get('changesLost');
  }
}

export interface GraphGraphData {
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
    super();
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
  readonly width: number = 32;
  readonly height: number = 32;
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
    this.graph.setConnectable(true);
    this.graph.setAllowDanglingEdges(false);
    this.graph.allowAutoPanning = true;
    this.graph.timerAutoScroll = true;
    this.graph.dropEnabled = true;
    this.graph.connectionHandler.connectImage = new mxImage('../assets/icons/gif/connector.gif', 16, 16);
    this.onInit();
  }
  onInit() {

    this.graph.createPanningManager = function() {
      const pm = new mxPanningManager(this);
      pm.border = 30;

      return pm;
    };
    // Auto-resizes the container
    this.graph.border = 80;
    this.graph.getView().translate = new mxPoint(this.graph.border / 2, this.graph.border / 2);
    this.graph.setResizeContainer(true);

    this.styling();
    this.graph.alternateEdgeStyle = 'elbow=vertical';

    if (this.graph.isEnabled()) {
      const that = this;
      this.graph.setConnectable(true);
      this.graph.setAllowDanglingEdges(false);
      const previousIsValidSource = this.graph.isValidSource;

      this.graph.isValidSource = function(cell) {
        if (cell) {
          if (previousIsValidSource.apply(this, arguments)) {
            const style = that.graph.getModel().getStyle(cell);
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
      this.graph.isValidDropTarget = function(target, cells, evt) {
        if (this.isSplitEnabled() && this.isSplitTarget(target, cells, evt)) {
          return true;
        }

        const model = this.getModel();
        let lane = false;
        let pool = false;
        let cell = false;

        // Checks if any lanes or pools are selected
        if (cells) {
          for (const [i, v] of cells.entries()) {
            const tmp = model.getParent(cells[i]);
            lane = lane || this.isPool(tmp);
            pool = pool || this.isPool(cells[i]);

            cell = cell || !(lane || pool);
          }
        }

        return !pool && cell != lane && ((lane && this.isPool(target)) ||
          (cell && this.isPool(model.getParent(target))));
      };

      // Adds new method for identifying a pool
      this.graph.isPool = (cell) => {
        const parent = this.graph.getModel().getParent(cell);
        return parent != null && this.graph.getModel().getParent(parent) === this.graph.getModel().getRoot();
      };

      // Changes swimlane orientation while collapsed

      this.graph.model.getStyle = function(cell) {
        let style = mxGraphModel.prototype.getStyle.apply(this, arguments);
        // console.log('style=>', style);
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
    mxCellRenderer.prototype.rotateLabelBounds = function(state, bounds) {
      bounds.y -= state.text.margin.y * bounds.height;
      bounds.x -= state.text.margin.x * bounds.width;

      if (!this.legacySpacing || (state.style[mxConstants.STYLE_OVERFLOW] != 'fill'
      && state.style[mxConstants.STYLE_OVERFLOW] != 'width')) {
        const s = state.view.scale;
        const spacing = state.text.getSpacing();
        bounds.x += spacing.x * s;
        bounds.y += spacing.y * s;

        const hpos = mxUtils.getValue(state.style, mxConstants.STYLE_LABEL_POSITION, mxConstants.ALIGN_CENTER);
        const vpos = mxUtils.getValue(state.style, mxConstants.STYLE_VERTICAL_LABEL_POSITION, mxConstants.ALIGN_MIDDLE);
        const lw = mxUtils.getValue(state.style, mxConstants.STYLE_LABEL_WIDTH, null);

        // tslint:disable-next-line: max-line-length
        bounds.width = Math.max(0, bounds.width - ((hpos === mxConstants.ALIGN_CENTER && lw == null) ?
        (state.text.spacingLeft * s + state.text.spacingRight * s) : 0));

        bounds.height = Math.max(0, bounds.height - ((vpos === mxConstants.ALIGN_MIDDLE) ?
        (state.text.spacingTop * s + state.text.spacingBottom * s) : 0));
      }

      const theta = state.text.getTextRotation();

      // Only needed if rotated around another center
      if (theta !== 0 && state != null && state.view.graph.model.isVertex(state.cell)) {
        const cx = state.getCenterX();
        const cy = state.getCenterY();

        if (bounds.x != cx || bounds.y != cy) {
          const rad = theta * (Math.PI / 180);
          const pt = mxUtils.getRotatedPoint(new mxPoint(bounds.x, bounds.y),
            Math.cos(rad), Math.sin(rad), new mxPoint(cx, cy));

          bounds.x = pt.x;
          bounds.y = pt.y;
        }
      }

    };

    mxToolbar.prototype.addMode = function(title, icon, funct, pressedIcon, style, toggle) {

      toggle = (toggle != null) ? toggle : true;
      const img: any = document.createElement((icon != null) ? 'img' : 'button');

      img.initialClassName = style || 'mxToolbarMode';
      img.className = img.initialClassName;
      img.setAttribute('src', icon);
      img.altIcon = pressedIcon;

      if (title != null) {
        img.setAttribute('title', title);
      }

      if (this.enabled && toggle) {
        mxEvent.addListener(img, 'click', mxUtils.bind(this, function(evt) {
          this.selectMode(img, funct);
          this.noReset = false;
        }));

        mxEvent.addListener(img, 'dblclick', mxUtils.bind(this, function(evt) {
          this.selectMode(img, funct);
          this.noReset = true;
        }));

        if (this.defaultMode == null) {
          this.defaultMode = img;
          this.defaultFunction = funct;
          this.selectMode(img, funct);
        }
      }
      const closedDiv: any = document.createElement('div');
      closedDiv.setAttribute('class', 'drag-item');

      const closeSpan = document.createElement('span');
      closeSpan.textContent = title;

      closedDiv.appendChild(img);
      closedDiv.appendChild(closeSpan);
      this.container.appendChild(closedDiv);

      return img;
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

