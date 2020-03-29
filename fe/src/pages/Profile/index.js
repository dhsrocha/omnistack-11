import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="'Be the Hero" />
        <span>Bem vindo, APAD</span>

        <Link className="button" to="/incident/new">
          Cadastrar novo caso
        </Link>
      </header>
    </div>
  );
}
