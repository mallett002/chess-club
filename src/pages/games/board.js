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

const styles = StyleSheet.create({
  rowStyles: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center"
  }
});

const Board = () => {
  const positions = getBoard();

  return (
    <>
      {
        positions.map((row, rowIndex) => <View key={rowIndex} style={styles.rowStyles}>
          {row.map((cell, cellIndex) => <Cell
            cell={cell}
            cellIndex={cellIndex}
            key={uuid.v4()}
            rowIndex={rowIndex}
          />)}
        </View>)}
    </>);
};

export default Board;
