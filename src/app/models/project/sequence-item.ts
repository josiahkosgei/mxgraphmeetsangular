export class SequenceItem {
  id: string;
  sourceActionId: string;
  targetActionId: string;
  elementId: string;
  conditionExpression: any = {};
  constructor(initialData: Partial<SequenceItem> = null) {
    if (initialData != null) {
      this.sourceActionId = initialData.sourceActionId;
      this.id = initialData.id;
      this.elementId = initialData.elementId;
      this.targetActionId = initialData.targetActionId;
      this.conditionExpression = initialData.conditionExpression;
    }
  }
}
