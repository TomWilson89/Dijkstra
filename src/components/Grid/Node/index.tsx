import React, { FunctionComponent } from "react";
import classnames from "classnames";

import classes from "./styles.module.scss";

interface Props {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const Node: FunctionComponent<Props> = ({
  col,
  isFinish,
  isStart,
  isWall,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
  row,
}) => {
  return (
    <div
      id={`node-${row}-${col}`}
      className={classnames([
        classes.Node,
        {
          [classes.NodeFinish]: isFinish,
          [classes.NodeStart]: isStart,
          [classes.NodeWall]: isWall,
        },
      ])}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
};

export default Node;
