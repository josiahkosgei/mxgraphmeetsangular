import { Edge } from './edge';
import { Geometry } from './geometry';
import { GraphItemTypes } from '../graph-item-types.enum';

export class Vertex {
  name: string;
  x: number;
  y: number;
  style: string;
  width: number;
  height: number;
  vertex: boolean;
  id: string;
  source: any;
  target: any;
  graphItemType: GraphItemTypes;
  mxObjectId: string;
  parent: any;
  targetId: string;
  sourceId: string;
  parentId: string;
  edges: Array<Edge> = [];
  geometry: Geometry;
  constructor(initialData: Partial<Vertex> = null) {
    if (initialData != null) {
      this.name = initialData.name;
      this.id = initialData.id;
      this.x = initialData.x;
      this.y = initialData.y;
      this.style = initialData.style;
      this.width = initialData.width;
      this.height = initialData.height;
      this.vertex = initialData.vertex;
      this.mxObjectId = initialData.mxObjectId;
      this.graphItemType = initialData.graphItemType;
      this.geometry = new Geometry(initialData.geometry);
      if (initialData.source && !initialData.sourceId) {
        this.sourceId = initialData.source.id;
      } else if (initialData.sourceId) {
        this.sourceId = initialData.sourceId;
      }
      if (initialData.target && !initialData.targetId) {
        this.targetId = initialData.target.id;
      } else if (initialData.targetId) {
        this.targetId = initialData.targetId;
      }
      if (initialData.parent && !initialData.parentId) {
        this.parentId = initialData.parent.id;
      } else if (initialData.parentId) {
        this.parentId = initialData.parentId;
      }
      if (initialData.edges != null) {
        initialData.edges.forEach(edge => {
          this.edges.push(new Edge(edge));
        });
      }
    }
  }
}
