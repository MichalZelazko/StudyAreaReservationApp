export interface IArea {
    id: number;
    name: string;
    x_position: number;
    y_position: number;
  }
  
  export interface IBuilding {
    id: number;
    name: string;
    areas: IArea[];
  }
  