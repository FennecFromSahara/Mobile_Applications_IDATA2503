import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

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
