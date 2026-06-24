import styled from "styled-components";

export const CardContainer = styled.div`
  border-radius: 12px;
  padding: 20px;

  background: #6358702b;
  backdrop-filter: blur(5px);

  border: 1px solid #3c3973;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  color: #f3f3ff;
`;

export const CardTitle = styled.p`
  font-size: 0.85rem;
  color: #f3f3ff;
  font-weight: 300;
  display: block;
  margin: 0 0 8px 0;
`;

export const SignHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-weight: 300;
`;

export const SignName = styled.h3`
  font-size: 1.8rem;
  margin: 0;
  font-weight: 400;
`;

export const SignSymbol = styled.span`
  font-size: 1.8rem;
  color: #f3f3ff;
`;

export const SignTraits = styled.p`
  font-size: 0.95rem;
  color: #f3f3ff;
  margin: 0;
  line-height: 1.4;
`;
