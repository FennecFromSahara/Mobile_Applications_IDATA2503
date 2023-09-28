import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

export default function ManageExpense({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.id;
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add expense',
    });
  }, [navigation, isEditing]);

  function deleteExpense() {
    expensesContext.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancel() {
    navigation.goBack();
  }

  function confirm() {
    if (isEditing) {
      expensesContext.updateExpense(editedExpenseId, {
        description: 'Test!!',
        cost: 29.99,
        date: new Date('2022-05-20'),
      });
    } else {
      expensesContext.addExpense({
        description: 'Test',
        cost: 19.99,
        date: new Date('2022-05-19'),
      });
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirm}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
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
});
