import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { indexToFile, indexToRank } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';

import Cell from './cell';

// For now:
// const board = [
//   [
//     { type: 'r', color: 'b' },
//     null,
//     { type: 'b', color: 'b' },
//     { type: 'q', color: 'b' },
//     { type: 'k', color: 'b' },
//     { type: 'b', color: 'b' },
//     { type: 'n', color: 'b' },
//     { type: 'r', color: 'b' }
//   ],
//   [
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' },
//     { type: 'p', color: 'b' }
//   ],
//   [
//     null,
//     null,
//     { type: 'n', color: 'b' },
//     null,
//     null,
//     null,
//     null,
//     null
//   ],
//   [
//     null, null, null,
//     null, null, null,
//     null, null
//   ],
//   [
//     { type: 'p', color: 'w' },
//     null,
//     null,
//     { type: 'p', color: 'w' },
//     null,
//     null,
//     null,
//     null
//   ],
//   [
//     null, null, null,
//     null, null, null,
//     null, null
//   ],
//   [
//     null,
//     { type: 'p', color: 'w' },
//     { type: 'p', color: 'w' },
//     null,
//     { type: 'p', color: 'w' },
//     { type: 'p', color: 'w' },
//     { type: 'p', color: 'w' },
//     { type: 'p', color: 'w' }
//   ],
//   [
//     { type: 'r', color: 'w' },
//     { type: 'n', color: 'w' },
//     { type: 'b', color: 'w' },
//     { type: 'q', color: 'w' },
//     { type: 'k', color: 'w' },
//     { type: 'b', color: 'w' },
//     { type: 'n', color: 'w' },
//     { type: 'r', color: 'w' }
//   ]
// ];

// selecting g8:
// const moves = [
//   {
//     color: 'b',
//     from: 'g8',
//     to: 'h6',
//     flags: 'n',
//     piece: 'n',
//     san: 'Nh6'
//   },
//   {
//     color: 'b',
//     from: 'g8',
//     to: 'f6',
//     flags: 'n',
//     piece: 'n',
//     san: 'Nf6'
//   }
// ]

const cellWidth = (Dimensions.get('window').width) / 8;

const GET_BOARD_QUERY = gql`
  query GetBoard($gameId: ID!){
    getBoard(gameId: $gameId) {
      gameId
      moves {
        color
        from
        to
        flags
        piece
        san
      }
      playerOne
      playerTwo
      positions {
        type
        color
        label
      }
      turn
    }
  }
`;

const Board = ({ route }) => {
  const { gameId } = route.params;
  const {
    data,
    error,
    loading,
  } = useQuery(GET_BOARD_QUERY, {
    variables: {
      gameId
    }
  });

  if (error) {
    return (
      <View><Text>{'There was an error loading the board.'}</Text></View>
    );
  }

  if (loading) {
    return (
      <View><Text>{'Loading game...'}</Text></View>
    )
  }

  // TODO: subscribe to board updates

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
    // if (selectedCell === 'g8') {
    //   moves.forEach((move) => {
    //     if (move.to === item.label) {
    //       styles.backgroundColor = colors.DESTINATION_CELL;
    //     }
    //   });
    // }

    return (
      <Cell
        isSelected={isSelected}
        cell={item}
        cellWidth={cellWidth}
        destinationStyles={styles}
        onPress={() => onCellSelect(item.label)}
      />
    );
  };

  if (data & data.getBoard) {
    return (
      <View style={{ marginTop: 40 }}>
        <FlatList
          numColumns={8}
          data={data.getBoard.positions}
          renderItem={renderItem}
          keyExtractor={cell => cell.label}
          extraData={selectedCell}
        />
      </View>
    );
  }

  return null;
};

export default Board;
