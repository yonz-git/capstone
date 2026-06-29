import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    color:ffffffee;
    overflow-y: auto; 


    &::-webkit-scrollbar {
      display: none; 
    }
    scrollbar-width: none;
    -ms-overflow-style: none; 
  }

   body {
    margin: 0;
    margin-bottom:40px;
    body, input, select, textarea, button, a {


      font-family: var(--font-jost), system-ui, sans-serif;
  }

  main {
  font-family: var(--font-jost), system-ui, sans-serif;
  width: 100%;
  max-width: 375px;
  min-height: 100vh;
  margin: 0 auto;   
  position: relative;
  }


  button, input, textarea, select {
    font-family: inherit;
 font-weight:300 !important;

  }

    h1{
     font-weight:300;
      letter-spacing: 0.05rem;}

 h2, label{
 letter-spacing: 0.03rem;
      font-weight:300;}

  p, span{
    font-weight:200;
    letter-spacing: 0.03rem}


  }


`;
