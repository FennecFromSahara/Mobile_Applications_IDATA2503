import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { MEALS } from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';

export default function MealDetailScreen({ route, navigation }) {
  const favoriteMealsContext = useContext(FavoritesContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);

  function favoritePressed() {
    if (mealIsFavorite) {
      favoriteMealsContext.removeFavorite(mealId);
    } else {
      favoriteMealsContext.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color={'white'}
            onPress={favoritePressed}
          />
        );
      },
    });
  }, [navigation, favoritePressed]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails item={selectedMeal} textStyle={styles.detailText} />
      <View style={styles.mealRecipeOuterContainer}>
        <View style={styles.mealRecipeContainer}>
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Ingredients</Text>
          </View>
          {selectedMeal.ingredients.map((ingredient) => (
            <View key={ingredient} style={styles.mealRecipe}>
              <Text style={styles.mealRecipeText}>{ingredient}</Text>
            </View>
          ))}
          <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>Steps</Text>
          </View>
          {selectedMeal.steps.map((step) => (
            <View key={step} style={styles.mealRecipe}>
              <Text style={styles.mealRecipeText}>{step}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  subTitle: {
    color: '#e2b497',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    borderBottomColor: '#e2b497',
    borderBottomWidth: 2,
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
  },
  mealRecipe: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: '#e2b497',
  },
  mealRecipeText: {
    color: '#351401',
    textAlign: 'center',
  },
  mealRecipeContainer: {
    maxWidth: '80%',
  },
  mealRecipeOuterContainer: {
    alignItems: 'center',
  },
  rootContainer: {
    marginBottom: 32,
  },
});
