import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GraphItem, graphItems } from '../../models/graph-item';
import { Observable } from 'rxjs';
import * as fromGraphItemGroupStore from '../../store';
import { Store } from '@ngrx/store';
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
      // this.graphItemGroups$ = graphItemGroupStore.pipe(select(fromGraphItemGroupStore.getGraphItemGroup));
               }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.groupGraphItems();
    this.cd.detectChanges();
  }
  groupGraphItems() {
    const formatedItems = Object.values(
      this.graphItems.reduce((result, { graphItemType, icon, svgIconPath, category, title, builtIn }) => {
        if (!result[category]) {
          result[category] = {category, _formatedItems: []};
        }
        result[category]._formatedItems.push({ graphItemType, icon, svgIconPath, category, title, builtIn });
        return result;
      }, [])
    );
    this.graphItemGroupStore.dispatch(new CreateGraphItemGroup(formatedItems));
  }

}
