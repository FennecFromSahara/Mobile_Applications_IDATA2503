import { View, StyleSheet } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
  {
    id: 'id1',
    description: 'A pair of shoes',
    cost: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'id2',
    description: 'A pair of trousers',
    cost: 89.29,
    date: new Date('2022-01-05'),
  },
  {
    id: 'id3',
    description: 'Some bananas',
    cost: 5.99,
    date: new Date('2021-12-01'),
  },
  {
    id: 'id4',
    description: 'A book',
    cost: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'id5',
    description: 'Another book',
    cost: 18.59,
    date: new Date('2022-02-18'),
  },
];

export default function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
