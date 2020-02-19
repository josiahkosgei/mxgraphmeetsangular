import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ChessService } from '../../services/chess.service';
import { FieldMxgraph, GraphItemVertex, FieldMxEditor } from '../../models/chess-mxgraph';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mxgraph',
  templateUrl: './mxgraph.component.html',
  styleUrls: ['./mxgraph.component.scss']
})
export class MxgraphComponent implements OnInit {
  graph: any;
  editor: FieldMxEditor;
  constructor(private elementRef: ElementRef,
              private chessService: ChessService) { }
  ngOnInit() {
    this.initGrph(this.elementRef.nativeElement.querySelector('.mxg-wrap'));
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
        x, y, value: ``, style: `shape=image;image=${
          svgIconPath};verticalAlign=top;verticalLabelPosition=bottom;portConstraint=eastwestsouthnorth`,
        graphItemType: dragItem.graphItemType
      });
      if (item) {
        this.insertVertex(item);
      }
    }
  }
  private insertVertex(item: GraphItemVertex) {
    if (this.editor.graph) {
      const model = this.editor.graph.getModel();
      // model.beginUpdate();
      this.editor.graph.getModel().beginUpdate();
      try {
        const parent = this.editor.graph.getDefaultParent();
        this.editor.graph.addCell(item, parent);
        // this.editor.graph.insertVertex(parent, 0, item.value, item.x, item.y, item.width, item.height, item.style);
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

      const lane2b = this.editor.graph.insertVertex(pool2, null, 'Lane B', 0, 0, 1040, 210);
      lane2b.setConnectable(false);

    } finally {
      this.editor.graph.getModel().endUpdate();
    }

    // this.editor.graph.addListenerCHANGE(() => {
    //   // this.modelChange.emit(this.editor.graph.toJSON());
    // });
    // this.editor.graph.selectedModel((selected) => {
    //     const tmp = this.editor.graph.model.getParent(selected.cells[0]);
    //     const isLane = this.editor.graph.isPool(tmp);
    //     const isPool = this.editor.graph.isPool(selected.cells[0]);
    //   });
  }

}
