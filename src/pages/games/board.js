import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import uuid from 'react-native-uuid';

import Cell from './cell';

// For now:
const getBoard = () => [
  [
    { type: 'r', color: 'b' },
    null,
    { type: 'b', color: 'b' },
    { type: 'q', color: 'b' },
    { type: 'k', color: 'b' },
    { type: 'b', color: 'b' },
    { type: 'n', color: 'b' },
    { type: 'r', color: 'b' }
  ],
  [
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' },
    { type: 'p', color: 'b' }
  ],
  [
    null,
    null,
    { type: 'n', color: 'b' },
    null,
    null,
    null,
    null,
    null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    { type: 'p', color: 'w' },
    null,
    null,
    { type: 'p', color: 'w' },
    null,
    null,
    null,
    null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null,
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    null,
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' }
  ],
  [
    { type: 'r', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'b', color: 'w' },
    { type: 'q', color: 'w' },
    { type: 'k', color: 'w' },
    { type: 'b', color: 'w' },
    { type: 'n', color: 'w' },
    { type: 'r', color: 'w' }
  ]
];

// maps columns and rows for board
// TODO: Look at generating this where we loop to make the board
/*
- Could have an indexToRankMap & indexToFileMap
- rank: rows (numbers)
- file: columns (letters)
*/
const getBoardNotations = () => {
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
  return columns.reduce((accum, curr, i) => {
    if (!accum[i]) {
      accum[i] = [];
    }

    for (let j = 0; j < 8; j++) {
      accum[i].push(`${curr}${j+1}`);
    }

    return accum;
  }, []);
};

const styles = StyleSheet.create({
  rowStyles: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

const calculateCellWidth = () => {
  const width = Dimensions.get('window').width;

  return (width) / 8;
};

const Board = () => {
  const positions = getBoard();
  const cellWidth = calculateCellWidth();

  return (
    <>
      {
        positions.map((row, rowIndex) => <View key={rowIndex} style={styles.rowStyles}>
          {row.map((cell, cellIndex) => <Cell
            cellWidth={cellWidth}
            cell={cell}
            cellIndex={cellIndex}
            key={uuid.v4()}
            rowIndex={rowIndex}
          />)}
        </View>)}
    </>);
};

export default Board;
