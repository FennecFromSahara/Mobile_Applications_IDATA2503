import { MEALS, CATEGORIES, FILTERS } from '../data/dummy-data';
import { useContext, useLayoutEffect } from 'react';
import MealsList from '../components/MealsList/MealsList';
import { FiltersContext } from '../store/context/filters-context';

export default function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;
  const filtersContext = useContext(FiltersContext);

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(categoryId) >= 0;
  });

  function filterMeals(meals, filterIds) {
    return meals.filter((meal) => {
      // Apply the selected filters to the meal
      if (
        (filterIds.includes('f1') && !meal.isGlutenFree) ||
        (filterIds.includes('f2') && !meal.isLactoseFree) ||
        (filterIds.includes('f3') && !meal.isVegetarian) ||
        (filterIds.includes('f4') && !meal.isVegan)
      ) {
        return false; // Meal does not match selected filters
      }

      return true; // Meal matches selected filters
    });
  }

  const filteredMeals = filterMeals(displayedMeals, filtersContext.ids);

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id === categoryId
    ).title;

    navigation.setOptions({ title: categoryTitle });
  }, [categoryId, navigation]);

  return <MealsList items={filteredMeals} />;
}
