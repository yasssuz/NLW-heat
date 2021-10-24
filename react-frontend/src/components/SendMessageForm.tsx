import { FormEvent, useContext, useState } from "react";
import { VscGithubInverted, VscSignOut } from "react-icons/vsc";
import styled from "styled-components";
import { AuthContext } from "../contexts/authContext";
import { api } from "../services/api";

export default function SendMessageForm() {
  const [message, setMessage] = useState<string>("");
  const { user, signOut } = useContext(AuthContext);

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    await api.post("messages", { message });
    setMessage("");
  }

  return (
    <Container>
      <SignOutBtn onClick={signOut}>
        <VscSignOut size='32' />
      </SignOutBtn>
      <UserData>
        <UserImage>
          <img src={user?.avatar_url} alt={user?.name} />
        </UserImage>
        <UserName>{user?.name}</UserName>
        <UserGithub>
          <VscGithubInverted size='16' />
          {user?.login}
        </UserGithub>
      </UserData>
      <MessageForm onSubmit={handleSendMessage}>
        <MessageLabel htmlFor='message'>Mensagem</MessageLabel>
        <MessageText
          name='message'
          id='message'
          onChange={e => setMessage(e.target.value)}
          value={message}
          placeholder='Qual a sua expectativa para o evento?'
        />
        <SubmitBtn type='submit'>Enviar Mensagem</SubmitBtn>
      </MessageForm>
    </Container>
  );
}

const Container = styled.section`
  background: #1b1b1f;
  padding: 24px;
  align-self: center;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  flex-direction: column;
`;

const SignOutBtn = styled.button`
  background: transparent;
  border: 0;
  color: #c4c4cc;
  position: absolute;
  left: 24px;
  top: 24px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const UserImage = styled.div`
  padding: 3px;
  border-radius: 50%;
  line-height: 0;
  background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);

  img {
    width: 94px;
    border-radius: 50%;
    height: 94px;
    border: 6px solid ${props => props.theme.colors.dark};
  }
`;

const UserName = styled.strong`
  font-size: 24px;
  line-height: 30px;
  margin-top: 16px;
`;

const UserGithub = styled.span`
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: #c4c4c4;

  svg {
    margin-right: 8px;
  }
`;

const MessageForm = styled.form`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-top: 48px;
  background: #202024;
`;

const MessageLabel = styled.label`
  padding: 18px 24px;
  font-size: 20px;
  background: #29292e;
  font-weight: bold;
  text-align: left;
`;

const MessageText = styled.textarea`
  background: transparent;
  border: 0;
  padding: 24px;
  resize: none;
  height: 160px;
  color: #e1e1e6;
  font-size: 16px;
  line-height: 24px;

  &:focus {
    outline: 0;
  }

  &::placeholder {
    color: #8d8d99;
  }
`;

const SubmitBtn = styled.button`
  align-self: flex-end;
  background: #ff008e;
  margin: 24px;
  padding: 0 32px;
  height: 40px;
  border: 0;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  &:hover {
    filter: brightness(0.9);
  }
`;
