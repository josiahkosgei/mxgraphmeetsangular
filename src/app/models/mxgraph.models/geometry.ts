export class Geometry {
  x: number;
  y: number;
  width: number;
  height: number;
  relatibe: boolean;
  constructor(initialData: Partial<Geometry> = null) {
    if (initialData != null) {
      this.x = initialData.x;
      this.y = initialData.y;
      this.width = initialData.width;
      this.height = initialData.height;
      this.relatibe = initialData.relatibe;
    }
  }
}
