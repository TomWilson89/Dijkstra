export type NodeType = {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  distance: number;
  isVisited: boolean;
  isWall: boolean;
  previousNode: null | NodeType;
};
