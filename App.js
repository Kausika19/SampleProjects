import { useState } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function startAddGoals(){
    setModalIsVisible(true);
  }

  function endAddGoals(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredText) {
    //console.log(enteredText);
    //setGoals([...goals, enteredText]);  not the best practice
    setGoals((currentGoals) => [...currentGoals, {text: enteredText, id: Math.random().toString()}, ]);
    endAddGoals();  
  }

  function deleteGoalHandler(id){
    //console.log('Delete!');
    setGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Button title="Add New Goal" color="#a065ec" onPress={startAddGoals}/>
        <GoalInput visible={modalIsVisible} onAddGoal = {addGoalHandler} onCancle={endAddGoals}/>
        
        <View style={styles.listContainer}>
          <FlatList data={goals} renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>; 
          }} 
          keyExtractor={(item, index) => {
            return item.id;
          }}
          />
            {/*{goals.map((goal) => ( ))}
              */}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 50,
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 5,
    //alignItems: 'center', 
  },
  goalsContainer: {
    flex: 5,
  },
});
