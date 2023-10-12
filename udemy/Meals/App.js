import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesContextProvider from './store/context/favorites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import IconButton from './components/IconButton';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FiltersScreen from './screens/FiltersScreen';
import FiltersContextProvider from './store/context/filters-context';

const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        sceneContainerStyle: { backgroundColor: '#3f2f25' },
        drawerContentStyle: { backgroundColor: '#351401' },
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: '#351401',
        drawerActiveBackgroundColor: '#e4baa1',
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Categories"
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#e4baa1',
        tabBarInactiveTintColor: 'white',
        headerStyle: { backgroundColor: '#351401' },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: '#351401' },
        headerRight: () => (
          <View style={styles.buttonContainer}>
            <IconButton
              icon="settings-outline"
              color={'white'}
              onPress={() => {
                navigation.navigate('Filters');
              }}
            />
          </View>
        ),
      })}
      sceneContainerStyle={{
        backgroundColor: '#3f2f25',
      }}
    >
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoritesContextProvider>
        <FiltersContextProvider>
          {/* <Provider store={store}> */}
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: '#3f2f25' },
              }}
            >
              {/* <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            /> */}
              <Stack.Screen
                name="TabNavigator"
                component={TabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
              />
              <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                options={{
                  title: 'About the meal',
                }}
              />
              <Stack.Screen name="Filters" component={FiltersScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          {/* </Provider> */}
        </FiltersContextProvider>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
});
