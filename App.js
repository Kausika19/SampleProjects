import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [goals, setGoals] = useState([]);


  async function getTodos() {
    try{
      const response = await fetch("http://172.17.162.120:5000/todoApp")
      const data = await response.json()
      // console.log("data",data)
      setGoals(data)

    }catch(err){
      console.error(err.message)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  function startAddGoals(){
    setModalIsVisible(true);
  }

  function endAddGoals(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredText) {
    console.log(enteredText, "enterd text");
    const a = {"description":enteredText};

    //setGoals([...goals, enteredText]);  not the best practice
    setGoals((goals) => [...goals, a ]);
    // console.log(enteredText)
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
    {console.log(goals)}
      <StatusBar style='light' />
      <View style={styles.container}>
        <Button title="Add New Goal" color="#a065ec" onPress={startAddGoals}/>
        <GoalInput visible={modalIsVisible} onAddGoal = {addGoalHandler} onCancel={endAddGoals}/>
        
        <View style={styles.listContainer}>
          <FlatList data={goals} renderItem={(itemData) => {
            return <GoalItem text={itemData.item.description} key={itemData.item.todo_id} onDeleteItem={deleteGoalHandler}/>; 
          }} 
          // keyExtractor={(item, index) => {
          //   return itemData.item.todo_id;
          // }}
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
