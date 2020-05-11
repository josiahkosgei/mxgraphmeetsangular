import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { GraphService } from '../../services/graph.service';
import { GraphItemVertex, FieldMxEditor, mxToolbar, mxUtils, mxCell, mxGeometry, mxPoint } from '../../models/graph-mxgraph';
import { environment } from '../../../environments/environment';
import * as fromStore from '../../store';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GenerateProcess } from '../../lib/generate-process';
import { Project } from '../../models/project/project';
import { Processes } from '../../models/project/processes';
import { v4 as uuid } from 'uuid';
import { Diagram } from '../../models/project/diagram';
import { GraphItem } from '../../models/graph-item';
import { Utility } from 'src/app/lib/utility';
import { EditProject, CreateProject } from '../../store/project.actions';
import { GraphItemTypes } from '../../models/graph-item-types.enum';
@Component({
  selector: 'app-mxgraph',
  templateUrl: './mxgraph.component.html',
  styleUrls: ['./mxgraph.component.scss']
})

export class MxgraphComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroyed$ = new Subject();
  public graphItemGroups$: Observable<any[]>;
  project: Project;
  projectsimulationChange$: Subject<string> = new Subject<string>();
  private animSubscription: Subscription;
  diagram: Diagram;
  projectItem: GraphItem;
  currentProject: Project;
  constructor(private elementRef: ElementRef,
              private readonly projectStore: Store<fromStore.State>,
              private graphService: GraphService) {
                this.graphItemGroups$ = projectStore.pipe(select(fromStore.getGraphItemGroup));
               }
  graph: any;
  editor: FieldMxEditor;
  lane2b: any;
  toolbar: any;

  ngOnInit() {
    this.initGrph(this.elementRef.nativeElement.querySelector('.mxg-wrap'));
    this.animSubscription = this.projectsimulationChange$.subscribe(() => { this.simulateGraphProcess(); });
  }
  ngAfterViewInit() {
    this.toolbar = new mxToolbar(document.getElementById('graph-item-list-parent'));
    this.toolbar.enabled = false;
    this.graphItemGroups$.pipe(takeUntil(this.destroyed$)).subscribe(graphItemGroup => {
      if (graphItemGroup.length > 0) {
        graphItemGroup.forEach((item) => {
          item._formatedItems.forEach((formatedItem) => {
            if (formatedItem.graphItemType === GraphItemTypes.swimlane) {
              this.defineToolbarItem(formatedItem.svgIconPath, 32, 32, undefined, formatedItem.title);
             } else {
              this.defineToolbarItem(formatedItem.svgIconPath, 32, 32, formatedItem.builtIn ? `shape=${formatedItem.icon};
              verticalLabelPosition=bottom;portConstraint=eastwestsouthnorth` : `shape=image;image=${
                formatedItem.svgIconPath};verticalLabelPosition=bottom;portConstraint=eastwestsouthnorth`, formatedItem.title);
             }
          });
          this.toolbar.addLine();
        });
      }
    });
  }
  ngOnDestroy() {
    this.destroyed$.next();
    if (this.animSubscription) {
      this.animSubscription.unsubscribe();
    }
  }
  zoomIn() {
    this.editor.graph.zoomIn();
  }
  zoomOut() {
    this.editor.graph.zoomOut();
  }
  actual() {
    this.editor.graph.zoomActual();
  }
  fit() {
    this.editor.graph.center();
  }
  private initGrph(node: HTMLElement) {
    this.editor = new FieldMxEditor(node);
    const parent = this.editor.graph.getDefaultParent();
    this.editor.graph.getModel().beginUpdate();
    try {

      const pool1 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Pool 1', x: 0, y: 0, style: null, width: 640, height: 0, graphItemType: GraphItemTypes.swimlane}), parent);
      pool1.setConnectable(false);

      const lane1a = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Lane A', x: 0, y: 0, style: null, width: 640, height: 110, graphItemType: GraphItemTypes.swimlane }), pool1);
      lane1a.setConnectable(false);

      const lane1b = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Lane B', x: 0, y: 0, style: null, width: 640, height: 110, graphItemType: GraphItemTypes.swimlane }), pool1);
      lane1b.setConnectable(false);

      const pool2 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Pool 2', x: 0, y: 0, style: null, width: 640, height: 0, graphItemType: GraphItemTypes.swimlane  }), parent);
      pool2.setConnectable(false);

      const lane2a = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Lane A', x: 0, y: 0, style: null, width: 640, height: 140, graphItemType: GraphItemTypes.swimlane  }), pool2);
      lane2a.setConnectable(false);

      const lane2b = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Lane B', x: 0, y: 0, style: null, width: 640, height: 110, graphItemType: GraphItemTypes.swimlane }), pool2);
      lane2b.setConnectable(false);

      const start1 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: null, x: 40, y: 40, width: 30, height: 30, style: 'state', graphItemType: GraphItemTypes.startProcess }), lane1a);
      const end1 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'A',  x: 560, y: 40, width: 30, height: 30, style: 'end', graphItemType: GraphItemTypes.stopProcess }), lane1a);

      const step1 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Contact\nProvider',  x: 90, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane1a);
      const step11 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Complete\nAppropriate\nRequest',  x: 190, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane1a);
      const step111 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Receive and\nAcknowledge',  x: 385, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane1a);

      const start2 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem({
        id: null, value: null,  x: 40, y: 40, width: 30, height: 30, style: 'state', graphItemType: GraphItemTypes.startProcess }), lane2b);

      const step2 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Receive\nRequest',  x: 90, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle }), lane2b);

      const step22 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Refer to Tap\nSystems\nCoordinator', x: 190, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane2b);

      const step3 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Request 1st-\nGate\nInformation',  x: 190, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane1b);

      const step33 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Receive 1st-\nGate\nInformation',  x: 290, y: 30, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane1b);

      const step4 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Receive and\nAcknowledge',  x: 290, y: 20, width: 80, height: 50, style: 'process',
        graphItemType: GraphItemTypes.rectangle  }), lane2a);

      const step44 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Contract\nConstraints?',  x: 400, y: 20, width: 50, height: 50, style: 'condition',
        graphItemType: GraphItemTypes.condition  }), lane2a);

      const step444 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'Tap for gas\ndelivery?',  x: 480, y: 20, width: 50, height: 50, style: 'condition',
        graphItemType: GraphItemTypes.condition  }), lane2a);

      const end2 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'B',  x: 560, y: 30, width: 30, height: 30, style: 'end', graphItemType: GraphItemTypes.stopProcess  }), lane2a);
      const end3 = this.editor.graph.insertGraphItemVertex(GraphItemVertex.getItem(
        {id: null, value: 'C',  x: 560, y: 84, width: 30, height: 30, style: 'end', graphItemType: GraphItemTypes.stopProcess  }), lane2a);

      let e = null;
