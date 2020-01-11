import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ChessService } from '../../services/chess.service';
import { ChessMxgraph, GraphItemVertex } from '../../models/chess-mxgraph';

@Component({
  selector: 'app-mxgraph',
  templateUrl: './mxgraph.component.html',
  styleUrls: ['./mxgraph.component.scss']
})
export class MxgraphComponent implements OnInit {
  graph: any;
  constructor(private elementRef: ElementRef,
              private chessService: ChessService) { }
  ngOnInit() {
    this.initGrph(this.elementRef.nativeElement.querySelector('.mxg-wrap'));
  }
  dropItem(e: MouseEvent) {
    if (this.chessService.dragItem && this.chessService.dragItem.graphItem) {

      const dragItem = this.chessService.dragItem.graphItem;
      const { offsetX: x, offsetY: y }: { offsetX: number; offsetY: number } = e;
      const item: GraphItemVertex = GraphItemVertex.getItem({x, y, value: ``, style: `shape=image;image=${
        dragItem.svgIconPath };verticalAlign=top;verticalLabelPosition=bottom;portConstraint=eastwestsouthnorth`,
        graphItemType: dragItem.graphItemType});
      if (item) {
        this.insertVertex(item);
      }
    }
  }
  private insertVertex(item: any) {
    if (this.graph) {
      const model = this.graph.getModel();
      model.beginUpdate();
      try {
        const parent = this.graph.getDefaultParent();
        this.graph.insertVertex(parent, 0, item.value, item.x, item.y, item.width, item.height, item.style);
      } finally {
        model.endUpdate();
      }
    }
  }
  zoomIn() {
    this.graph.execute('zoomIn');
  }
  zoomOut() {
    this.graph.execute('zoomOut');
  }
  actual() {
    this.graph.execute('actualSize');
  }
  fit() {
    this.graph.execute('fit');
  }
  private initGrph(node: HTMLElement) {
    this.graph = new ChessMxgraph(node);
    // this.graph.setConnectable(true);
    // //  this.allowAutoPanning = true;
    // this.graph.timerAutoScroll = true;
    // this.graph.snapToTerminals = true;
    // this.graph.graphHandler.guidesEnabled = true;
    // this.graph.setPanning(true);
    // this.graph.centerZoom = true;
    // this.graph.setDropEnabled(true);
    // this.graph.alternateEdgeStyle = 'elbow=vertical';
    // this.graph.swimlaneNesting = false;
    // this.graph.connectionHandler.connectImage = new mxgraph.mxImage(`../assets/icons/gif/connector.gif`, 16, 16);
    // // this.graph.styling();
    // this.graph.minFitScale = null;
  }

}
