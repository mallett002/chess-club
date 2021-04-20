import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import uuid from 'react-native-uuid';

// For now:
const getBoard = () => [
  [
    { type: 'r', color: 'b' },
    { type: 'n', color: 'b' },
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
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    null, null, null,
    null, null, null,
    null, null
  ],
  [
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
    { type: 'p', color: 'w' },
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

const calculateCellWidth = () => {
  const width = Dimensions.get('window').width;

  return (width) / 8;
}

const styles = StyleSheet.create({
  rowStyles: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center"
  },
  cell:{
    height: calculateCellWidth(),
    width: calculateCellWidth()
  }
});

const generateCellStyle = (n) => ({
  backgroundColor: n % 2 === 0 ? '#9a783a' : '#d3bb99'
});

const Game = () => {
  const board = getBoard();

  return board.map((row, i) => <View key={i} style={styles.rowStyles}>
    {row.map((cell, index) => <View
      key={uuid.v4()}
      style={[styles.cell, generateCellStyle(index + i - 1)]}>
        <Text>{cell ? cell.type : '  '}</Text>
    </View>)}
  </View>);
};

export default Game;
