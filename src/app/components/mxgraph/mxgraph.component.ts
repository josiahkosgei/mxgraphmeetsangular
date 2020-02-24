import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ChessService } from '../../services/chess.service';
import { GraphItemVertex, FieldMxEditor, mxToolbar, mxUtils, mxCell, mxGeometry } from '../../models/chess-mxgraph';
import { environment } from '../../../environments/environment';
import * as fromGraphItemGroupStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mxgraph',
  templateUrl: './mxgraph.component.html',
  styleUrls: ['./mxgraph.component.scss']
})

export class MxgraphComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyed$ = new Subject();
  public graphItemGroups$: Observable<any[]>;

  constructor(private elementRef: ElementRef,
              graphItemGroupStore: Store<fromGraphItemGroupStore.State>,
              private chessService: ChessService) {
                this.graphItemGroups$ = graphItemGroupStore.pipe(select(fromGraphItemGroupStore.getGraphItemGroup));
               }
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
    this.graphItemGroups$.pipe(takeUntil(this.destroyed$)).subscribe(graphItemGroup => {
      if (graphItemGroup.length > 0) {
        graphItemGroup.forEach((item) => {
          item._formatedFlowItems.forEach((formatedFlowItem) => {
            this.addVertex(formatedFlowItem.svgIconPath, 48, 48, formatedFlowItem.builtIn ? `shape=${formatedFlowItem.icon};verticalAlign=bottom;verticalLabelPosition=bottom;horizontal=1;portConstraint=eastwestsouthnorth` : `shape=image;image=${
              formatedFlowItem.svgIconPath};verticalAlign=bottom;verticalLabelPosition=bottom;horizontal=1;portConstraint=eastwestsouthnorth`, formatedFlowItem.title);
          });
          this.toolbar.addLine();
        });
      }
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
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
        this.insertVertex(item);
      }
    }
  }
  private insertVertex(item: GraphItemVertex) {
    if (this.editor.graph) {
      this.editor.graph.getModel().beginUpdate();
      try {
        const parent = this.editor.graph.getDefaultParent();
        const newVertex = new mxCell(null, new mxGeometry(0, 0, item.width, item.height), item.style);
        newVertex.setVertex(true);
        this.editor.graph.insertVertex(parent, null, item.value, item.x, item.y, item.width, item.height, item.style);
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

      const lane1a = this.editor.graph.insertVertex(pool1, null, 'Lane A', 0, 0, 1040, 270);
      lane1a.setConnectable(false);

      const lane1b = this.editor.graph.insertVertex(pool1, null, 'Lane B', 0, 0, 1040, 270);
      lane1b.setConnectable(false);
    } finally {
      this.editor.graph.getModel().endUpdate();
    }

    this.editor.graph.addListenerCHANGE(() => {
      // this.modelChange.emit(this.editor.graph.toJSON());
    });
    this.editor.graph.selectedModel(() => {
    });
  }
  addVertex(icon, w, h, style, title) {
    const vertex = new mxCell(title, new mxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);

    this.addToolbarItem(this.toolbar, vertex, icon);
  }

  addToolbarItem(toolbar, prototype, image) {
    const funct = (graph, evt, cell) => {
      this.editor.graph.stopEditing(false);

      const pt = this.editor.graph.getPointForEvent(evt);
      const vertex = this.editor.graph.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;

      this.editor.graph.setSelectionCells(this.editor.graph.importCells([vertex], 0, 0, cell));
    };

    // Creates the image which is used as the drag icon (preview)
    // addMode = function(title, icon, funct, pressedIcon, style, toggle)
    const img = toolbar.addMode(prototype.value, image, funct);
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
