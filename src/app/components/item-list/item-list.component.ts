import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GraphItem, graphItems } from '../../models/graph-item';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphItemGroups } from '../../models/graph-item-groups';
import * as fromGraphItemGroupStore from '../../store';
import { Store, select } from '@ngrx/store';
import { CreateGraphItemGroup } from '../../store/graph.actions';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit, AfterViewInit {
  public graphItemGroups$: Observable<any[]>;
  private graphItems: GraphItem[] = graphItems;
  constructor(
    private cd: ChangeDetectorRef,
    private readonly graphItemGroupStore: Store<fromGraphItemGroupStore.State>) {
      this.graphItemGroups$ = graphItemGroupStore.pipe(select(fromGraphItemGroupStore.getGraphItemGroup));
               }

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
    // this.graphItemGroups$.next([...formatedFlowItems]);
    this.graphItemGroupStore.dispatch(new CreateGraphItemGroup(formatedFlowItems));
  }

}