//(parent: any, id: string, value: string, source: GraphItemVertex, target: GraphItemVertex, style)
      this.editor.graph.insertEdge(lane1a, null, null, start1, step1, undefined);
      this.editor.graph.insertEdge(lane1a, null, null, step1, step11, undefined);
      this.editor.graph.insertEdge(lane1a, null, null, step11, step111, undefined);

      this.editor.graph.insertEdge(lane2b, null, null, start2, step2, undefined);
      this.editor.graph.insertEdge(lane2b, null, null, step2, step22, undefined);
      this.editor.graph.insertEdge(parent, null, null, step22, step3, undefined);

      this.editor.graph.insertEdge(lane1b, null, null, step3, step33, undefined);
      this.editor.graph.insertEdge(lane2a, null, null, step4, step44, undefined);
      this.editor.graph.insertEdge(lane2a, null, 'No', step44, step444, 'verticalAlign=bottom');
      this.editor.graph.insertEdge(parent, null, 'Yes', step44, step111, 'verticalAlign=bottom;horizontal=0;labelBackgroundColor=white;');

      this.editor.graph.insertEdge(lane2a, null, 'Yes', step444, end2, 'verticalAlign=bottom');
      e = this.editor.graph.insertEdge(lane2a, null, 'No', step444, end3, 'verticalAlign=top');
      e.geometry.points = [new mxPoint(step444.geometry.x + step444.geometry.width / 2,
        end3.geometry.y + end3.geometry.height / 2)];

      this.editor.graph.insertEdge(parent, null, null, step1, step2, 'crossover');
      this.editor.graph.insertEdge(parent, null, null, step3, step11, 'crossover');
      e = this.editor.graph.insertEdge(lane1a, null, null, step11, step33, 'crossover');
      e.geometry.points = [new mxPoint(step33.geometry.x + step33.geometry.width / 2 + 20,
        step11.geometry.y + step11.geometry.height * 4 / 5)];
      this.editor.graph.insertEdge(parent, null, null, step33, step4, undefined);
      this.editor.graph.insertEdge(lane1a, null, null, step111, end1, undefined);
    } finally {
      this.editor.graph.getModel().endUpdate();
      this.diagram = this.editor.graph.toJSON();
      this.updateProject(this.diagram);
    }

    this.editor.graph.addListenerCHANGE(() => {
      this.diagram = this.editor.graph.toJSON();
      console.log('__________________________');
      console.log(this.diagram);
      this.updateProject(this.diagram);
    });
    this.editor.graph.selectedModel(() => {
    });
  }
  defineToolbarItem(icon, w, h, style, title) {
    const vertex = new mxCell(title, new mxGeometry(0, 0, w, h), style);
    vertex.setVertex(true);
    this.addToolbarItem(this.toolbar, vertex, icon);
  }

  addToolbarItem(toolbar, prototype, image) {
    const funct = (graph, evt, cell) => {
      this.editor.graph.stopEditing(false);

      const pt = this.editor.graph.getPointForEvent(evt);
      const vertex = this.editor.graph.getModel().cloneCell(prototype);
      vertex.geometry.x = pt.x;
      vertex.geometry.y = pt.y;

      this.editor.graph.setSelectionCells(this.editor.graph.importCells([vertex], 0, 0, cell));
    };

    // Creates the image which is used as the drag icon (preview)
    const img = toolbar.addMode(prototype.value, image, funct);
    const ds = mxUtils.makeDraggable(img, this.editor.graph, funct);
    ds.highlightDropTargets = true;

    ds.getDropTarget = function(graphParam, x, y) {
      if (graphParam.isSwimlane(prototype)) {
        return null;
      } else {
        const cell = graphParam.getCellAt(x, y);
        if (graphParam.isSwimlane(cell)) {
          return cell;
        } else {
          const parent = graphParam.getModel().getParent(cell);

          if (graphParam.isSwimlane(parent)) {
            return parent;
          }
        }
      }
    };
  }
  updateProject(diagram: any) {
    this.project = new Project({
      id: uuid(),
      title: 'mxGraph Angular Playground',
      diagram,
      processes: [new Processes({
        projectId: uuid(),
        sequence: [],
        actions: []
      })
      ]
    });
  }
  save() {
    const projectF = GenerateProcess.generateProcessFromGraph(this.project, null, null);

    if (this.currentProject && this.currentProject.id) {
      this.currentProject = Object.assign({}, this.currentProject, projectF);
      this.projectStore.dispatch(new EditProject(this.currentProject));
    } else {
      this.project.title = 'mxGraph Angular Playground';
      this.projectStore.dispatch(new CreateProject(this.project));
    }
}
execute() {
  this.projectsimulationChange$.next();
}
  simulateGraphProcess() {
    const cssproject = `stroke-dasharray: 8; animation: dash 0.5s linear; animation-iteration-count: infinite;`;
    const processedProject = GenerateProcess.generateProcessFromGraph(
      this.project,
      [],
      []);

    const vertices = Utility.getGeneratedGraphPaths(processedProject);
    if (vertices) {
    const visited = [];
    //  const json = this.editor.graph.animateJsonModel(vertices);
    const json = this.editor.graph.getJsonModel();
    console.log('json', json);
    json.graph.forEach((item) => {
      if (item.edge && !visited[item.id]) {
        visited[item.id] = true;
        const state = this.editor.graph.view.getState(item);
        if (state) {
          state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
          state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke-width', '6');
          state.shape.node.getElementsByTagName('path')[0].setAttribute('stroke', 'lightGray');
          state.shape.node.getElementsByTagName('path')[1].setAttribute('style', cssproject);
        }
      }
    });
    }
  }
}
