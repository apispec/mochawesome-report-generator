import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Icon from '../material-icon';
import { MainList, MenuButton } from '../dropdown/menu';
import Dropdown, { ToggleButton } from '../dropdown';

const ToggleIcon = styled(Icon).attrs(() => ({
  name: 'arrow_drop_down',
  size: 18
}))`
    position: absolute;
    top: 4px;
    right: 4px;
    color: ${props => props.theme.color.black38};
`

const Component = styled.div`
    
`

export const Label = styled.span`
    
    ${props => props.withIcon && `
      margin-left: 12px;
    `}
`

const StyledDropdown = styled(Dropdown)`
    right: -8px;

    & ${ToggleButton} {
      display: inline-block;
      font-family: ${props => props.theme.font.base.family};
      font-size: 14px;
      color: ${props => props.theme.color.black54};
      vertical-align: top;
      line-height: 24px;
      padding: 0 22px 0 0;
      cursor: pointer;
      border: none;
      background: none;
      outline: none;
      width: 70px;

      &:focus {
        box-shadow: 0 0 2px 0 ${props => props.theme.color.ltblue500};
      }
    }

    & ${MainList} {
      box-shadow: ${props => props.theme.shadow.zDepth1};
      font-family: ${props => props.theme.font.light.family};
      min-width: 70px;
      width: 70px;
      background: #fff;
      top: 0;
    }

    & ${MenuButton} {
      border: none;
      color: ${props => props.theme.color.black38};
      cursor: pointer;
      padding: 4px 10px;
      text-align: left;
      width: 100%;

      &:hover {
        background-color: ${props => props.theme.color.grey100};
      }

      &:focus {
        box-shadow: inset 0 0 2px 0 ${props => props.theme.color.ltblue500};
        outline: none;
      }
    }
`

const DropdownSelector = (props) => {
  const {
    className,
    label,
    icon,
    onSelect,
    selections,
    selected,
  } = props;
  return (
    <Component className={className}>
      {!!icon && <Icon name={icon} /> /* TODO toggle-switch.css:  & .icon */}
      {!!label && <Label withIcon={!!icon}>{label}</Label>}
      <StyledDropdown
        showSelected
        list={selections}
        selected={selected}
        onItemSelected={onSelect}
        toggleIcon={<ToggleIcon />}
      />
    </Component>
  );
}

DropdownSelector.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.object,
  selections: PropTypes.array.isRequired,
};

DropdownSelector.displayName = 'DropdownSelector';

export default DropdownSelector;
