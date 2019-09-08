/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Container } from '../../styles/base';


const Component = styled.footer`
    position: absolute;
    bottom: 0;
    width: 100%;

    /* Set the fixed height of the footer here */
    height: ${props => props.theme.footer.height};
    color: ${props => props.theme.color.black38};
    text-align: center;

    & p {
      font-size: 12px;
      margin: 10px 0;
    }

    & a {
      color: ${props => props.theme.color.black54};
      transition: ${props => props.theme.link.transition};

      &:hover {
        color: ${props => props.theme.color.black87};
      }
    }
`

const urls = {
  site: 'http://adamgruber.github.io/mochawesome/',
  github: 'https://github.com/adamgruber',
};

const Footer = ({ version }) => {
  const copyrightYear = new Date().getFullYear();
  return (
    <Component>
      <Container>
        <p>
          &copy;
          {copyrightYear}
          &nbsp;
          <a href={urls.site} target="_blank" rel="noopener noreferrer">
            Mochawesome
          </a>
          &nbsp;was designed and built by&nbsp;
          <a href={urls.github} target="_blank" rel="noopener noreferrer">
            Adam Gruber
          </a>{' '}
          • <span>v{version}</span>
        </p>
        {}
      </Container>
    </Component>
  );
};

Footer.propTypes = {
  version: PropTypes.string,
};

export default Footer;
