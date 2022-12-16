import { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";

function GoalInput(props) {
    const [enteredText, setEnteredText] = useState('');

    
    
    function inputHandler(enteredText) {
        //console.log(enteredText);
            setEnteredText(enteredText);

    };

    function addGoalHandler() {
        console.log(enteredText, "");
        if (enteredText!=""){
            props.onAddGoal(enteredText);
            setEnteredText('');
        }
       
    }

    async function onSubmit() {
        //enteredText.preventDefault();   
        //console.log(enteredText);  
        if (enteredText!=""){
            try{
                const body = { enteredText };
                const response = await fetch("http://172.17.162.120:5000/todoApp",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                console.log(body, '');
                //console.log(response);
                props.onAddGoal(enteredText);
            setEnteredText('');
            }catch (err) {
                console.error(err.message);
            }
        }
        
    }


    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/images/goal.png')}/>
                <TextInput style={styles.textInput} placeholder='Your course goal!' 
                onChangeText={inputHandler}
                 value={enteredText}
                 />
                <View style={styles.btnContainer}>
                    <View style={styles.btn}>
                        <Button title='Add Goal' 
                        onPress={onSubmit}
                        //onPress={addGoalHandler}
                        color='#5e0acc'/>
                    </View>
                    <View style={styles.btn}>
                        <Button title='Cancel' onPress={props.onCancel} color='#f31282'/>
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