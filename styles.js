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
 font-weight:300 !important;

  }
    p, span{
    font-weight;200;
    letter-spacing: 0.03rem}

    h1{
      letter-spacing: 0.05rem;}

  button{
font-weight: 300 ;
 letter-spacing:0.05rem;
 backdrop-filter: blur(5px);

      //  box-shadow: 0 4px 12px rgba(60, 57, 115, 0.3);

  box-shadow:
      inset 0 0 20px #1f203812,
    inset 20px 0 40px rgba(39, 0, 194, 0.02),
    inset -20px 0 40px rgba(0, 255, 255, 0.02),
    inset 20px 0 100px rgba(64, 0, 255, 0.02),
    inset -20px 0 100px rgba(2, 55, 63, 0.02),
    0 0 2px #1c0d0d27,
    -4px 0 4px rgba(247, 246, 230, 0.83),
    4px 0 4px rgba(173, 174, 220, 0.81);


  background-color: transparent;
transition: all 0.3s ease-in-out;
 
    
    // background-color: #2b375569;
 backdrop-filter: blur(5px);

   }



  button:hover{
transition: all 0.3s ease-in-out;
    color: #ffffff;
 backdrop-filter: blur(5px);
      text-shadow:
        0 0 7px #ffffffc5,
        0 0 10px #ffffffcc,
        0 0 21px #ffffffdd;
    box-shadow:
   inset 0 0 20px #1f203812,
    inset 20px 0 40px rgba(39, 0, 194, 0.02),
    inset -20px 0 40px rgba(0, 255, 255, 0.02),
    inset 20px 0 100px rgba(64, 0, 255, 0.02),
    inset -20px 0 100px rgba(2, 55, 63, 0.02),
    0 0 2px #1c0d0d27,

    0 0 1px #ffffff27,
    -4px 0 4px rgba(247, 246, 230, 0.77),
    4px 0 4px rgba(173, 174, 220, 0.85);
   
    


}



  body {
    margin: 0;
    margin-bottom:40px;
    body, input, select, textarea, button, a {
    font-family: var(--font-jost), sans-serif;

    
  }

  }


`;
