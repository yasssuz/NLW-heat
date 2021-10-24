import styled from "styled-components";
import { VscGithubInverted } from "react-icons/vsc";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function LoginBox() {
  const { signInUrl } = useContext(AuthContext);

  return (
    <Container>
      <Title>Entre e compartilhe sua mensagem</Title>
      <GithubLogin href={signInUrl}>
        <VscGithubInverted size='24' />
        Entrar com Github
      </GithubLogin>
    </Container>
  );
}

const Container = styled.section`
  height: 100vh;
  width: 100%;
  background: ${props => props.theme.colors.darkGray}
    url("/src/assets/banner-girl.png") no-repeat;
  padding: 440px 80px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.strong`
  font-size: 32px;
  line-height: 36px;
`;

const GithubLogin = styled.a`
  background: ${props => props.theme.colors.yellow};
  margin-top: 32px;
  padding: 0 40px;
  height: 56px;
  color: ${props => props.theme.colors.dark};
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  svg {
    margin-right: 1rem;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;
