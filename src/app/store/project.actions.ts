
import { Action } from '@ngrx/store';
import { Project } from '../models/project/project';
export enum ProjectActionTypes {
  CreateProject = '[Project] Create Project',
  CreateProjectSuccess = '[Project] Create Project Success',
  CreateProjectFailure = '[Project] Create Project Failure',

  InitProject = '[Project] Init Project',
  InitProjectSuccess = '[Project] Init Project Success',
  InitProjectFailure = '[Project] Init Project Failure',

  EditProject = '[Project] Edit Project',
  EditProjectSuccess = '[Project] Edit Project Success',
  EditProjectFailure = '[Project] Edit Project Failure',

  GetProject = '[Project] Get Project',
  GetProjectSuccess = '[Project] Get Project Success',
  GetProjectFailure = '[Project] Fetch Project Failure',

  ShowProgressBar = '[Project] Show Progress Bar',
  ResetProject = '[Project] Reset Project',
}

export class CreateProject implements Action {
  readonly type = ProjectActionTypes.CreateProject;
  constructor(public payload: Project) {
  }
}
export class CreateProjectSuccess implements Action {
  readonly type = ProjectActionTypes.CreateProjectSuccess;
  constructor(public payload: any) {
  }
}
export class CreateProjectFailure implements Action {
  readonly type = ProjectActionTypes.CreateProjectFailure;
  constructor(public payload: any) {}
}
export class InitProject implements Action {
  readonly type = ProjectActionTypes.InitProject;
  constructor(public payload: Project) {}
}
export class InitProjectSuccess implements Action {
  readonly type = ProjectActionTypes.InitProjectSuccess;
  constructor(public payload: any) {
  }
}
export class InitProjectFailure implements Action {
  readonly type = ProjectActionTypes.InitProjectFailure;
  constructor(public payload: any) {}
}

export class EditProject implements Action {
  readonly type = ProjectActionTypes.EditProject;
  constructor(public payload: Project) {
  }
}
export class EditProjectSuccess implements Action {
  readonly type = ProjectActionTypes.EditProjectSuccess;
  constructor(public payload: Project) {

  }
}
export class EditProjectFailure implements Action {
  readonly type = ProjectActionTypes.EditProjectFailure;
  constructor(public payload: any) {}
}
export class GetProject implements Action {
  readonly type = ProjectActionTypes.GetProject;
  constructor(public payload: string) {}
}

export class GetProjectSuccess implements Action {
  readonly type = ProjectActionTypes.GetProjectSuccess;
  constructor(public payload: Project) {}
}

export class GetProjectFailure implements Action {
  readonly type = ProjectActionTypes.GetProjectFailure;
  constructor(public payload: any) {}
}
export class ShowProgressBar implements Action {
  readonly type = ProjectActionTypes.ShowProgressBar;
  constructor(public payload: boolean) {}
}
export class ResetProject implements Action {
  readonly type = ProjectActionTypes.ResetProject;
}

export type ProjectActions =
  | CreateProject
  | CreateProjectSuccess
  | CreateProjectFailure
  | InitProject
  | InitProjectSuccess
  | InitProjectFailure
  | EditProject
  | EditProjectSuccess
  | EditProjectFailure
  | GetProject
  | GetProjectSuccess
  | GetProjectFailure
  | ShowProgressBar
  | ResetProject;
