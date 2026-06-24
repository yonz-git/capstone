import styled from "styled-components";

export const StyledNav = styled.nav`
  position: fixed;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 428px;
  height: 50px;
  background-color: #0a0a0b9f;
  border-top: 1px solid #0a0a0b;
  z-index: 100;
  border-radius: 50px;
  backdrop-filter: blur(15px);
`;

export const NavList = styled.ul`
  display: flex;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  flex: 1;
  display: flex;

  pointer: cursor;
  font-weight: 200;
  &.active {
    font-weight: 400;
  }

  &:hover {
    font-weight: 400;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
    font-weight: 300;
  }
`;
