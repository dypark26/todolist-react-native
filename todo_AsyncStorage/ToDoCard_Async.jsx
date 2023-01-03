import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ToDoList = ({ todo, todos, setTodos, setCategory }) => {
  const [editText, setEditText] = useState(todo.content);
  const [isEditing, setIsEditing] = useState(false);

  const setDone = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isDone = !newTodos[idx].isDone;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    Alert.alert("Todo 삭제", "정말 삭제하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  const EditTodo = (id) => {
    setIsEditing(!isEditing);
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].content = editText;
    setTodos(newTodos);
  };

  // todos 데이터 값이 변경될 때마다 그 값을 저장
  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    console.log("save");
    if (todos.length > 0) saveTodos();
  }, [todos]);

  return (
    <LinearGradient
      colors={todo.isDone ? ["#E4DED5", "#E4DED5"] : ["#0DF0AC", "#E4DED5"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      locations={[0, 0.7]}
      style={Styles.toDoList}
    >
      {isEditing ? (
        <TextInput
          onSubmitEditing={() => EditTodo(todo.id)}
          value={editText}
          onChangeText={setEditText}
          style={{ backgroundColor: "white", flex: 1 }}
        />
      ) : (
        <Text style={{ color: todo.isDone ? "#c8c1b6" : "#000000" }}>
          {todo.content}
        </Text>
      )}
      <View style={Styles.iconWrapper}>
        <TouchableOpacity onPress={() => setDone(todo.id)}>
          <MaterialIcons name="check" size={22} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => EditTodo(todo.id)}>
          <MaterialIcons name="edit" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
          <MaterialIcons name="delete" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
export default ToDoList;

const Styles = StyleSheet.create({
  toDoList: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 78,
  },
});
