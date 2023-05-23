import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Authentification = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("YEEEES");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log("YEEEES");
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("YEEEES");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center w-100 mt-5">
      <div className="d-inline-flex flex-column mt-4">
        <div className="mb-3">
          <label for="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="inputEmail"
          />
          <div id="emailHelp" className="form-text">
            Ne partagez pas votre email avec n'importe qui
          </div>
        </div>

        <div className="mb-3">
          <label for="inputPass" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="inputPassword"
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button type="submit" onClick={signIn} className="btn btn-primary ">
            Sign In
          </button>
          <button
            type="submit"
            onClick={signInWithGoogle}
            className="btn btn-primary "
          >
            Sign In with Google
          </button>
          <button type="submit" onClick={logout} className="btn btn-primary ">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/**<div className="mb-3">
          <label for="inputUser" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={(e) => setUser(e.target.value)}
            className="form-control"
            id="inputUser"
          />
        </div>
         <div className="mb-3 form-check ">
          <input type="checkbox" className="form-check-input" id="inputCheck" />
          <label for="input-Check" className="form-check-label">
            Check me out
          </label>
        </div> */
