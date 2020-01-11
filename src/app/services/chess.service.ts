import { Injectable } from '@angular/core';
import { GraphItem } from '../models/graph-item';
import { BaseService } from './base.service';

export class ChessDragItem {
  constructor(public graphItem: GraphItem) {}
}

@Injectable({
  providedIn: 'root'
})
export class ChessService extends BaseService {
  chessDragItem: ChessDragItem = null;
  constructor() {
    super();
   }
   set dragItem(graphItem: ChessDragItem) {
    this.chessDragItem = graphItem;
  }
  get dragItem(): ChessDragItem {
    return this.chessDragItem;
  }
}
