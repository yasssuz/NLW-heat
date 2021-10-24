import { useContext } from "react";
import styled from "styled-components";
import LoginBox from "../components/LoginBox";
import MessageList from "../components/MessageList";
import SendMessageForm from "../components/SendMessageForm";
import { AuthContext } from "../contexts/authContext";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <Container className={`${user && "authenticated"}`}>
      <MessageList />
      {user ? <SendMessageForm /> : <LoginBox />}
    </Container>
  );
}

const Container = styled.main`
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 453px;
  column-gap: 120px;
  position: relative;

  &.authenticated::after {
    content: "";
    height: 100vh;
    width: 420px;
    background: url("/src/assets/background.svg");
    background-size: cover;
    position: absolute;
    right: -200px;
    top: 0;
    z-index: -1;
  }
`;
