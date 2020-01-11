import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GraphItem, graphItems } from '../../models/graph-item';
import { BehaviorSubject } from 'rxjs';
import { GraphItemGroups } from '../../models/graph-item-groups';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit, AfterViewInit {
  graphItemGroups$ = new BehaviorSubject<GraphItemGroups[]>([]);
  private graphItems: GraphItem[] = graphItems;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.groupGraphItems();
    this.cd.detectChanges();
  }
  groupGraphItems() {
    const formatedFlowItems = Object.values(
      this.graphItems.reduce((result, { graphItemType, icon, svgIconPath, category, title }) => {
        if (!result[category]) {
          result[category] = {category, _formatedFlowItems: []};
        }
        result[category]._formatedFlowItems.push({ graphItemType, icon, svgIconPath, category, title });
        return result;
      }, [])
    );
    this.graphItemGroups$.next([...formatedFlowItems]);
  }

}
