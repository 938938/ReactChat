import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0%;
    padding: 0%;
    -ms-overflow-style: none;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
