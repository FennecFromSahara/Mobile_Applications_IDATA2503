import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Svg from 'react-native-svg';
import { GlobalStyles } from '../../constants/styles';

// This contains JSX code for the category chart

export default function ExpensesChart({ expenses }) {
  // Calculate total expenses for each category
  const categoryExpenses = {};
  expenses.forEach((expense) => {
    const category = expense.category || 'Other'; // If no category is set, use 'Other'
    categoryExpenses[category] =
      (categoryExpenses[category] || 0) + expense.cost;
  });

  const data = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={Dimensions.get('window').width - 48} // since parent has 24 horizontal padding, idk if i can do this a better way
        height={200}
        yAxisLabel="$/"
        fromZero={true}
        chartConfig={{
          backgroundColor: GlobalStyles.colors.primary50,
          backgroundGradientFrom: GlobalStyles.colors.primary50,
          backgroundGradientTo: GlobalStyles.colors.primary50,
          // barPercentage: 0.6,
          decimalPlaces: 2, // Number of decimal places for labels on the Y-axis
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
