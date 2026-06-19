import styled from "styled-components";

export const CardContainer = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 20px;
  background-color: #e5d7f8;
  max-width: 350px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  color: #141434;
`;

export const CardTitle = styled.p`
  font-size: 0.85rem;
  color: #666666;
  font-weight: 500;
  display: block;
  margin: 0 0 8px 0;
`;

export const SignHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
`;

export const SignName = styled.h3`
  font-size: 1.8rem;
  margin: 0;
`;

export const SignSymbol = styled.span`
  font-size: 1.8rem;
  color: #000000;
`;

export const SignTraits = styled.p`
  font-size: 0.95rem;
  color: #333333;
  margin: 0;
  line-height: 1.4;
`;
