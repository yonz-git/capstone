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
 

  }
    p, span{
    font-weight;200;}

    h1{
    
      letter-spacing: 0.05rem;}

  button{
font-weight: 300 !important;

       box-shadow: 0 4px 12px rgba(60, 57, 115, 0.3);
    border: 1px solid #3c3973;
               background-color: transparent;
                 transition: background-color 0.3s ease-in-out;
 
    
    background-color: #5337afb6;
 backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(60, 57, 115, 0.3);
    border: 1px solid #3c3973;}

  button:hover{
  background-color: #3c22531b;
    color: #ffffff;
 backdrop-filter: blur(5px);
    box-shadow: 0 4px 12px rgba(60, 57, 115, 0.3);
    border: 1px solid #3c3973;}



  body {
    margin: 0;
    margin-bottom:40px;
    body, input, select, textarea, button, a {
    font-family: var(--font-jost), sans-serif;

    
  }

  }


`;
