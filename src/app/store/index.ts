import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromGraphItemGroup from './graph.reducer';

export interface State {
  graphItemGroupState: fromGraphItemGroup.State;
}

export const reducers: ActionReducerMap<State> = {
  graphItemGroupState: fromGraphItemGroup.reducer,
};

export const getGraphItemGroup = (state: State) => state.graphItemGroupState.graphItemGroup;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
