import styled from "styled-components";

export const StyledNav = styled.nav`
  position: fixed;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 375px;
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

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: white;
    font-weight: 200;
    text-shadow: 0 0 0px rgba(255, 255, 255, 0);
    transition: all 0.3s ease-in-out;
  }

  &.active {
    a {
      font-weight: 300;
      text-shadow:
        0 0 7px #ffffffc5,
        0 0 10px #ffffffcc,
        0 0 21px #ffffffdd;
    }
  }

  &:hover {
    a {
      text-shadow:
        0 0 7px #ffffff7c,
        0 0 10px #ffffff4a,
        0 0 21px #ffffff78;
    }
  }
`;
