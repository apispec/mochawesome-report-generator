/* eslint-disable react/no-danger, max-len */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import classNames from 'classnames';
import iconmap from './icon-map.json';

class Icon extends PureComponent {
  render() {
    const { className, name, size, foreground, color, bgColor } = this.props;
    const iconCode = iconmap[name];
    const cxName = classNames(
      'material-icons',
      !!size && `md-${size}`,
      !!foreground && `md-${foreground}`,
      className
    );
    return (
      !!iconCode && (
        <StyledIcon
          color={color}
          bgColor={bgColor}
          className={cxName}
          dangerouslySetInnerHTML={{ __html: `&#x${iconCode};` }}
        />
      )
    );
  }
}

const StyledIcon = styled.i`
  ${props => props.color && `color: ${props.color};`}
  ${props => props.bgColor && `background-color: ${props.bgColor};`}
`

Icon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf([18, 24, 36, 48]),
  foreground: PropTypes.oneOf(['light', 'dark']),
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

Icon.displayName = 'MaterialIcon';

export default Icon;
