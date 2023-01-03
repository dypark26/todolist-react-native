import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDcWccPbSZp_acOweedPvl7Hy5mq3NsUsk",
  authDomain: "rn-todolist-b99af.firebaseapp.com",
  projectId: "rn-todolist-b99af",
  storageBucket: "rn-todolist-b99af.appspot.com",
  messagingSenderId: "696599091923",
  appId: "1:696599091923:web:747d657cc70b370e955226",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
