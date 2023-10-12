import { Text, StyleSheet, View, Switch, FlatList } from 'react-native';
import { FILTERS } from '../data/dummy-data';
import FilterSwitch from '../components/FilterSwitch';

export default function FiltersScreen() {
  function renderFilter(itemData) {
    return (
      <View style={styles.filterContainer}>
        <View>
          <Text style={styles.title}>{itemData.item.title}</Text>
          <Text style={styles.description}>{itemData.item.description}</Text>
        </View>
        <FilterSwitch filterItem={itemData.item} />
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={FILTERS}
        keyExtractor={(item) => item.id}
        renderItem={renderFilter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  listContainer: {
    marginTop: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'white',
  },
});
