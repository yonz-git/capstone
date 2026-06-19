import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }


  main {
    font-family: var(--font-jost), system-ui, sans-serif;
    width: 100%;
  max-width: 428px;
  min-height: 100vh;
  margin: 0 auto;   
  position: relative;
  }


  button, input, textarea, select {
    font-family: inherit;
  }

  body {
    margin: 0;

  }

  /*  global primary button styles */
  button {

    background-color: #222222;
    color: #ffffff;
    border: none;
    padding: 12px 0 18px 0;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #000000;
    }
  }
`;
