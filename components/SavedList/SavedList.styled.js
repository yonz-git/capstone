import styled from "styled-components";

export const Container = styled.main`
  color: #ffffff;
  padding: 40px 24px;
  overflow: hidden;
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

export const StatusMessage = styled.div`
  color: #ffffff;
  text-align: center;
  padding: 40px 20px;
  font-size: 16px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.div`
  background: rgba(48, 56, 147, 0.37);
  border: 1px solid #3c3973;
  border-radius: 16px;
  padding: 2rem;

  max-width: 380px;
  text-align: center;

  backdrop-filter: blur(12px);

  color: white;
  h3 {
    font-weight: 300;
    margin-top: 0;
  }
  p {
    color: #cbcbdf;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 1px solid #3c3973;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ConfirmButton = styled.button`
  background: #9537b6;
  border: none;
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 300;
  &:hover {
    background: #b54cdb;
    transition: all 0.3s ease-in-out;
  }
`;
