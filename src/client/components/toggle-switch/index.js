import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Icon } from 'components';
import { clearfix } from '../../styles/base';


const Component = styled.div`
    ${clearfix}

    height: 24px;

    ${props => props.disabled && `
      opacity: 0.6;

      & .toggle {
        cursor: default;
      }
    `}
`

const ToggleIcon = styled(Icon)`
    color: ${props => props.theme.color.black38};

    ${props => props.color && !props.disabled && `
      color: ${props.theme.color[props.color]};
    `}
`

export const ToggleLabel = styled.label`
    display: flex;
    align-items: center;

    ${props => props.withIcon && `
      margin-left: 12px;
    `}
`

const Toggle = styled.span`
    display: inline-block;
    position: relative;
    background-color: ${props => props.theme.color.grey300};
    border-radius: 7px;
    cursor: pointer;
    height: 14px;
    margin-left: auto;
    transition: background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    width: 34px;

    /* knob styles */
    &:before {
      box-shadow: ${props => props.theme.shadow.zDepth1};

      content: '';
      position: absolute;
      background-color: ${props => props.theme.color.grey500};
      border-radius: 100%;
      height: 20px;
      left: 0;
      top: -3px;
      width: 20px;
      transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s;
    }
`

const ToggleInput = styled.input`
    position: absolute;
    opacity: 0;

    &:checked + ${Toggle} {
      background-color: ${props => props.theme.color.green200};
      &:before {
        background-color: ${props => props.theme.color.green500};
        transform: translateX(14px);
      }
    }

    &:focus + ${Toggle}:before {
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 ${props => props.theme.color.ltblue500};
    }
`

const ToggleSwitch = (props) => {
  const {
    active,
    className,
    disabled,
    label,
    icon,
    iconColor,
    id,
    toggleFn,
  } = props;
  const onChangeFn = e => !disabled && toggleFn(e);
  return (
    <Component className={className} disabled={disabled}>
      {!!icon && <ToggleIcon name={icon} color={iconColor} disabled={disabled} />}
      <ToggleLabel withIcon={!!icon} htmlFor={id}>{label}
        <ToggleInput
          aria-label={`Toggle status: ${active ? 'on' : 'off'}`}
          type="checkbox"
          id={id}
          checked={active}
          disabled={disabled}
          onChange={onChangeFn} />
        <Toggle />
      </ToggleLabel>
    </Component>
  );
}

ToggleSwitch.propTypes = {
  active: PropTypes.bool.isRequired,
  className: PropTypes.any,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string,
  icon: PropTypes.string,
  iconColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  toggleFn: PropTypes.func.isRequired,
};

ToggleSwitch.defaultProps = {
  active: false,
};

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;
