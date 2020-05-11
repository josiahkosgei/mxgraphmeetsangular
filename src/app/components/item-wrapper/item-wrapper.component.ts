import { Component, OnInit, Input } from '@angular/core';
import { GraphItemTypes } from 'src/app/models/graph-item-types.enum';
import { GraphItem } from 'src/app/models/graph-item';
import { GraphService, GraphDragItem } from 'src/app/services/graph.service';

@Component({
  selector: 'app-item-wrapper',
  templateUrl: './item-wrapper.component.html',
  styleUrls: ['./item-wrapper.component.scss']
})
export class ItemWrapperComponent implements OnInit {

  @Input() graphItemType: GraphItemTypes;
  @Input() graphItem: GraphItem;
  constructor(
    private graphService: GraphService
  ) { }

  setDragItem() {
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
