import React, { useState } from 'react';
import { View, FlatList, Dimensions } from 'react-native';

import Cell from './cell';
import { indexToFile, indexToRank } from '../../constants/board-helpers';

// For now:
const board = [
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

// selecting g8:
const moves = [
  {
    color: 'b',
    from: 'g8',
    to: 'h6',
    flags: 'n',
    piece: 'n',
    san: 'Nh6'
  },
  {
    color: 'b',
    from: 'g8',
    to: 'f6',
    flags: 'n',
    piece: 'n',
    san: 'Nf6'
  }
]

const mapPositionsToFileRank = (positions) => {
  const pieceByFileAndRank = {};

  for (let rowIndex = 0; rowIndex < positions.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < positions.length; cellIndex++) {
      const label = `${indexToFile[cellIndex]}${indexToRank[rowIndex]}`;
      pieceByFileAndRank[label] = {
        ...positions[rowIndex][cellIndex],
        label
      };
    }
  }

  return Object.values(pieceByFileAndRank);
};

const cellWidth = (Dimensions.get('window').width) / 8;

const Board = () => {
  const positions = mapPositionsToFileRank(board);
  const [selectedCell, select] = useState(null);

  const onCellSelect = (newLabel) => {
    if (newLabel === selectedCell) {
      select(null);
    } else {
      select(newLabel);
    }
  };

  const renderItem = ({ item }) => {
    const styles = {};
    let isSelected = false;

    if (selectedCell === item.label) {
      isSelected = true;
    }

    // hard coded to g8 for now
    if (selectedCell === 'g8') {
      moves.forEach((move) => {
        if (move.to === item.label) {
          styles.backgroundColor = '#41a36d';
        }
      });
    }

    return (
      <Cell
        isSelected={isSelected}
        cell={item}
        cellWidth={cellWidth}
        selectedStyles={styles}
        onPress={() => onCellSelect(item.label)}
      />
    );
  };

  return (
    <View style={{marginTop: 40}}>
      <FlatList
        numColumns={8}
        data={positions}
        renderItem={renderItem}
        keyExtractor={cell => cell.label}
        extraData={selectedCell}
      />
    </View>
  );
};

export default Board;
