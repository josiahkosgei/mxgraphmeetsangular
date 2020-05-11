import { SequenceItem } from './sequence-item';

export class Sequence {
  startEventId: string;
  items: Array<SequenceItem> = [];
  constructor(initialData: Partial<Sequence> = null) {
    if (initialData != null) {
      this.startEventId = initialData.startEventId;
      if (initialData.items != null) {
        initialData.items.forEach(dataItem => {
            this.items.push(new SequenceItem(dataItem));
        });
      }
    }
  }
}
