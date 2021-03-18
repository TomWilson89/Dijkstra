import { FunctionComponent, useEffect, useState } from "react";

import classes from "./styles.module.scss";
import { getInitialGrid, getNewGridWithWall } from "../../lib/utils";
import Node from "./Node";
import { NodeType } from "../../lib/types";
import { dijkstra, getShortesPath } from "../../lib/dijkstra";

const Grid: FunctionComponent = () => {
  const [grid, setGrid] = useState<NodeType[][]>([]);

  const rowTotalSize = 20;
  const colTotalSize = 50;

  const rowStartPosition = 10;
  const colStartPosition = 15;

  const rowFinishPosition = 10;
  const colFinishPosition = 35;

  const [mouseIsPressed, setMouseIsPressed] = useState<boolean>(false);

  useEffect(() => {
    const initialGrid = getInitialGrid({
      rowTotalSize,
      colTotalSize,
      colFinishPosition,
      colStartPosition,
      rowFinishPosition,
      rowStartPosition,
    });
    setGrid(initialGrid);
  }, [
    colFinishPosition,
    colStartPosition,
    colTotalSize,
    rowFinishPosition,
    rowStartPosition,
    rowTotalSize,
  ]);

  const handleMousedown = (row: number, col: number) => {
    const newGrid = getNewGridWithWall(grid, row, col);
    setMouseIsPressed(true);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const animateShortestPath = (nodeInShortestPath: NodeType[]) => {
    for (let i = 0; i < nodeInShortestPath.length; i++) {
      setTimeout(() => {
        const node = nodeInShortestPath[i];
        if (node) {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `${classes.Node} ${classes.NodeShortest}`;
        }
      }, 40 * i);
    }
  };

  const animatedDijkstra = (
    visitedNodesInOrder: NodeType[],
    nodeInShortestPath: NodeType[]
  ) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (visitedNodesInOrder.length === i) {
        setTimeout(() => {
          animateShortestPath(nodeInShortestPath);
        }, 10 * i);
      }

      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node) {
          document.getElementById(
            `node-${node.row}-${node.col}`
          )!.className = `${classes.Node} ${classes.NodeVisited}`;
        }
      }, 10 * i);
    }
  };

  const visualizeDijkstra = () => {
    const startNode = grid[rowStartPosition][colStartPosition];
    const finishNode = grid[rowFinishPosition][colFinishPosition];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)!;
    const nodeInShortestPath = getShortesPath(finishNode);
    animatedDijkstra(visitedNodesInOrder, nodeInShortestPath);
  };

  return (
    <>
      <button onClick={() => visualizeDijkstra()}>Dijkstra</button>
      <div className={classes.Grid}>
        {grid.length &&
          grid.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((node, nodeIndex) => {
                const { col, isFinish, isStart, isWall, row } = node;
                return (
                  <Node
                    key={nodeIndex}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={(row, col) => handleMousedown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                  />
                );
              })}
            </div>
          ))}
      </div>
    </>
  );
};

export default Grid;
