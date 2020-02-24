import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ChessService } from '../../services/chess.service';
import { GraphItemVertex, FieldMxEditor, FieldmxPoint, mxToolbar, mxUtils, mxCell, mxGeometry } from '../../models/chess-mxgraph';
import { environment } from '../../../environments/environment';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-mxgraph',
  templateUrl: './mxgraph.component.html',
  styleUrls: ['./mxgraph.component.scss']
})

export class MxgraphComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef,
              private chessService: ChessService) { }
  graph: any;
  editor: FieldMxEditor;
  lane2b: any;
  toolbar: any;

  ngOnInit() {
    this.initGrph(this.elementRef.nativeElement.querySelector('.mxg-wrap'));
  }
  ngAfterViewInit() {
    this.toolbar = new mxToolbar(document.getElementById('graph-item-list-parent'));
    this.toolbar.enabled = false;
    this.addVertex('../assets/icons/svg/003-sword.svg', 32, 32,  `shape=image;image=../assets/icons/svg/003-sword.svg;verticalAlign=bottom;verticalLabelPosition=bottom;horizontal=1;portConstraint=eastwestsouthnorth`);

  }
  dropItem(e: MouseEvent) {
    if (this.chessService.dragItem && this.chessService.dragItem.graphItem) {

      const dragItem = this.chessService.dragItem.graphItem;
      const { offsetX: x, offsetY: y }: { offsetX: number; offsetY: number } = e;
      let svgIconPath = '';
      if (!environment.production) {
        svgIconPath = dragItem.svgIconPath.replace('../assets/', '/assets/');
      } else {
        svgIconPath = dragItem.svgIconPath;
      }
      const item: GraphItemVertex = GraphItemVertex.getItem({
        x, y, value: dragItem.title, style: `shape=image;image=${
          svgIconPath};verticalAlign=bottom;verticalLabelPosition=bottom;horizontal=1;portConstraint=eastwestsouthnorth`,
        graphItemType: dragItem.graphItemType
      });
      if (item) {
        this.insertVertex(item, svgIconPath);
      }
    }
  }
  private insertVertex(item: GraphItemVertex, icon) {
    if (this.editor.graph) {
      // model.beginUpdate();
      this.editor.graph.getModel().beginUpdate();
      try {
        const parent = this.editor.graph.getDefaultParent();
        // this.editor.graph.addCell(item, parent);
        const newVertex = new mxCell(null, new mxGeometry(0, 0, item.width, item.height), item.style);
        newVertex.setVertex(true);
        this.addToolbarItem(this.graph,  this.toolbar, newVertex, icon);
        // this.editor.graph.insertVertex(parent, null, item.value, item.x, item.y, item.width, item.height, item.style);
        // this.editor.graph.insertVertex(lane2a, null, 'C', 560, 84, 30, 30, 'end');
      } finally {
        this.editor.graph.getModel().endUpdate();
      }
    }
  }
  zoomIn() {
    this.editor.graph.zoomIn();
  }
  zoomOut() {
    this.editor.graph.zoomOut();
  }
  actual() {
    this.editor.graph.zoomActual();
  }
  fit() {
    this.editor.graph.center();
  }
  private initGrph(node: HTMLElement) {
    this.editor = new FieldMxEditor(node);
    const parent = this.editor.graph.getDefaultParent();
    this.editor.graph.getModel().beginUpdate();
    try {
      const pool1 = this.editor.graph.insertVertex(parent, null, 'Pool 1', 0, 0, 1040, 0);
      pool1.setConnectable(false);

      const lane1a = this.editor.graph.insertVertex(pool1, null, 'Lane A', 0, 0, 1040, 210);
      lane1a.setConnectable(false);

      const lane1b = this.editor.graph.insertVertex(pool1, null, 'Lane B', 0, 0, 1040, 210);
      lane1b.setConnectable(false);

      const pool2 = this.editor.graph.insertVertex(parent, null, 'Pool 2', 0, 0, 1040, 0);
      pool2.setConnectable(false);

      const lane2a = this.editor.graph.insertVertex(pool2, null, 'Lane A', 0, 0, 1040, 210);
      lane2a.setConnectable(false);

      this.lane2b = this.editor.graph.insertVertex(pool2, null, 'Lane B', 0, 0, 1040, 210);
      this.lane2b.setConnectable(false);
      const start1 = this.editor.graph.insertVertex(lane1a, null, null, 40, 40, 30, 30, 'state');
      const end1 = this.editor.graph.insertVertex(lane1a, null, 'A', 560, 40, 30, 30, 'end');
      const step1 = this.editor.graph.insertVertex(lane1a, null, 'Contact\nProvider', 90, 30, 80, 50, 'process');
      const step11 = this.editor.graph.insertVertex(lane1a, null, 'Complete\nAppropriate\nRequest', 190, 30, 80, 50, 'process');
      const step111 = this.editor.graph.insertVertex(lane1a, null, 'Receive and\nAcknowledge', 385, 30, 80, 50, 'process');
      const start2 = this.editor.graph.insertVertex(this.lane2b, null, null, 40, 40, 30, 30, 'state');

      const step2 = this.editor.graph.insertVertex(this.lane2b, null, 'Receive\nRequest', 90, 30, 80, 50, 'process');
      const step22 = this.editor.graph.insertVertex(this.lane2b, null, 'Refer to Tap\nSystems\nCoordinator', 190, 30, 80, 50, 'process');

      const step3 = this.editor.graph.insertVertex(lane1b, null, 'Request 1st-\nGate\nInformation', 190, 30, 80, 50, 'process');
      const step33 = this.editor.graph.insertVertex(lane1b, null, 'Receive 1st-\nGate\nInformation', 290, 30, 80, 50, 'process');

      const step4 = this.editor.graph.insertVertex(lane2a, null, 'Receive and\nAcknowledge', 290, 20, 80, 50, 'process');
      const step44 = this.editor.graph.insertVertex(lane2a, null, 'Contract\nConstraints?', 400, 20, 50, 50, 'condition');
      const step444 = this.editor.graph.insertVertex(lane2a, null, 'Tap for gas\ndelivery?', 480, 20, 50, 50, 'condition');

      const end2 = this.editor.graph.insertVertex(lane2a, null, 'B', 560, 30, 30, 30, 'end');
      const end3 = this.editor.graph.insertVertex(lane2a, null, 'C', 560, 84, 30, 30, 'end');

      let e = null;

      this.editor.graph.insertEdge(lane1a, null, null, start1, step1, null);
      this.editor.graph.insertEdge(lane1a, null, null, step1, step11, null);
      this.editor.graph.insertEdge(lane1a, null, null, step11, step111, null);

      this.editor.graph.insertEdge(this.lane2b, null, null, start2, step2, null);
      this.editor.graph.insertEdge(this.lane2b, null, null, step2, step22, null);
      this.editor.graph.insertEdge(parent, null, null, step22, step3, null);

      this.editor.graph.insertEdge(lane1b, null, null, step3, step33, null);
      this.editor.graph.insertEdge(lane2a, null, null, step4, step44, null);
      this.editor.graph.insertEdge(lane2a, null, 'No', step44, step444, 'verticalAlign=bottom');
      this.editor.graph.insertEdge(parent, null, 'Yes', step44, step111, 'verticalAlign=bottom;horizontal=0;labelBackgroundColor=white;');

      this.editor.graph.insertEdge(lane2a, null, 'Yes', step444, end2, 'verticalAlign=bottom');
      e = this.editor.graph.insertEdge(lane2a, null, 'No', step444, end3, 'verticalAlign=top');
      e.geometry.points = [new FieldmxPoint(step444.geometry.x + step444.geometry.width / 2,
        end3.geometry.y + end3.geometry.height / 2)];

      this.editor.graph.insertEdge(parent, null, null, step1, step2, 'crossover');
      this.editor.graph.insertEdge(parent, null, null, step3, step11, 'crossover');
      e = this.editor.graph.insertEdge(lane1a, null, null, step11, step33, 'crossover');
      e.geometry.points = [new FieldmxPoint(step33.geometry.x + step33.geometry.width / 2 + 20,
        step11.geometry.y + step11.geometry.height * 4 / 5)];
      this.editor.graph.insertEdge(parent, null, null, step33, step4, null);
      this.editor.graph.insertEdge(lane1a, null, null, step111, end1, null);
    } finally {
      this.editor.graph.getModel().endUpdate();
    }

    this.editor.graph.addListenerCHANGE(() => {
      // this.modelChange.emit(this.editor.graph.toJSON());
    });
    this.editor.graph.selectedModel(() => {
    });
  }
  addVertex(icon, w, h, style) {
    const vertex = new mxCell(null, new mxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);

    this.addToolbarItem(this.editor.graph, this.toolbar, vertex, icon);
  }

  addToolbarItem(graph, toolbar, prototype, image) {
    const funct = (graph, evt, cell) => {
      this.editor.graph.stopEditing(false);

      const pt = this.editor.graph.getPointForEvent(evt);
      const vertex = this.editor.graph.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;

      this.editor.graph.setSelectionCells(this.editor.graph.importCells([vertex], 0, 0, cell));
    };

    // Creates the image which is used as the drag icon (preview)
    const img = toolbar.addMode(null, image, funct);
    const ds = mxUtils.makeDraggable(img, this.editor.graph, funct);
    ds.highlightDropTargets = true;

    ds.getDropTarget = function(graphParam, x, y) {
      if (graphParam.isSwimlane(prototype)) {
        return null;
      } else {
        const cell = graphParam.getCellAt(x, y);

        if (graphParam.isSwimlane(cell)) {
          return cell;
        } else {
          const parent = graphParam.getModel().getParent(cell);

          if (graphParam.isSwimlane(parent)) {
            return parent;
          }
        }
      }
    };
  }
}
