import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

// This contains JSX code for the all expenses screen

export default function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodName="Total"
      fallbackText="No registered expenses found."
    />
  );
}
