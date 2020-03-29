import React, { useEffect, useState } from "react";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import "./styles.css";

export default function Profile() {
  // Local storage
  const id = localStorage.getItem("ngo-id");
  const name = localStorage.getItem("ngo-name");

  // Hooks
  const [incidents, setIncidents] = useState([]);

  // * Triggers the first parameter's callback when the second one's state changes.
  useEffect(() => {
    api
      .get("profile", { headers: { Authorization: id } })
      .then(r => setIncidents(r.data.entities))
      .catch(err => console.error("Erro ao obter incidentes", err));
  }, [id, name]);

  // Handlers
  const header = () => (
    <header>
      <img src={logo} alt="'Be the Hero" />
      <span>Bem vindo, {name}</span>

      <Link className="button" to="/incident/new">
        Cadastrar novo caso
      </Link>
      <button>
        <FiPower size={18} color="#E02041" />
      </button>
    </header>
  );
  const removeIncident = id => {
    api
      .delete(`incident/${id}`, { headers: { Authorization: id } })
      .then(r => alert("Incidente excluído."))
      .catch(err => console.error("Erro ao excluir incidente."));

    setIncidents(incidents.filter(i => i.id !== id));
  };
  const conditionalListOf = entries => {
    return entries.length > 0 ? (
      <>
        <h1>Casos cadastrados</h1>
        <ul>
          {incidents.map(i => (
            <li key={i.id}>
              <strong>CASO:</strong>
              <p>{i.title}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{i.description}</p>
              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                }).format(i.value)}
              </p>
              <button type="button" onClick={() => removeIncident(i.id)}>
                <FiTrash2 size={20} color="a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <h1>Sem incidentes cadastrados</h1>
    );
  };

  return (
    <div className="profile-container">
      {header()}
      {conditionalListOf(incidents)}
    </div>
  );
}
