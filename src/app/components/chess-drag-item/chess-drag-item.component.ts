import { Component, Input, OnInit } from '@angular/core';
import { GraphItem } from '../../models/graph-item';
import { GraphItemTypes } from '../../models/graph-item-types.enum';
import { ChessDragItem, ChessService } from '../../services/chess.service';

@Component({
  selector: 'app-chess-drag-item',
  templateUrl: './chess-drag-item.component.html',
  styleUrls: ['./chess-drag-item.component.scss']
})
export class ChessDragItemComponent implements OnInit {

  @Input('graphItemType') graphItemType: GraphItemTypes;
  @Input('graphItem') graphItem: GraphItem;

  constructor(
    private chessService: ChessService
  ) { }

  setDrugItem() {
    this.chessService.dragItem = new ChessDragItem(this.graphItem);
  }

  clearDropItem() {
    setTimeout(() => {
      this.chessService.dragItem = null;
    }, 20);
  }

  ngOnInit() {
  }

}
