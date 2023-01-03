import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import uuid from "react-native-uuid";
import ToDoCard from "../components/ToDoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // 처음 마운트 됐을 때 스토리지에서 데이터 가져옴
  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos");
      const resp_cat = await AsyncStorage.getItem("category");
      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat);
    };
    console.log("get");
    getData();
  }, []);

  // 카테고리 값이 변경될 때마다 그 값을 저장
  const setCat = async (cat) => {
    setCategory(cat);
    await AsyncStorage.setItem("category", cat);
    console.log("category");
  };

  const newTodo = {
    id: uuid.v4(),
    content,
    isDone: false,
    category,
  };

  const handleAddToDo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setContent("");
  };

  return (
    <SafeAreaView style={Styles.backgorund}>
      <View style={Styles.contentArea}>
        <View style={Styles.headerWrapper}>
          <View style={Styles.tabs}>
            <TouchableOpacity
              onPress={() => setCat("javascript")}
              style={{
                ...Styles.button,
                backgroundColor:
                  category === "javascript" ? "#0DF0AC" : "#E4DED5",
              }}
            >
              <Text>javascript</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCat("react")}
              style={{
                ...Styles.button,
                backgroundColor: category === "react" ? "#0DF0AC" : "#E4DED5",
              }}
            >
              <Text>React</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCat("cordingTest")}
              style={{
                ...Styles.button,
                backgroundColor:
                  category === "cordingTest" ? "#0DF0AC" : "#E4DED5",
              }}
            >
              <Text>Coding Test</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={Styles.Input}
            value={content}
            onChangeText={setContent}
            placeholder="어떤 일을 해볼까요?"
            placeholderTextColor="#B8B0A4"
            onSubmitEditing={handleAddToDo}
          />
        </View>
        <ScrollView style={Styles.listWrapper}>
          {todos.map((todo) => {
            if (category === todo.category)
              return (
                <ToDoCard
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  setCategory={setCategory}
                />
              );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default App;

const Styles = StyleSheet.create({
  backgorund: { flex: 1, backgroundColor: "#EEE9E2" },
  headerWrapper: {
    flexDirection: "column",
    paddingTop: 16,
    // backgroundColor: "blue",
  },
  tabs: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#E4DED5",
  },
  buttonSelect: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    height: 50,
    fontSize: 30,
    backgroundColor: "#0DF0AC",
  },
  Input: {
    backgroundColor: "#E4DED5",
    height: 50,
    marginHorizontal: 16,
    paddingLeft: 16,
    borderRadius: 10,
    backgroundColor: "#E4DED5",
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 78,
  },
  listWrapper: {
    marginTop: 16,
  },
});
