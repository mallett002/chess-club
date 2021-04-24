import React from 'react';
import {View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PIECES} from '../../constants/board-helpers';
import {colors} from '../../constants/colors';

const calculateCellWidth = () => {
  const width = Dimensions.get('window').width;

  return (width) / 8;
};

const generateCellStyle = (n) => ({
  backgroundColor: n % 2 === 0 ? colors.DARK_CELL : colors.LIGHT_CELL
});

const Cell = ({cell, cellIndex, rowIndex }) => {
  const cellWidth = calculateCellWidth();

  return (
    <View
      style={[
        generateCellStyle(cellIndex + rowIndex - 1),
        {
          height: cellWidth,
          width: cellWidth
        }
      ]}>
      {cell && <Icon
        color={cell.color === 'b' ? colors.BLACK_PIECE : colors.WHITE_PIECE}
        name={PIECES[cell.type]}
        size={cellWidth}
      />}
    </View>
  );
};

export default Cell;
