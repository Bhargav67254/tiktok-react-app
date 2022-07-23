import React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { useStateValue } from "./stateProvider";

function DialogBox({ open, setOpen }) {
  const [{ user }, dispatch] = useStateValue();

  const handleClose = () => {
    setOpen(false);
  };

  function GoogleLogin() {
    auth
      .signInWithPopup(provider)
      .then((response) => {
        dispatch({
          type: "SET_USER",
          user: response.user,
        });
      })
      .catch((err) => alert(err))
      .then(() => setOpen(false));
  }
  function Logout() {
    auth.signOut().then(() => {
      dispatch({
        type: "SET_USER",
        user: null,
      });
    });

    setOpen(false);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      {!user ? (
        <LoginButton onClick={GoogleLogin}>
          <img src="3.png" alt="" />
          Continue with google
        </LoginButton>
      ) : (
        <LogoutButton onClick={Logout}>Log out</LogoutButton>
      )}
    </Dialog>
  );
}

export default DialogBox;

const LoginButton = styled(Button)`
  padding: 10px 30px !important ;
  background-color: #fe2c55 !important;

  img {
    width: 50px;
    margin-right: 10px;
    background-color: white;
    border-radius: 100%;
  }
  font-size: medium !important;
  color: whitesmoke !important;
  font-weight: 550 !important;
  :hover {
    background-color: #fe2c55;
  }
`;
const LogoutButton = styled(Button)`
  background-color: #fe2c55 !important;
  color: white !important;
  font-weight: 550 !important;
  padding: 10px 30px !important;
`;
