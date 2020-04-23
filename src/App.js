import React, { useState, useEffect } from "react";
import api from "./services/api"

import "./styles.css";

function App() {

  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositores(response.data)
    })
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title: "Teste",
      url: "url.teste.teste.com",
      techs: ["javascript", "c#"]
    });

    setRepositores([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/'+id);

    const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)
    repositories.splice(repositorieIndex, 1);
    setRepositores([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositorie => 
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
          )
        }
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
