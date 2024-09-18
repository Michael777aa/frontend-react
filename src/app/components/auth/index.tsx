import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
  sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 2, 2),
  },
}));

const ModalImg = styled.img`
  width:330px;
  height: 388px;
  border-radius: 10px;
  background: #000;
  margin-top: 74px;
  margin-left:-280px;
`;

const ModalImgLogin = styled.img`
  width: 62%;
  height: 100%;
  border-radius: 10px;
  background: #000;
  margin-top: 23px;
  margin-left: 10px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [memberFirstName, setMemberFirstName] = useState<string>("");
  const [memberLastName, setMemberLastName] = useState<string>("");
  const [memberEmail, setMemberEmail] = useState<string>("");

  const { setAuthMember } = useGlobals();

  /**HANDLERS */
  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };
  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };
  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };
  const handleFirstName = (e: T) => {
    setMemberFirstName(e.target.value);
  };
  const handleLastName = (e: T) => {
    setMemberLastName(e.target.value);
  };
  const handleEmail = (e: T) => {
    setMemberEmail(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFullfill =
        memberNick !== "" &&
        memberPhone !== "" &&
        memberPassword !== "" &&
        memberFirstName !== "" &&
        memberLastName !== "" &&
        memberEmail !== "";
      if (!isFullfill) throw new Error(Messages.error3);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
        memberFirstName: memberFirstName,
        memberLastName: memberLastName,
        memberEmail: memberEmail,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);
      setAuthMember(result);
      handleSignupClose();
      sweetTopSuccessAlert("Succesfully created!");
    } catch (err) {
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      if (memberNick === "" && memberPassword === "")
        throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      handleLoginClose();
      sweetTopSuccessAlert("Succesfully logged in!");
    } catch (err) {
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={signupOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "800px" }}
          >
            <Stack sx={{ marginLeft: "10px", alignItems: "start" }}>
              <h2
                style={{ marginTop: "40px", position: "relative", top: "-5px" }}
              >
                Signup Form
              </h2>
              <TextField
                sx={{ width: "400px" }}
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                onChange={handleFirstName}
              />
              <TextField
                sx={{ marginTop: "10px", width: "400px" }}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                onChange={handleLastName}
              />
              <TextField
                sx={{ marginTop: "10px", width: "400px" }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={handleUsername}
              />
              <TextField
                sx={{ marginTop: "10px", width: "400px" }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <TextField
                sx={{ marginTop: "10px", width: "400px" }}
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                onChange={handlePhone}
              />

              <TextField
                sx={{ marginTop: "10px", width: "400px", textAlign: "center" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={handleEmail}
              />
              <Fab
                sx={{
                  marginTop: "15px",
                  width: "700px",
                  position: "relative",
                  left: "20px",
                }}
                variant="extended"
                color="primary"
                onClick={handleSignupRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Signup
              </Fab>
            </Stack>
            <ModalImg src={"img/image.jpg"} alt="camera" />
          </Stack>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            sx={{ width: "700px" }}
          >
            <ModalImgLogin src={"img/image.png"} alt="camera" />
            <Stack
              sx={{
                marginLeft: "15px",
                marginTop: "45px",
                alignItems: "center",
              }}
            >
              <h2>Login Form</h2>
              <TextField
                id="outlined-basic"
                label="username"
                variant="outlined"
                sx={{ my: "10px", width: "220px" }}
                onChange={handleUsername}
              />
              <TextField
                id={"outlined-basic"}
                label={"password"}
                variant={"outlined"}
                sx={{ width: "220px" }}
                type={"password"}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
              <Fab
                sx={{ marginTop: "27px", width: "220px" }}
                variant={"extended"}
                color={"primary"}
                onClick={handleLoginRequest}
              >
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
