import { Sequence } from './sequence';
import { GraphItem } from '../graph-item';
import { ProcessItem } from './process-item';
import { SequenceItem } from './sequence-item';

export class Processes {

  projectId: string;
  sequence: Array<SequenceItem> = [];
  actions: Array<ProcessItem> = [];

  constructor(initialData: Partial<Processes> = null) {
    if (initialData != null) {
      this.projectId = initialData.projectId;
      if (initialData.sequence != null) {
        initialData.sequence.forEach(dataItem => {
          this.sequence.push(new SequenceItem(dataItem));
        });
      }
      if (initialData.actions != null) {
        initialData.actions.forEach(action => {
          this.actions.push(action);
        });
      }
    }
  }
}
