import { GraphItemTypes } from '../graph-item-types.enum';
export class ProcessItem{
  id: string;
  elementId: string;
  name: string;
  graphItemType: GraphItemTypes;
  data: Array<any> = [];
  incoming: Array<string> = [];
  outgoing: Array<string> = [];
  constructor(initialData: Partial<ProcessItem> = null) {
    if (initialData != null) {
      this.id = initialData.id;
      this.elementId = initialData.elementId;
      this.name = initialData.name;
      this.graphItemType = initialData.graphItemType;
      this.data = initialData.data;
      if (initialData.incoming != null) {
        initialData.incoming.forEach(event => {
            this.incoming.push(event);
        });
      }
      if (initialData.outgoing != null) {
        initialData.outgoing.forEach(event => {
            this.outgoing.push(event);
        });
      }
    }
  }
}
