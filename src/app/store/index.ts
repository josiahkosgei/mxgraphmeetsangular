import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromProjects from './project.reducer';
import * as fromGraphItemGroup from './graph.reducer';

export interface State {
  projectState: fromProjects.State;
  graphItemGroupState: fromGraphItemGroup.State;
}

export const reducers: ActionReducerMap<State> = {
  projectState: fromProjects.reducer,
  graphItemGroupState: fromGraphItemGroup.reducer,
};

export const getGraphItemGroup = (state: State) => state.graphItemGroupState.graphItemGroup;
export const getProject = (state: State) => state.projectState.project;

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
