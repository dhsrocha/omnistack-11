import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function NewIncident() {
  // Local storage
  const id = localStorage.getItem("ngo-id");
  // Hooks
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);

  // Handlers
  const handleSubmit = async e => {
    e.preventDefault();
    const body = { title, description, value };
    console.info({ "Handling incident submission:": body });
    api
      .post("incident", body, { headers: { Authorization: id } })
      .then(r => {
        alert("Caso cadastrado.");
        history.push("/profile");
      })
      .catch(err => alert("Erro no cadastro", err));
  };

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="'Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para que seu heroi possa resolvê-lo.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar à página inicial
          </Link>
        </section>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição do caso"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
