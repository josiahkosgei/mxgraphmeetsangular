import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Vertex } from '../models/mxgraph.models/vertex';
import { Project } from '../models/project/project';
import { ProcessItem } from '../models/project/process-item';
import { GraphItemTypes } from '../models/graph-item-types.enum';
export class UtilityData {
  id: string;
  used: boolean;
  constructor(initialData: Partial<UtilityData> = null) {
    if (initialData != null) {
      Object.assign(this, initialData);
    }
  }
}
export class Utility {
  static describe(instance): Array<string> {
    return Object.getOwnPropertyNames(instance);
  }
  static generateuuids(): Array<UtilityData> {
    const mockUuids: Array<UtilityData> = [];
    for (let index = 0; index <= 100; index++) {
      mockUuids.push(
        new UtilityData({
          id: uuid(),
          used: false
        })
      );
    }
    return mockUuids;
  }
  static getGeneratedGraphPaths(project: Project): string[] {
    console.log('__________________________');
    let current_FlowObject = null;
    const visited = [];
    const queue = [];
    const paths = [];
    let outgoingIds = [];
    let startEventId = '';
    // Loop through Processes
    project.processes.forEach((process) => {
      // In Every Process Pick the startEvent and use it to get sequences
      process.actions.map((startEvent) => {
        startEventId = startEvent.id;
        let path = project.diagram.nodes.find(x => x.id === startEvent.elementId);
        let pathName = path.edges.find(x => x.sourceId === startEvent.elementId);
        console.log(startEvent.name);
        console.log(`↓: ${pathName ? pathName.value : ''}`);
        // Set startEvent as the pointer to use in traversal
        current_FlowObject = startEvent;

        if (current_FlowObject) {
          if (!(paths.indexOf(current_FlowObject.elementId) > -1)) {
            paths.push(Number(current_FlowObject.elementId));
          }
        }
        if (pathName) {
          if (!(paths.indexOf(pathName.id) > -1)) {
            paths.push(Number(pathName.id));
          }
        }

        visited[current_FlowObject.id] = true;
        queue.push(current_FlowObject.id);

      // Using while: traverse the sequences until you reach the end of sequences and actions
        // Exit the loop if current_FlowObject is undefined and queue.length is undefined
        while (queue.length) {
          if (current_FlowObject) {
             // Remove visited vertex from the queue
              current_FlowObject.id = queue.shift();
           }
          const sequences = [...process.sequence];
          const instanceOfFlowProcessObject = current_FlowObject instanceof ProcessItem;
          // Get action or sequence depending on instance Of current_FlowObject e.g. (Sequence/ProcessItem)
          // if current_FlowObject is instance Of ProcessItem(is an action) get the target sequence
          // if current_FlowObject is not instance Of ProcessItem(is a sequence) get the target action
          // If outgoingIds.length > 0 then it is an GraphItemTypes.ifThenElse
          let next_ActionOrSequence = outgoingIds.length > 0 ? sequences.find(x =>  x.id === _.sample(outgoingIds)) :
            instanceOfFlowProcessObject ? sequences.find(x => current_FlowObject.outgoing.includes(x.id)) :
              [...process.actions].find(x => x.id === current_FlowObject.targetActionId);
              // Convert next_ActionOrSequence to type ProcessItem in order to check graphItemType of next_ActionOrSequence
          // In Converting We need GraphItemTypes.ifThenElse to get multiple target or next_ActionOrSequences
          const _abnext_local = !instanceOfFlowProcessObject ? next_ActionOrSequence as ProcessItem : undefined;
          outgoingIds = [];
          if (!instanceOfFlowProcessObject && _abnext_local && _abnext_local.graphItemType === GraphItemTypes.condition) {
            outgoingIds.push(..._abnext_local.outgoing);
          }
          // If next_ActionOrSequence is null at this point try checking the endEvents for the next_ActionOrSequence
            // if (!next_ActionOrSequence) {
            //   next_ActionOrSequence = instanceOfFlowProcessObject ?
            //     sequences.sequence.find(x => x.id === _.sample(current_FlowObject.outgoing)) :
            //   [...process.endEvent].find(x => x.incoming.includes(current_FlowObject.id));
            // }
          current_FlowObject = next_ActionOrSequence;
 // Push next_ActionOrSequence  to the queue
          if (current_FlowObject && !visited[current_FlowObject.id]) {
              visited[current_FlowObject.id] = true;
              queue.push(current_FlowObject.id);
            }
          // Push visited vertex to  paths
          if (current_FlowObject) {
              if (!(paths.indexOf(current_FlowObject.elementId) > -1)) {
                paths.push(Number(current_FlowObject.elementId));
              }
            }
          // Just for console output
          if (current_FlowObject && !instanceOfFlowProcessObject) {
            console.log(!instanceOfFlowProcessObject ? current_FlowObject.name :
              project.diagram.nodes.find(x => x.id === current_FlowObject.elementId).name);

            path = project.diagram.nodes.find(x => x.id === current_FlowObject.elementId);
            pathName = path.edges.find(x => x.targetId === current_FlowObject.elementId);
            console.log(`↓: ${pathName ? pathName.value : ''}`);
             // Push visited edge to  paths
            if (pathName) {
              if (!(paths.indexOf(pathName.id) > -1) && pathName.id) {
                paths.push(Number(pathName.id));
              }
            }
          }
        }
      });
    });
    return paths;
  }
  static groupCellsToLanes(vertices: Vertex[]): any[] {
    const groups = Object.values(
      vertices.reduce((result: any[], {  name, x, y, style, width, height, vertex,
        id, source, target, graphItemType, mxObjectId,
        parent, targetId, sourceId, parentId, edges }) => {
        if (!result[parentId]) {
          result[parentId] = {parentId, _groupedFlowItems: []};
        }
        result[parentId]._groupedFlowItems.push({name, x, y, style, width, height, vertex,
          id, source, target, graphItemType, mxObjectId,
          parent, targetId, sourceId, parentId, edges});
        return result;
      }, []));
    return groups;
  }
}
