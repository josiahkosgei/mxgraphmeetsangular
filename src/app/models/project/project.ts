import { Diagram } from './diagram';
import { Processes } from './processes';
export class Project {
  id: string;
  title: string;
  diagram: Diagram;
  processes: Array<Processes> = [];
  constructor(initialData: Partial<Project> = null) {
    if (initialData != null) {
      this.title = initialData.title;
      this.id = initialData.id;
      this.diagram = new Diagram(initialData.diagram);
      if (initialData.processes != null) {
        initialData.processes.forEach(process => {
            this.processes.push(new Processes(process));
        });
      }
    }
  }
}
