import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished'
import { fontFaces, materialIcons } from './fonts'
import types from './types';

export default createGlobalStyle`
  ${normalize}
  ${fontFaces}
  ${materialIcons}

  * {
    box-sizing: border-box;
  
    &:before,
    &:after {
      box-sizing: border-box;
    }
  }
  
  html {
    position: relative;
    min-height: 100%;
  }
  
  body {
    font-family: ${props => props.theme.font.base.family};
    font-size: ${props => props.theme.font.base.size};
    line-height: ${props => props.theme.font.base.lineHeight};
    color: ${props => props.theme.color.text};
    background-color: ${props => props.theme.color.body};
    margin-bottom: ${props => props.theme.footer.height};
  }
  
  a {
    text-decoration: none;
    transition: ${props => props.theme.link.transition};
  
    &:hover {
      text-decoration: underline;
    }
  }
  
  pre {
    word-break: break-all;
    word-wrap: break-word;
    border-radius: 4px;
  }
  
  ${props => types(props)}
`;
