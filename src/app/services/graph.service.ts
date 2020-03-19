import { Injectable } from '@angular/core';
import { GraphItem } from '../models/graph-item';
import { BaseService } from './base.service';

export class GraphDragItem {
  constructor(public graphItem: GraphItem) {}
}

@Injectable({
  providedIn: 'root'
})
export class GraphService extends BaseService {
  graphDragItem: GraphDragItem = null;
  constructor() {
    super();
   }
   set dragItem(graphItem: GraphDragItem) {
    this.graphDragItem = graphItem;
  }
  get dragItem(): GraphDragItem {
    return this.graphDragItem;
  }
}
