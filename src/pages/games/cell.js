import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PIECES, fileToIndex } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';

const getFile = (str) => str.match(/\w/)[0];
const getRank = (str) => str.match(/(\d)/)[0];

const isDark = (label) => {
  const file = getFile(label); // cellIndex (letters)
  const rank = parseInt(getRank(label), 10); // rowIndex
  const fileIndex = parseInt(fileToIndex[file], 10);

  return (rank + fileIndex - 1) % 2 === 0;
};

const generateCellStyle = (label, cellWidth, selectedStyles) => {
  const styles = {
    backgroundColor: isDark(label) ? colors.DARK_CELL : colors.LIGHT_CELL,
    height: cellWidth,
    width: cellWidth,
    ...selectedStyles
  };

  return styles;
};

const Cell = ({ cellWidth, cell, index, selectedStyles, onPress }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(cell.label)}
        style={generateCellStyle(cell.label, cellWidth, selectedStyles)}>
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
