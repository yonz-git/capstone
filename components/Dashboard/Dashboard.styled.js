import styled from "styled-components";

export const Container = styled.main`
  color: #ffffffee;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  padding: 40px 24px;
  box-sizing: border-box;
  position: relative;
  justify-content: center;
`;

export const Header = styled.header`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 2rem;
`;

export const CosmicIcon = styled.div`
  margin-bottom: 16px;
  font-size: 60px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

export const Question = styled.p`
  text-align: center;
  margin-top: 2rem;
  font-size: 22px;
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #ffffffee;
  margin: 0 auto;
  margin-top: 1.5rem;
  font-weight: 300;
  width: 16rem;
`;

export const Footer = styled.footer`
  width: 100%;
  margin-bottom: 20px;
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
`;
