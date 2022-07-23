import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Upload from "./pages/Upload";
import ProfilePage from "./pages/ProfilePage";
import VisitorPage from "./pages/VisitorPage";

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Switch>
          <Route path={"/upload"}>
            <Upload />
          </Route>
          <Route exact path={`/:username`}>
            <ProfilePage />
          </Route>
          <Route exact path={`/profile/:email`}>
            <VisitorPage />
          </Route>
          <Route exact path={"/"}>
            <Wrapper>
              <HomePage />
            </Wrapper>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
