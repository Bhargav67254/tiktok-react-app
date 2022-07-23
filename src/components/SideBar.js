import React, { useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import VideocamIcon from "@mui/icons-material/Videocam";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
const SideBar = () => {
  const [activeOne, setActiveOne] = useState(true);
  const [activeTwo, setActiveTwo] = useState(false);
  const [activeThree, setActiveThree] = useState(false);

  function One() {
    setActiveOne(true);
    setActiveTwo(false);
    setActiveThree(false);
  }
  function Two() {
    setActiveOne(false);
    setActiveTwo(true);
    setActiveThree(false);
  }
  function Three() {
    setActiveOne(false);
    setActiveTwo(false);
    setActiveThree(true);
  }

  return (
    <Container>
      <Wrapper>
        <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
          <Home activeOne={activeOne} onClick={One}>
            <Homeicon />
            <h2>For You</h2>
          </Home>
        </Link>
        <Group activeTwo={activeTwo} onClick={Two}>
          <Groupicon />
          <h2>Following</h2>
        </Group>
        <Live activeThree={activeThree} onClick={Three}>
          <Videoicon />
          <h2>Live</h2>
        </Live>
      </Wrapper>
      <hr />
      <Wrap>
        <p>Popular</p>
        <User>
          <UserIcon src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._2f_Sdut7TAxfAdWJDbmvQHaE8%26pid%3DApi&f=1" />
          <p>jack sparrow</p>
        </User>
        <User>
          <UserIcon src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.bj1uMGoEcSWaoZHdGxIp9wHaEK%26pid%3DApi&f=1" />
          <p>jason bourne</p>
        </User>
        <User>
          <UserIcon src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.1_-pyAgKxpwGx0iq0H5RVAHaEK%26pid%3DApi&f=1" />
          <p>john wick</p>
        </User>
      </Wrap>
    </Container>
  );
};

export default SideBar;

const Container = styled.div`
  flex: 0.3;
  margin-right: 10px;
  @media screen and (max-width: 700px) {
    flex: 0;
    h2 {
      display: none;
    }
    p {
      display: none;
    }
  }
`;
const Home = styled.div`
  display: flex;
  margin: 20px 0px;
  align-items: center;
  cursor: pointer;
  h2 {
    font-size: 18px;
    margin-left: 20px;
  }
  color: ${(props) => props.activeOne && "#fe2c55"};
`;
const Group = styled(Home)`
  color: ${(props) => props.activeTwo && "#fe2c55"};
`;
const Live = styled(Home)`
  color: ${(props) => props.activeThree && "#fe2c55"};
`;
const Wrapper = styled.div``;
const Wrap = styled.div`
  p {
    font-weight: 550;
    margin: 10px 0px;
  }
`;
const User = styled.div`
  display: felx;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
`;
const Homeicon = styled(HomeIcon)``;
const Groupicon = styled(GroupIcon)``;
const Videoicon = styled(VideocamIcon)``;
const UserIcon = styled(Avatar)`
  margin-right: 10px;
`;
