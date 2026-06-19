import styled from "styled-components";

export const Container = styled.main`
  background-color: #141434;
  color: #ffffff;
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
  margin-bottom: 3.5rem;
`;

export const CosmicIcon = styled.div`
  margin-bottom: 16px;
  font-size: 64px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 8px 0;
  line-height: 1.2;
`;

export const Question = styled.p`
  text-align: center;
  margin-top: 4rem;
  font-size: 22px;
`;

export const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #ffffff;
  margin: 0;
  margin-top: 1.5rem;
  font-weight: 300;
`;

export const Footer = styled.footer`
  width: 100%;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #000000;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
`;
