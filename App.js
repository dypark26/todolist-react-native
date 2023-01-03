import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import ToDoCard from "./components/ToDoCard";
import { initializeApp } from "firebase/app";
import Tabs from "./components/Tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "./firebase";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  // todos 의 내용이 바뀔 때마다 스토리지에서 get
  useEffect(() => {
    // onSnapshot API 를 사용해 "todos" 라는 이름의 컬렉션의 값이 변경될 때마다,
    // todos 컬렉션 내부의 모든 document 들을 불러와서,
    // createdAt 의 내림차순으로 정렬해 setTodos 한다.
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = { id: doc.id, ...doc.data() };
        return newTodo;
      });
      setTodos(newTodos);
    });

    // 처음 마운트 됐을 때 스토리지에서 데이터 get
    const getCategory = async () => {
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      setCategory(snapshot.data().category);
    };
    getCategory();
  }, []);

  // 카테고리 값이 바뀔 때마다 스토리지에 create
  const setCat = async (cat) => {
    setCategory(cat);
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };

  const newTodo = {
    content,
    isDone: false,
    category,
    createdAt: Date.now(),
  };

  // 새로운 todo 를 추가
  const addTodo = () => {
    addDoc(collection(dbService, "todos"), newTodo);
    setContent("");
  };

  return (
    <SafeAreaView style={Styles.backgorund}>
      <View style={Styles.contentArea}>
        <View style={Styles.headerWrapper}>
          <Tabs category={category} setCat={setCat} />
          <TextInput
            style={Styles.Input}
            value={content}
            onChangeText={setContent}
            placeholder="어떤 일을 해볼까요?"
            placeholderTextColor="#B8B0A4"
            // onSubmitEditing={addTodo}
            onSubmitEditing={() => {
              addTodo();
            }}
          />
        </View>
        <ScrollView style={Styles.listWrapper}>
          {todos.map((todo) => {
            if (category === todo.category)
              return (
                <ToDoCard
                  key={todo.id}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
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
