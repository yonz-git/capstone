import styled from "styled-components";

export const Container = styled.main`
  background-color: #141434;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  text-align: center;

  margin-bottom: 6rem;
`;

export const CosmicIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin: 0 0 8px 0;

  line-height: 1.2;
`;

export const Subtitle = styled.p`
  font-size: 22px;
  color: #e2e2e2;
  margin: 0;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #e2e2e2;
  margin: 0;
  margin-bottom: 5rem;
`;

export const Footer = styled.footer`
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 0.8rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #000000;
  }
`;

export const Link = styled.button`
  width: 100%;
  background-color: #222222;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 0.8rem;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #000000;
  }
`;

export const ButtonIcon = styled.span`
  font-size: 18px;
`;
