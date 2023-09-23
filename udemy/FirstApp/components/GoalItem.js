import { StyleSheet, View, Text, Pressable } from 'react-native';

export default function GoalItem(props) {
  return (
    <View style={styles.goalWrapper}>
      <Pressable
        android_ripple={{ color: '#dddddd' }}
        onPress={props.deleteFunction.bind(this, props.id)}
        style={({pressed}) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalWrapper: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white',
    padding: 8,
  },
  pressedItem: {
    opacity: 0.5,
  }
});
