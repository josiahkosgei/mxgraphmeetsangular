import { ProjectActionTypes, ProjectActions } from './project.actions';
import { Project } from '../models/project/project';

export interface State {
  project: Project;
  errorMessage?: string;
}

export const initialState: State = {
  project: null,
  errorMessage: null,
};

export function reducer(state = initialState, action: ProjectActions): State {
  switch (action.type) {


    case ProjectActionTypes.CreateProjectSuccess:
    case ProjectActionTypes.InitProjectSuccess:
    case ProjectActionTypes.EditProjectSuccess: {
      return {
        ...state,
        project: action.payload,
      };
    }
    case ProjectActionTypes.GetProjectSuccess: {
      return {
        ...state,
        project: action.payload,
      };
    }
    case ProjectActionTypes.GetProjectFailure: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    case ProjectActionTypes.ResetProject: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getProject = (state: State) => state.project;
