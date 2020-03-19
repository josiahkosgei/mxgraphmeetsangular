import { Component, Input, OnInit } from '@angular/core';
import { GraphItem } from '../../models/graph-item';
import { GraphItemTypes } from '../../models/graph-item-types.enum';
import { GraphDragItem, GraphService } from '../../services/graph.service';

@Component({
  selector: 'app-graph-drag-item',
  templateUrl: './graph-drag-item.component.html',
  styleUrls: ['./graph-drag-item.component.scss']
})
export class GraphDragItemComponent implements OnInit {

  @Input('graphItemType') graphItemType: GraphItemTypes;
  @Input('graphItem') graphItem: GraphItem;

  constructor(
    private graphService: GraphService
  ) { }

  setDrugItem() {
    this.graphService.dragItem = new GraphDragItem(this.graphItem);
  }

  clearDropItem() {
    setTimeout(() => {
      this.graphService.dragItem = null;
    }, 20);
  }

  ngOnInit() {
  }

}
