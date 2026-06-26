import styled from "styled-components";

export const Container = styled.main`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 24px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  text-align: center;
  font_weight: 300;
  margin-bottom: 8rem;
  height: 120px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;

  margin: 0 0 8px 0;
`;

export const Subtitle = styled.p`
  font-size: 20px;
  color: #e2e2e2;
  margin: 0;
  font-weight: 200;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #e2e2e2;
  margin: 0;
  margin-bottom: 5rem;
  text-align: center;
  font-weight: 200;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 7rem;
`;

export const Footer = styled.footer`
  width: 100%;
`;

export const Button = styled.button`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  z-index: 2;
  width: 100%;

  color: #ffffff;

  padding: 14px;
  font-size: 16px;
`;
