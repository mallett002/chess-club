import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import { indexToFile, indexToRank } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';

import Cell from './cell';

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
  const [moves, setMoves] = useState(null);
  const [selectedCell, select] = useState(null);
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

  useEffect(() => {
    const moves = data.getBoard.moves || null;

    setMoves(moves);
  }, [data.getBoard.moves]);

// TODO: subscribe to board updates

const onCellSelect = (newLabel) => {
  const label = newLabel === selectedCell ? null : newLabel;

  select(label);
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
      // destinationStyles={styles}
      onPress={onCellSelect}
    />
  );
};
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
};

export default Board;
