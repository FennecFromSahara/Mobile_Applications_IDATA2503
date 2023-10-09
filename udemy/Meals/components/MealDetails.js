import { StyleSheet, View, Text } from 'react-native';

export default function MealDetails({ item, style, textStyle }) {
  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailItem, textStyle]}>{item.duration}</Text>
      <Text style={[styles.detailItem, textStyle]}>
        {item.complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>
        {item.affordability.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
