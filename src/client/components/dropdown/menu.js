import React from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components'
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';

export const MenuButton = styled.button`
    display: block;
    position: relative;
    white-space: nowrap;
    text-decoration: none;
`

const MenuText = styled.span`
    display: block;
    position: relative;
    white-space: nowrap;
    text-decoration: none;
    cursor: default;
`

const List = styled.ul`
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: left;
`

const show = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`
const hide = keyframes`
    0% {
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
    }
`

export const MainList = styled(List)`
    position: absolute;
    top: 100%;
    z-index: 1000;
    visibility: hidden;
    min-width: 160px;
    overflow: auto;

    ${props => props.align === 'left' && `
      left: 0;
    `}

    ${props => props.align === 'right' && `
      right: 0;
    `}

    ${props => props.open && css`
      animation: ${show} ${props.theme.transition.default.duration} ${props.theme.transition.default.easing};
      visibility: visible;
    `}

    ${props => !props.open && css`
      animation: ${hide} ${props.theme.transition.default.duration} ${props.theme.transition.default.easing};
      visibility: hidden;
    `}
`

export const ListItem = styled.li`

    ${props => !props.hasSubList && `
      display: block;
      position: relative;
      white-space: nowrap;
      text-decoration: none;
    `}

  /* moved from dropdown-selector, no way to get selected prop from outside */
    ${props => props.selected && `
      & ${MenuButton} {
        color: ${props.theme.color.green500} !important;
      }
    `}
`

const MenuItem = props => {
  const {
    listItem,
    itemText,
    itemRenderFn,
    itemClickFn,
  } = props;

  const clickFn = e => {
    e.preventDefault();
    /* istanbul ignore else */
    if (isFunction(itemClickFn)) {
      itemClickFn(listItem);
    }
  };

  return (
    itemRenderFn ? (
      itemRenderFn(listItem, itemText, itemClickFn)
    ) : (
        <MenuButton type="button" onClick={clickFn}>
          {itemText}
        </MenuButton>
      )
  );
}

MenuItem.propTypes = {
  listItem: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.array,
  }),
  itemText: PropTypes.string,
  itemRenderFn: PropTypes.func,
  itemClickFn: PropTypes.func,
};

const Menu = props => {
  const {
    listItem,
    selected,
    showSelected,
    itemRenderFn,
    itemClickFn,
    itemTitleProp,
  } = props;

  const { items } = listItem;
  const itemText = get(listItem, itemTitleProp);
  const isSelected = isEqual(listItem, selected);

  return (
    <ListItem hasSubList={listItem.items} selected={showSelected && isSelected}>
      {items
        ? <MenuText>{itemText}</MenuText>
        : <MenuItem {...{ listItem, itemText, itemRenderFn, itemClickFn }} />}
      {items && (
        <List>{items.map((item) => <Menu listItem={item} key={item.title} {...{ selected, showSelected, itemRenderFn, itemClickFn, itemTitleProp }} />)}</List>
      )}
    </ListItem>
  );
}

Menu.propTypes = {
  listItem: PropTypes.shape({
    title: PropTypes.string,
    items: PropTypes.array,
  }),
  selected: PropTypes.object,
  showSelected: PropTypes.bool,
  itemRenderFn: PropTypes.func,
  itemClickFn: PropTypes.func,
  itemTitleProp: PropTypes.string,
};

const DropdownMenu = props => {
  const {
    menuRef,
    style, list,
    menuAlign,
    open,
    selected,
    showSelected,
    itemRenderFn,
    itemClickFn,
    itemTitleProp,
  } = props;

  return (
    <MainList open={open} align={menuAlign} style={style} ref={menuRef}>
      {!!list && list.map((item) => <Menu listItem={item} key={item.title} {...{ selected, showSelected, itemRenderFn, itemClickFn, itemTitleProp }} />)}
    </MainList>
  );
}

DropdownMenu.propTypes = {
  menuRef: PropTypes.func,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.array,
    })
  ),
  menuAlign: PropTypes.oneOf(['left', 'right']),
  open: PropTypes.bool,
  style: PropTypes.object,
  selected: PropTypes.object,
  showSelected: PropTypes.bool,
  itemRenderFn: PropTypes.func,
  itemClickFn: PropTypes.func,
  itemTitleProp: PropTypes.string,
};

DropdownMenu.defaultProps = {
  menuAlign: 'left',
  showSelected: false,
  itemTitleProp: 'title',
};

DropdownMenu.displayName = 'DropdownMenu';

export default DropdownMenu;
