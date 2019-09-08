import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import get from 'lodash/get';

import DropdownMenu from './menu';


const Comp = styled.div`
    position: relative;
`

export const ToggleButton = styled.button`
    white-space: nowrap;
`

const Dropdown = props => {
  const { onToggle } = props;
  const [open, setOpen] = useState(false);
  const handler = useRef(null)

  const closeMenu = useCallback(() => {
    setOpen(false);
    /* istanbul ignore else */
    if (onToggle) {
      onToggle(false);
    }
  }, [onToggle]);

  const divRef = useCallback(node => {
    if (handler.current) {
      document.removeEventListener('click', handler.current);
    }
    if (node && open) {
      handler.current = event => {
        if (event.target !== node && !node.contains(event.target)) {
          closeMenu();
        }
      };
      document.addEventListener('click', handler.current);
    }
  }, [open, closeMenu]);

  useEffect(() => {
    return () => {
      if (handler.current) {
        document.removeEventListener('click', handler.current);
      }
    }
  }, []);

  const select = item => {
    closeMenu();
    props.onItemSelected(item);
  };

  const toggleListDisplay = () => {
    setOpen(!open);
    /* istanbul ignore else */
    if (props.onToggle) {
      props.onToggle(!open);
    }
  };

  const _getItemText = item => get(item, props.itemTitleProp);

  const {
    className,
    list,
    selected,
    iconOnly,
    menuAlign,
    menuStyle,
    showSelected,
    itemTitleProp,
    itemRenderFn,
    toggleIcon,
  } = props;

  const displayItem = selected || { title: 'Please select' };

  return (
    <Comp ref={divRef} className={className}>
      <ToggleButton type="button" onClick={toggleListDisplay}>
        { /* instead of margin-left in .toggle-icon:not(.icon-only) */}
        {!iconOnly && <span css="margin-right: 0.5rem;">{_getItemText(displayItem)}</span>}
        {!!toggleIcon && toggleIcon}
      </ToggleButton>
      <DropdownMenu
        menuAlign={menuAlign}
        open={open}
        style={menuStyle}
        list={list}
        selected={selected}
        showSelected={showSelected}
        itemTitleProp={itemTitleProp}
        itemRenderFn={itemRenderFn}
        itemClickFn={itemRenderFn ? closeMenu : select}
      />
    </Comp>
  );
}

Dropdown.propTypes = {
  className: PropTypes.string,
  iconOnly: PropTypes.bool,
  list: PropTypes.array,
  menuAlign: PropTypes.oneOf(['left', 'right']),
  menuStyle: PropTypes.object,
  selected: PropTypes.object,
  showSelected: PropTypes.bool,
  onItemSelected: PropTypes.func,
  onToggle: PropTypes.func,
  itemRenderFn: PropTypes.func,
  toggleIcon: PropTypes.element,
  itemTitleProp: PropTypes.string,
};

Dropdown.defaultProps = {
  iconOnly: false,
  itemTitleProp: 'title',
}

Dropdown.displayName = 'Dropdown';

export default Dropdown;
