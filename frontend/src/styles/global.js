import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

* {
   margin: 0px;
   padding: 0px;
   outline: 0px;
   box-sizing: border-box;
}

*:focus {
  outline: 0px;
}

html, body, #root {
  height: 100%;
}

body {
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 14px 'Roboto', sans-serif;
}

a {
  text-decoration: none;
  outline: none;
}

ul {
  list-style: none;
}

button {
  cursor: pointer;

  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}
}
`;
