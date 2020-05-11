import { Project } from '../models/project/project';
import { Processes } from '../models/project/processes';
import { Sequence } from '../models/project/sequence';
import { Diagram } from '../models/project/diagram';
import { Vertex } from '../models/mxgraph.models/vertex';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { GraphItemTypes } from '../models/graph-item-types.enum';
import { ProcessItem } from '../models/project/process-item';
import { SequenceItem } from '../models/project/sequence-item';

export class Groupeds {
  parentId: string;
  _groupedItems: Vertex[] = [];
}
export class GenerateProcess {
  static generateProcessFromGraph(project: Project, formData: any[], flowvariables: any[]): Project {
    const processes: Array<Processes> = [];

    let prevSequence: SequenceItem;
    let prevAction: ProcessItem;

    const diagram = GenerateProcess.getUniqueEdges(project.diagram);
    const grouped = this.groupItems(diagram.nodes);
    grouped.forEach(group => {
      const sequence: Array<SequenceItem> = [];
      const tempActions: Array<ProcessItem> = [];
      const actions: Array<ProcessItem> = [];
      const endEvents: Array<ProcessItem> = [];
      const startEvents: Array<ProcessItem> = [];

      const sourcetargetpair = this.generatePairs(group._groupedItems);

      Object.assign({}, ...sourcetargetpair.map(current => {
        current.map((pair) => {
          let action: ProcessItem;
          let nextSequence: SequenceItem;
          const _formData = formData ? formData.find(x => x.elementId === pair.sourceVertex.id) : undefined;

          const actionId = uuid();
          nextSequence = new SequenceItem({
            elementId: pair.sourceVertex.id,
            conditionExpression: {},
            id: uuid(),
            sourceActionId: prevAction ? prevAction.id : '',
            targetActionId: actionId
          });

          action = new ProcessItem({
            elementId: pair.sourceVertex.id,
            data: _formData ? [..._formData.data] : [],
            graphItemType: pair.sourceVertex.graphItemType,
            id: actionId,
            incoming: [nextSequence.id], // prevSequence ? [prevSequence.id] : [],
            name: pair.sourceVertex.name,
            outgoing: pair.targetVertex ? [pair.targetVertex.id] : [''],
          });

          // action.outgoing.push(nextSequence.id);

          if (pair.sourceVertex.graphItemType === GraphItemTypes.stopProcess) {
            action.outgoing = [];
            // TODO: Removed.
            // endEvents.push(action);
          }
          tempActions.push(action);
          if (nextSequence.targetActionId !== '') {
            sequence.push(nextSequence);
          }
          prevSequence = nextSequence;
          prevAction = action;
        });
      }));
      tempActions.forEach((tempAction) => {
        const targetsequence = sequence.find(x => x.elementId === tempAction.outgoing[0]);
        tempAction.outgoing = [];
        if (targetsequence !== undefined) {
          tempAction.outgoing.push(targetsequence.id);
        }
      });
      // Branching objects
      const branchingObjectsIds = [];
      for (let i = 0; i < tempActions.length - 1; i++) {
        if (tempActions[i + 1].elementId === tempActions[i].elementId) {
          branchingObjectsIds.push(tempActions[i].elementId);
        }
      }
      const uniqueObjectsIds = new Set(branchingObjectsIds);
      // Map Branching actions to sequences
      uniqueObjectsIds.forEach((uniqueObjectsId) => {
        const outgoingIds = [];
        const firstBranch = [];
        const similarBranches = [];
        tempActions.filter(o => Number(o.elementId) === Number(uniqueObjectsId)).forEach(action => {
          const outgoingObject = sequence.find(x => x.id === action.outgoing[0]);
          if (outgoingObject) {
            outgoingIds.push(outgoingObject.id);
          }
        });
        const branch = tempActions.find(x => Number(x.elementId) === Number(uniqueObjectsId));
        outgoingIds.forEach((outgoingId) => {
          const sqn = sequence.find(x => x.id === outgoingId);
          sqn.sourceActionId = branch.id;
          const foundSequence = sequence.findIndex(x => x.id === sqn.id);
          sequence[foundSequence] = sqn;
        });
        branch.outgoing = [];
        branch.outgoing = [...outgoingIds];
        const foundAction = tempActions.findIndex(x => x.id === branch.id);
        tempActions[foundAction] = branch;
        firstBranch.push(branch.id);
        tempActions.filter(x => Number(x.elementId) === Number(uniqueObjectsId)).forEach(c => {
          similarBranches.push(c.id);
        });
        const diffs = similarBranches.filter(x => !firstBranch.includes(x));
        diffs.forEach(diff => {
          [...tempActions].filter(x => x.id === diff).forEach((action) => {
            const index = tempActions.indexOf(action);
            tempActions.splice(index, 1);
          });
        });
      });
      // Map Unmapped actions to sequences
      // sequence.forEach((sequence) => {
      //   const targetTempActions = tempActions.find(x => x.elementId === sequence.targetActionId);
      //   sequence.targetActionId = targetTempActions.id;
      // });
      // tempActions.forEach((tempAction) => {
      //   const targetsequence = sequence.find(x => x.elementId === tempAction.outgoing[0]);
      //   tempAction.outgoing.push(targetsequence.id);
      // });
      // Map Unmapped sequences to actions
      tempActions.forEach((tempAction) => {
        actions.push(tempAction);
      });
      // Add generated sequences & actions to the flow project
      const _flowvariables = flowvariables ? flowvariables : [];
      const _process = new Processes({
        projectId: project.id,
        sequence: [...sequence],
        actions: [...actions],
      });
      processes.push(_process);
    });
    const newproject = new Project({
      id: project.id,
      title: project.title,
      diagram,
      processes,
    });
    newproject.processes = processes;
    return newproject;
  }
  static generatePairs(vertices: Vertex[]) {
    let paired: any = null;
    return vertices.map(sourceVtx => {

      if (sourceVtx.graphItemType !== GraphItemTypes.stopProcess) {
        paired = sourceVtx.edges.filter(sf => Number(sf.sourceId) === Number(sourceVtx.id) || sf.sourceId === '').map(edge => {
          const targetVtx = vertices.find(vtx => Number(vtx.id) === Number(edge.targetId));
          return { bpmnElementId: sourceVtx.id, sourceVertex: sourceVtx, targetVertex: targetVtx };
        });
      } else {
        paired = [{ bpmnElementId: sourceVtx.id, sourceVertex: sourceVtx, targetVertex: null }];
      }
      return paired;
    });
  }
  static groupItems(vertices: Vertex[]): Groupeds[] {
    const groupedItems = Object.values(
      vertices.reduce((result: Groupeds[], { name, x, y, style, width, height, vertex,
        id, source, target, graphItemType, mxObjectId,
        parent, targetId, sourceId, parentId, edges }) => {
        if (!result[parentId]) {
          result[parentId] = { parentId, _groupedItems: [] };
        }
        result[parentId]._groupedItems.push({
          name, x, y, style, width, height, vertex,
          id, source, target, graphItemType, mxObjectId,
          parent, targetId, sourceId, parentId, edges
        });
        return result;
      }, [])
    );
    return groupedItems;
  }
  static getUniqueEdges(diagram: Diagram) {
    const vertices = diagram.nodes;
    const keys = ['sourceId', 'targetId', 'parentId'];
    const filteredvertices = vertices.map((vertex) => {
      const filterededges = vertex.edges.filter(
        (s => (o: { [x: string]: any; }) => {
          return (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join('|'));
        }
        )(new Set)
      );
      vertex.edges = [...filterededges];
      return vertex;
    });
    diagram.nodes = [];
    diagram.nodes = [...filteredvertices];
    return diagram;
  }

}
