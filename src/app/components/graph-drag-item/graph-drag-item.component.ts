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
  @Input() graphItem: GraphItem;
  constructor(
  ) { }

  ngOnInit() {
  }

}
