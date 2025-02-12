import { useState, useEffect } from 'react'
import './App.css'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

function App() {

  useEffect(() => {
    const dbRef = ref(db);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  return (
    <>
      <div className='container'>

      </div>
    </>
  )
}

export default App