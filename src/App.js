import { useState, useEffect } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.github.com/users/ricardroberg/repos"
      );
      const data = await response.json();
      setRepositories(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos.`;
  }, [repositories]);

  function handleFavorite(repoId) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === repoId ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map((repo) => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span> (Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}> Favoritar</button>
        </li>
      ))}
    </ul>
  );
}

export default App;

// NÃO FUNCIONOU
// useEffect(async () => {
//   const response = await fetch(
//     "https://api.github.com/users/ricardroberg/repos"
//   );
//   const data = await response.json();

//   setRepositories(data);
// }, []);
