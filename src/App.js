import React, { useState, useEffect } from "react";
import "./App.css";
import { Form } from "./Component/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { db, auth, storage } from "./config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameDate, setNewGameDate] = useState(0);
  const [newGameReco, setNewGameReco] = useState(false);

  const [updateTitle, setUpdateTitle] = useState("");

  const [gameList, setGameList] = useState([]);

  const gameCollectionRef = collection(db, "games");

  const [fileUpload, setFileUpload] = useState(null);

  const getGameList = async () => {
    try {
      const data = await getDocs(gameCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setGameList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const updateGameTitle = async (id) => {
    const gameDoc = doc(db, "games", id);
    await updateDoc(gameDoc, { title: updateTitle });
    getGameList();
  };

  const deleteGame = async (id) => {
    const gameDoc = doc(db, "games", id);
    await deleteDoc(gameDoc);
    getGameList();
  };

  useEffect(() => {
    getGameList();
  }, []);

  const onSubmitGame = async () => {
    try {
      await addDoc(gameCollectionRef, {
        title: newGameTitle,
        date: newGameDate,
        recommanded: newGameReco,
        userId: auth?.currentUser?.uid,
      });
      getGameList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesForderRef = ref(storage, `StorFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesForderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Form />
      <div>
        <input
          type="text"
          placeholder="game"
          onChange={(e) => setNewGameTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="date"
          onChange={(e) => setNewGameDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={newGameReco}
          onChange={(e) => setNewGameReco(e.target.checked)}
        />
        <label>Recommanded</label>
        <button onClick={onSubmitGame}>Submit Game</button>

        {gameList.map((game, index) => {
          return (
            <div key={index}>
              <h2 style={{ color: game.recommanded ? "green" : "red" }}>
                {game.title}
              </h2>
              <span>{game.date}</span>
              <button onClick={() => deleteGame(game.id)}>Delete</button>
              <input
                placeholder="new title"
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <button onClick={() => updateGameTitle(game.id)}>Update</button>
            </div>
          );
        })}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}
/** */

export default App;
