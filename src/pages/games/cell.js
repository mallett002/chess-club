import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PIECES } from '../../constants/board-helpers';
import { colors } from '../../constants/colors';


const generateCellStyle = (rowIndex, cellIndex, isSelected, cellWidth) => {
  const n = cellIndex + rowIndex - 1;

  const styles = {
    backgroundColor: n % 2 === 0 ? colors.DARK_CELL : colors.LIGHT_CELL,
    height: cellWidth,
    width: cellWidth
  };

  if (isSelected) {
    return {
      ...styles,
      borderWidth: 1,
      borderColor: 'green'
    };
  }

  return styles;
};

const Cell = ({ cellWidth, cell, cellIndex, rowIndex }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsSelected(!isSelected)}
        style={[
          generateCellStyle(rowIndex, cellIndex, isSelected, cellWidth),
        ]}>
        {cell && <Icon
          color={cell.color === 'b' ? colors.BLACK_PIECE : colors.WHITE_PIECE}
          name={PIECES[cell.type]}
          size={cellWidth}
        />}
      </TouchableOpacity>
    </View>
  );
};

export default Cell;
