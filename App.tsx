import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { string, number } from 'prop-types';

interface Todo{
  text:string,
  completed:boolean
}

export default function App() {
  const [value,setValue] = useState<string>("");
  const [todoList,setTodos] = useState<Todo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  const handleSubmit=():void=>{
    if(value.trim()){
      setTodos([...todoList, {text:value, completed:false}])
    } else showError(true);
    setValue("");
  }

  const removeTodo=(index:number):void=>{
    const newTodoList = [...todoList];
    newTodoList.splice(index,1);
    setTodos(newTodoList);
  }

  const toggleCompleted=(index:number):void=>{
    const newTodoList = [...todoList];
    newTodoList[index].completed=!newTodoList[index].completed
    setTodos(newTodoList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputWrapper}>
        <TextInput 
          placeholder="Type task here"
          value={value}
          style={styles.inputBox}
          onChangeText={e=>setValue(e)}
        />
        <Button onPress={handleSubmit} title={"Add Task"}/>
      </View>
      {error && <Text style={styles.error}>Error: Input field is Empty </Text>}
      <Text style={styles.subtitle}>Your Tasks</Text>
      {todoList.length === 0 && <Text>No to do task available</Text>}
      {
        todoList.map((toDo:Todo, index)=>(
          <View style={styles.listItem} key={`${index}_${toDo.text}`}>
            <Text 
              style={[
                styles.task,
                {textDecorationLine:toDo.completed?'line-through':'none'}
              ]}
            >
              {toDo.text}
            </Text>
            <Button onPress={()=>toggleCompleted(index)} title={toDo.completed? 'completed': 'complete'}/>
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:35,
    alignItems:'center'
  },
  inputWrapper:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom: 20
  },
  inputBox:{
    width:200,
    borderColor: "purple",
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8
  },
  title:{
    fontSize: 40,
    marginBottom: 40,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: "purple"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  addButton: {
    alignItems: "flex-end"
  },
  task: {
    width: 200
  },
  error: {
    color: "red"
  }
});
