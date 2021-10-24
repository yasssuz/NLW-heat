import styled from "styled-components";
import io from "socket.io-client";

import { api } from "../services/api";

import logoImg from "../assets/logo.svg";
import { useEffect, useState } from "react";

interface Message {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const messagesQueue: Message[] = [];

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messagesQueue.push(newMessage);
});

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prev =>
          [messagesQueue[0], prev[0], prev[1]].filter(Boolean)
        );
        messagesQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>("messages/last3").then(response => {
      setMessages(response.data);
    });
  }, []);

  return (
    <Container>
      <Logo src={logoImg} alt='doWhile' />
      <List>
        {messages.map(message => (
          <ListItem key={message.id}>
            <Message>{message.text}</Message>
            <UserData>
              <UserImg>
                <img src={message.user.avatar_url} alt='Diego Fernandes' />
              </UserImg>
              <UserName>{message.user.name}</UserName>
            </UserData>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 2rem;
`;

const Logo = styled.img`
  height: 28px;
  margin: 32px 0;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  flex: 1;
`;

const ListItem = styled.li`
  max-width: 440px;

  &:nth-child(2) {
    margin-left: 80px;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  line-height: 1.8rem;
`;

const UserData = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const UserImg = styled.div`
  padding: 2px;
  border-radius: 50%;
  line-height: 0;
  background: linear-gradient(100deg, #ff008e 0.48%, #ffcd1e 100%);

  img {
    width: 30px;
    border-radius: 50%;
    height: 50%;
    border: 3px solid ${props => props.theme.colors.dark};
  }
`;

const UserName = styled.span`
  font-size: 1rem;
  margin-left: 0.8rem;
`;
