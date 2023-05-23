import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Authentification } from "./Auth";

export const Form = () => {
  return (
    <div>
      <nav className="d-inline-block w-100 bg-primary ">
        <h1 className="display-6 text-white text-center"> Connexion </h1>
      </nav>
      <div className="container w-25 pb-5 bg-light shadow-lg">
        <Authentification />
      </div>
    </div>
  );
};
