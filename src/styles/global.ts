import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
html,
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

a {
  color: inherit;
  text-decoration: none;
}
`;
