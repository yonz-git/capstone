import styled from "styled-components";

export const Container = styled.main`
  color: #ffffff;
  padding: 40px 24px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin: 40px 0 20px 0;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #f0f0fc;
  margin: 1rem;
  line-height: 1.4;
`;

export const LoadingText = styled.h3`
  text-align: center;
  font-weight: 300;
  margin-top: 50px;
  color: #aa99ff;
`;

export const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 30px;
`;
