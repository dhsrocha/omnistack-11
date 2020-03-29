import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import heroes from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function Logon() {
  // Hooks
  const history = useHistory();

  const [id, setId] = useState("");

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    console.info({ "Handling login submission:": id });
    api
      .post("session", { id })
      .then(r => {
        localStorage.setItem("ngo-id", id);
        localStorage.setItem("ngo-name", r.data.name);
        history.push("/profile");
      })
      .catch(err => alert("Erro no login", err));
  };
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="'Be the Hero" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>
          <input
            placeholder="Sua identificação."
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroes} alt="'Heroes" />
    </div>
  );
}
