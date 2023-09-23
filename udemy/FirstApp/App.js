import { useState } from 'react';
import { StyleSheet, View, FlatList, Button, StatusBar } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function startAddGoalModal() {
    setModalIsVisible(true);
  }

  function endAddGoalModal() {
    setModalIsVisible(false);
  }

  function addGoal(goalText) {
    // using random here is shit, but he used it in the tutorial so...
    setGoals((currentGoals) => [
      ...currentGoals,
      // if the key property is called "key" we dont need the keyExtractor down there
      { text: goalText, id: Math.random().toString() },
    ]);

    endAddGoalModal();
  }

  function deleteGoal(id) {
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalModal}
        />
        <GoalInput
          onPress={addGoal}
          isVisible={modalIsVisible}
          endAddGoalModalFunction={endAddGoalModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={goals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  deleteFunction={deleteGoal}
                  id={itemData.item.id}
                />
              );
            }}
            // not needed if the key name is "key"
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
