import { View, StyleSheet, Text } from 'react-native';
import Input from './Input';
import { useState } from 'react';

export default function ExpenseForm() {
  const [inputValues, setInputValues] = useState({
    cost: '',
    date: '',
    description: '',
  });

  function inputChanged(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue, // [inputIdentifier] is equivalent to getting the value stored inside the inputIdentifier parameter
      };
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Cost"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChanged.bind(this, 'cost'),
            value: inputValues.cost,
          }}
          style={styles.rowInput}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChanged.bind(this, 'date'),
            value: inputValues.date,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChanged.bind(this, 'description'),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24,
  },
});
