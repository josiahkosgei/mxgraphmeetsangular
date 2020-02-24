

import { Action } from '@ngrx/store';
import { GraphItemGroups } from '../models/graph-item-groups';

export enum GraphItemGroupActionTypes {

  CreateGraphItemGroup = '[GraphItemGroup] Create Graph Item Group',
  CreateGraphItemGroupSuccess = '[GraphItemGroup] Create Graph Item Group Success',
  CreateGraphItemGroupFailure = '[GraphItemGroup] Create Graph Item Group Failure',

  ResetGraphItemGroup = '[GraphItemGroup] Reset Graph Item Group',
}

export class CreateGraphItemGroup implements Action {
  readonly type = GraphItemGroupActionTypes.CreateGraphItemGroup;
  constructor(public payload: any[]) {}
}
export class CreateGraphItemGroupSuccess implements Action {
  readonly type = GraphItemGroupActionTypes.CreateGraphItemGroupSuccess;
  constructor(public payload: string) {}
}
export class CreateGraphItemGroupFailure implements Action {
  readonly type = GraphItemGroupActionTypes.CreateGraphItemGroupFailure;
  constructor(public payload: string) {}
}
export class ResetGraphItemGroup implements Action {
  readonly type = GraphItemGroupActionTypes.ResetGraphItemGroup;
}

export type GraphItemGroupActions =
  | CreateGraphItemGroup
  | CreateGraphItemGroupSuccess
  | CreateGraphItemGroupFailure
  | ResetGraphItemGroup;

