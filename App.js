import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import ToDoCard from "./components/ToDoCard";
import Tabs from "./components/Tabs";
import useTodo from "./hooks/useTodo";

const App = () => {
  const { addTodo, content, setContent, category, setCat, todos, setTodos } =
    useTodo();

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
          {todos?.map((todo) => {
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
