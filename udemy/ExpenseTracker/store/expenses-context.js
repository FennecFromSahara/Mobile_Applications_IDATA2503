import { createContext, useReducer } from 'react';

const DUMMY_EXPENSES = [
  {
    id: 'id1',
    description: 'A pair of shoes',
    cost: 59.99,
    date: new Date('2021-12-19'),
    category: 'Food',
  },
  {
    id: 'id2',
    description: 'A pair of trousers',
    cost: 89.29,
    date: new Date('2022-01-05'),
    category: 'Leisure',
  },
  {
    id: 'id3',
    description: 'Some bananas',
    cost: 5.99,
    date: new Date('2021-12-01'),
    category: 'Work',
  },
  {
    id: 'id4',
    description: 'A book',
    cost: 14.99,
    date: new Date('2022-02-19'),
    category: 'Food',
  },
  {
    id: 'id5',
    description: 'Another book',
    cost: 18.59,
    date: new Date('2022-02-18'),
    category: 'Food',
  },
  {
    id: 'id6',
    description: 'Another book',
    cost: 18.59,
    date: new Date('2022-02-18'),
    category: 'Leisure',
  },
  {
    id: 'id7',
    description: 'Another book',
    cost: 18.59,
    date: new Date('2022-02-18'),
    category: 'Travel',
  },
  {
    id: 'id8',
    description: 'Another book',
    cost: 18.59,
    date: new Date('2023-09-30'),
    category: 'Travel',
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, cost, date, category }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, cost, date, category }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString(); // placeholder way to generate "unique" id
      return [{ ...action.payload, id: id }, ...state];
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
