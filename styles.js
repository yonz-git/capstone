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
    margin-bottom:40px;
    body, input, select, textarea, button, a {
    font-family: var(--font-jost), sans-serif;
    
  }

  }


`;
