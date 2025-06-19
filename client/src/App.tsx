import React from "react";
import styled from "styled-components";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PlayerProvider from "./context/PlayerContext";
import { Players } from "./components/pages/Players";
import { Management } from "./components/pages/management";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import { Player } from "./components/pages/Player";

const Wrapper = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const client = new ApolloClient({
  // uri: `${process.env.REACT_APP_SERVER_URL}` || "http://localhost:4000/graphql",
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <Wrapper>
      <ApolloProvider client={client}>
        <PlayerProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/players" />} />
              <Route path="players" element={<Players />} />
              <Route path="players/:id" element={<Player />} />
              <Route path="management" element={<Management />} />
            </Route>
          </Routes>
        </PlayerProvider>
      </ApolloProvider>
    </Wrapper>
  );
};

export default App;
