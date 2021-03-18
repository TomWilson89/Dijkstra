import { NodeType } from "./types";

type Node = {
  row: number;
  col: number;
  rowStartPosition: number;
  colStartPosition: number;
  rowFinishPosition: number;
  colFinishPosition: number;
};

export const createNode = ({
  row,
  col,
  rowStartPosition,
  colStartPosition,
  rowFinishPosition,
  colFinishPosition,
}: Node) => {
  return {
    col,
    row,
    isStart: row === rowStartPosition && col === colStartPosition,
    isFinish: row === rowFinishPosition && col === colFinishPosition,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

type Grid = {
  rowTotalSize: number;
  colTotalSize: number;
  rowStartPosition: number;
  colStartPosition: number;
  rowFinishPosition: number;
  colFinishPosition: number;
};

export const getInitialGrid = ({
  rowTotalSize,
  colTotalSize,
  rowStartPosition,
  colStartPosition,
  rowFinishPosition,
  colFinishPosition,
}: Grid) => {
  const grid = [];
  for (let row = 0; row < rowTotalSize; row++) {
    const currentRow = [];
    for (let col = 0; col < colTotalSize; col++) {
      currentRow.push(
        createNode({
          row,
          col,
          colFinishPosition,
          colStartPosition,
          rowFinishPosition,
          rowStartPosition,
        })
      );
    }
    grid.push(currentRow);
  }

  return grid;
};

export const getNewGridWithWall = (
  grid: NodeType[][],
  row: number,
  col: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };

  newGrid[row][col] = newNode;

  return newGrid;
};
