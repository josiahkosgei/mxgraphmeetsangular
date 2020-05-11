import { Geometry } from './geometry';

export class Edge {
  value: string;
  style: string;
  edge: boolean;
  id: string;
  mxObjectId: string;
  geometry: Geometry;
  _target: any;
  _source: any;
  targetId: string;
  sourceId: string;
  parentId: string;
  parent: any;
  constructor(initialData: Partial<Edge> = null) {
    if (initialData != null) {
      this.value = initialData.value;
      this.id = initialData.id;
      this.edge = initialData.edge;
      this.style = initialData.style;
      this.mxObjectId = initialData.mxObjectId;
      this.geometry = new Geometry(initialData.geometry);

      if (initialData._source && !initialData.sourceId) {
        this.sourceId = initialData._source.id;
      } else if (initialData.sourceId) {
        this.sourceId = initialData.sourceId;
      }
      if (initialData._target && !initialData.targetId) {
        this.targetId = initialData._target.id;
      } else if (initialData.targetId) {
        this.targetId = initialData.targetId;
      }
      if (initialData.parent && !initialData.parentId) {
        this.parentId = initialData.parent.id;
      } else if (initialData.parentId) {
        this.parentId = initialData.parentId;
      }
    }
  }
}
