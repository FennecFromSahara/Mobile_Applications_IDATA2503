import { Pressable, Text, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date'; //recreate error here by removing {}
import { useNavigation } from '@react-navigation/native';

// This contains JSX code for a single expense item

export default function ExpenseItem({ id, description, cost, date }) {
  const navigation = useNavigation();

  function expenseOnPressed() {
    navigation.navigate('ManageExpense', {
      id: id,
    });
  }

  return (
    <Pressable
      onPress={expenseOnPressed}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          {/* Why not use date.toISOString().slice(0, 10) ??? */}
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.costContainer}>
          <Text style={styles.cost}>${cost.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  costContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    minWidth: 80,
  },
  cost: {
    color: GlobalStyles.colors.primary500,
    fontWeight: 'bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
