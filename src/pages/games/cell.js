import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PIECES } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';


const generateCellStyle = (cellIndex, cellWidth, selectedStyles) => {
  // TODO: figure out styles here
  // const n = cellIndex + rowIndex - 1;

  const styles = {
    backgroundColor: cellIndex % 2 !== 0 ? colors.DARK_CELL : colors.LIGHT_CELL,
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
        style={generateCellStyle(index, cellWidth, selectedStyles)}>
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
