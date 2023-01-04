import {
  onSnapshot,
  query,
  orderBy,
  addDoc,
  collection,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { dbService } from "../firebase";
const useTodo = () => {
  const [todos, setTodos] = useState([]);

  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
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

    getCategory();
  }, []);

  const newTodo = {
    content,
    isDone: false,
    category,
    createdAt: Date.now(),
  };

  const addTodo = () => {
    addDoc(collection(dbService, "todos"), newTodo);
    setContent("");
  };

  const getCategory = async () => {
    const snapshot = await getDoc(
      doc(dbService, "category", "currentCategory")
    );
    setCategory(snapshot.data().category);
  };

  const setCat = async (cat) => {
    setCategory(cat);
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };
  return { addTodo, content, setContent, category, setCat, todos, setTodos };
};

export default useTodo;
