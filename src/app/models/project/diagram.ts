import { Vertex } from '../mxgraph.models/vertex';

export class Diagram {
  nodes: Array<Vertex> = [];
  grouping: Array<Vertex> = [];
  constructor(initialData: Partial<Diagram> = null) {
    if (initialData != null) {
      if (initialData.nodes != null) {
        initialData.nodes.forEach(vertex => {
          this.nodes.push(new Vertex(vertex));
        });
      }
      if (initialData.grouping != null) {
        initialData.grouping.forEach(vertex => {
          this.grouping.push(new Vertex(vertex));
        });
      }
    }
  }
}
