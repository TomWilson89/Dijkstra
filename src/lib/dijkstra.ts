import { NodeType } from "./types";

const getAllNodes = (grid: NodeType[][]) => {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
};

const sortNodesByDistnace = (unvisitedNode: NodeType[]) =>
  unvisitedNode.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);

const getUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

const updateUnvisitedNeighbors = (node: NodeType, grid: NodeType[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
};

export const dijkstra = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType
) => {
  const visitedNodesInOrder: Array<NodeType> = [];
  startNode.distance = 0;
  const unvisitedNode = getAllNodes(grid);
  while (!!unvisitedNode.length) {
    sortNodesByDistnace(unvisitedNode);
    const closesNode = unvisitedNode.shift()!;

    if (closesNode.isWall) continue;

    if (closesNode.distance === Infinity) return visitedNodesInOrder;
    closesNode.isVisited = true;
    visitedNodesInOrder.push(closesNode);
    if (closesNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closesNode, grid);
  }
};

export const getShortesPath = (finishNode: NodeType) => {
  const shortesPath = [];
  let current = finishNode;

  while (current?.previousNode) {
    shortesPath.unshift(current);
    current = current.previousNode;
  }

  return shortesPath;
};
