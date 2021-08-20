import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

export function Picker({ coinsData, onChange }) {
  const placeHolder = {
    label: 'Selecione uma moeda...',
    value: null,
    color: '#000',
  };
  return (
    <RNPickerSelect
      placeholder={placeHolder}
      items={coinsData}
      onValueChange={(valor) => onChange(valor)}
      style={{
        inputIOS: {
          fontSize: 20,
          color: '#000',
        },
        inputAndroid: {
          fontSize: 20,
          color: '#000',
        },
      }}
    />
  );
}

Picker.propTypes = {
  coinsData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};
Picker.defaultProps = {
  coinsData: [],
};
