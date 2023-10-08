import { FlatList } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import { useState } from 'react';

export default function CategoriesScreen({ navigation }) {
  const [numColumns, setNumColumns] = useState(2);

  function renderCategoryItem(itemData) {
    function categoryPressed() {
      navigation.navigate('MealsOverview');
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={categoryPressed}
      />
    );
  }

  return (
    <FlatList
      key={numColumns}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={numColumns}
    />
  );
}
