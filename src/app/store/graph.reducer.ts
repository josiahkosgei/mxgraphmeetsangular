import { GraphItemGroups } from '../models/graph-item-groups';
import { GraphItemGroupActions, GraphItemGroupActionTypes } from './graph.actions';


export interface State {
  graphItemGroup: Array<any>;
  errorMessage?: string;
}

export const initialState: State = {
  graphItemGroup:  new Array<any>(),
  errorMessage: null,
};

export function reducer(state = initialState, action: GraphItemGroupActions): State {
  switch (action.type) {
    case GraphItemGroupActionTypes.CreateGraphItemGroup: {
      return { ...state, graphItemGroup: [...action.payload] };
    }
    case GraphItemGroupActionTypes.ResetGraphItemGroup: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getGraphItemGroup = (state: State) => state.graphItemGroup;
