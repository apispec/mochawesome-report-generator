import { css } from 'styled-components';

import materialIconsRegularWoff2Url from 'material-design-icons/iconfont/MaterialIcons-Regular.woff2';
import materialIconsRegularWoffUrl from 'material-design-icons/iconfont/MaterialIcons-Regular.woff';
import robotoLightWoff2Url from '../fonts/roboto-light-webfont.woff2';
import robotoLightWoffUrl from '../fonts/roboto-light-webfont.woff';
import robotoMediumWoff2Url from '../fonts/roboto-medium-webfont.woff2';
import robotoMediumWoffUrl from '../fonts/roboto-medium-webfont.woff';
import robotoRegularWoff2Url from '../fonts/roboto-regular-webfont.woff2';
import robotoRegularWoffUrl from '../fonts/roboto-regular-webfont.woff';

export const fontFaces = css`
  @font-face {
    font-family: 'robotolight';
    src: url(${robotoLightWoff2Url}) format('woff2'),
        url(${robotoLightWoffUrl}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'robotomedium';
    src: url(${robotoMediumWoff2Url}) format('woff2'),
      url(${robotoMediumWoffUrl}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'robotoregular';
    src: url(${robotoRegularWoff2Url}) format('woff2'),
      url(${robotoRegularWoffUrl}) format('woff');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: normal;
    src: url(${materialIconsRegularWoff2Url}) format('woff2'),
      url(${materialIconsRegularWoffUrl}) format('woff');
  }
`;

// TODO
export const materialIcons = css`
.material-icons {
    display: inline-block;
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px; /* Preferred icon size */
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;
  
    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
  
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;
  
    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;
  
    /* Support for IE. */
    font-feature-settings: 'liga';
  }
  
  /* Rules for sizing the icon. */
  .material-icons.md-18 {
    font-size: 18px;
  }
  .material-icons.md-24 {
    font-size: 24px;
  }
  .material-icons.md-36 {
    font-size: 36px;
  }
  .material-icons.md-48 {
    font-size: 48px;
  }
  
  /* Rules for using icons as black on a light background. */
  .material-icons.md-dark {
    color: rgba(0, 0, 0, 0.54);
  }
  .material-icons.md-dark.md-inactive {
    color: rgba(0, 0, 0, 0.26);
  }
  
  /* Rules for using icons as white on a dark background. */
  .material-icons.md-light {
    color: rgba(255, 255, 255, 1);
  }
  .material-icons.md-light.md-inactive {
    color: rgba(255, 255, 255, 0.3);
  }
`;
