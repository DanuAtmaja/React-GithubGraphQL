import github from "./db";
import { useEffect, useState, useCallback } from "react";
import query from "./Query";

interface Repo {
    name: string,
    url: string,
    description: string,
}

function App() {
    const [userName, setUserName] = useState("");
    const [repoList, setRepoList] = useState<Repo[]>([]);
    console.log(repoList);

    const fetchData = useCallback(() => {
        fetch(github.baseURL, {
            method: "POST",
            headers: github.headers as HeadersInit,
            body: JSON.stringify(query)
        })
            .then(response => response.json())
            .then(data => {
                const viewer = data.data.viewer;
                setUserName(viewer.name);
                setRepoList(viewer.repositories.nodes);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


  return (
    <div className="App container mt-5">
      <h1 className="text-primary"><i className="bi bi-diagram-2-fill"> Repos</i></h1>
        <p>Hey there {userName}</p>
        {repoList && (
            <ul className="list-group list-group-flush">
                {
                    repoList?.map((item, index) => {
                        return (
                            <li className="list-group-item" key={index}>
                                <a href={item.url} className="h5 mb-0 text-decoration-none">
                                    {item.name}
                                </a>
                                <p className="small">{item.description}</p>
                            </li>
                        );
                    })
                }
            </ul>
        )}
    </div>
  )
}

export default App
