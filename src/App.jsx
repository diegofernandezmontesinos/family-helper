/* eslint-disable no-unused-vars */
import { Amplify, API } from "aws-amplify";
import { graphqlOperation } from "@aws-amplify/api-graphql";
import awsConfig from "./aws-exports";
import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import { listLists } from "./graphql/queries";
import "./App.css";

Amplify.configure(awsConfig);

function App() {
  const [varChange, setVarChange] = useState(false);
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const result = await API.graphql(graphqlOperation(listLists));
      setList(result.data.listLists.items);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [varChange]);
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <h1>Hello, {user?.username}</h1>
          <ul>
            {list.map((list) => (
              <li key={list.id}>
                <h2>{list.name}</h2>
                <p>{list.description}</p>
              </li>
            ))}
          </ul>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;
