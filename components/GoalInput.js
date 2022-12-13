import { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

function GoalInput(props) {
    const [enteredText, setEnteredText] = useState('');

    function inputHandler(enteredText) {
        //console.log(enteredText);
            setEnteredText(enteredText);
    };

    function addGoalHandler() {

        if (enteredText!=""){
            props.onAddGoal(enteredText);
            setEnteredText('');
        }
       
    }

    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/images/goal.png')}/>
                <TextInput style={styles.textInput} placeholder='Your course goal!' onChangeText={inputHandler} value={enteredText}/>
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <Button title='Add Goal' onPress={addGoalHandler} color='#5e0acc'/>
                    </View>
                    <View style={styles.btn}>
                        <Button title='Cancle' onPress={props.onCancle} color='#f31282'/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        padding: 15,
        backgroundColor: '#311b6b',
      },
    image: {
        width: 100,
        height: 100,
        margin: 20,
    },
    btnContainer: {
        marginTop: 15,
        flexDirection: 'row',
    },
    btn: {
        width: '30%',
        marginHorizontal: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#e4d0ff',
        borderRadius: 6,
        width: '100%',
        marginRight: 8,
        padding: 8,
    },
});