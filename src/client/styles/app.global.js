import { createGlobalStyle } from 'styled-components';
import { fontFaces, materialIcons } from './fonts'

export default createGlobalStyle`
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
  
  .clearfix,
  .cf {
    @extend %clearfix;
  }
    
  .details {
    padding-top: calc(${props => props.theme.navbar.default.height} + 24px);
  }
  
  /* Z-levels */
  .z-depth-0 {
    /* stylelint-disable-next-line declaration-no-important */
    box-shadow: none !important;
  }
  
  .z-depth-1 {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  }
  
  .z-depth-1-half {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
  
  .z-depth-2 {
    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .z-depth-3 {
    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
  
  .z-depth-4 {
    box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22),
      0 25px 55px 0 rgba(0, 0, 0, 0.21);
  }
  
  .z-depth-5 {
    box-shadow: 0 27px 24px 0 rgba(0, 0, 0, 0.2),
      0 40px 77px 0 rgba(0, 0, 0, 0.22);
  }
  
  @media (--screen-sm) {
    .details {
      padding-top: calc(${props => props.theme.navbar.short.height} + 24px);
    }
  }
`;
