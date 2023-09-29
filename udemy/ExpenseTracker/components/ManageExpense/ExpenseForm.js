import { View, StyleSheet, Text, Alert } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  editedExpense,
}) {
  const [inputs, setInputs] = useState({
    cost: {
      value: editedExpense ? editedExpense.cost.toString() : '',
      isValid: true,
    },
    date: {
      value: editedExpense ? getFormattedDate(editedExpense.date) : '',
      isValid: true,
    },
    // date: editedExpense ? editedExpense.date.toISOString().slice(0, 10) : '',
    description: {
      value: editedExpense ? editedExpense.description.toString() : '',
      isValid: true,
      // isValid: !!editedExpense, // same as: isValid: editedExpense ? true : false,
    },
  });

  function inputChanged(inputIdentifier, enteredValue) {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true }, // [inputIdentifier] is equivalent to getting the value stored inside the inputIdentifier parameter
      };
    });
  }

  function submit() {
    const expenseData = {
      cost: +inputs.cost.value, // + converts inputValues.cost from a string to number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const costIsValid = !isNaN(expenseData.cost) && expenseData.cost > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (costIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData);
    } else {
      // Alert.alert('Invalid Input', 'Please check your input values');
      setInputs((currentInputs) => {
        return {
          cost: { value: currentInputs.cost.value, isValid: costIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
    }
  }

  const formIsValid =
    inputs.cost.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          isValid={inputs.cost.isValid}
          label="Cost"
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChanged.bind(this, 'cost'),
            value: inputs.cost.value,
          }}
          style={styles.rowInput}
        />
        <Input
          isValid={inputs.date.isValid}
          label="Date"
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChanged.bind(this, 'date'),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
        />
      </View>
      <Input
        isValid={inputs.description.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChanged.bind(this, 'description'),
          value: inputs.description.value,
        }}
      />
      {!formIsValid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submit}>
          {submitButtonLabel}
        </Button>
      </View>
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
});
