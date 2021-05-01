import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PIECES, fileToIndex } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';

const getFile = (str) => str.match(/\w/)[0];
const getRank = (str) => str.match(/(\d)/)[0];

const getBackgroundColor = (label, isSelected) => {
  const file = getFile(label);
  const rank = parseInt(getRank(label), 10);
  const fileIndex = parseInt(fileToIndex[file], 10);
  const isDark = (rank + fileIndex - 1) % 2 === 0;

  if (isDark) {
    if (isSelected) {
      // return something a little lighter than dark_cell
      return '#b58222';
    }

    return colors.DARK_CELL;
  }

  if (isSelected) {
    // return something a little lighter than light_cell
    return '#e3cbaa';
  }

  return colors.LIGHT_CELL
};

const generateCellStyle = (label, cellWidth, selectedStyles, isSelected) => {
  const styles = {
    backgroundColor: getBackgroundColor(label, isSelected),
    height: cellWidth,
    width: cellWidth,
    ...selectedStyles
  };

  return styles;
};

const Cell = ({ isSelected: pieceIsSelected, cellWidth, cell, selectedStyles, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(cell.label)}
        style={generateCellStyle(cell.label, cellWidth, selectedStyles, pieceIsSelected)}>
        {cell && cell.type && <Icon
          color={cell.color === 'b' ? colors.BLACK_PIECE : colors.WHITE_PIECE}
          name={PIECES[cell.type]}
          size={cellWidth}
        />}
      </TouchableOpacity>
    </View>
  );
};

export default Cell;
