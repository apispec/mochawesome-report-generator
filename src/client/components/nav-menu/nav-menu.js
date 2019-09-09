import React, { useRef, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components'
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { format } from 'date-fns';
import find from 'lodash/find';

import { Icon } from 'components';
import { NavMenuItem } from 'components/nav-menu';
import { useStore } from '../store'
import { useEventListener } from '../hooks'
import { media } from '../../styles/theme';
import { ButtonBase, ListUnstyled } from '../../styles/base';
import DropdownSelector, { Label } from '../dropdown-selector';
import ToggleSwitch, { ToggleLabel } from '../toggle-switch';


const Overlay = styled.div`
    display: none;
    background: rgba(0, 0, 0, 0.5);

    ${media.greaterThan("small")`
      display: block;
      position: fixed;
      transition: all 0.2s ease-out;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      cursor: pointer;
      opacity: 0;
    `}
`

const Menu = styled.nav`
    position: absolute;
    transition: all 0.15s cubic-bezier(0.25, 1, 0.8, 1);
    transform: translate(-100%, 0);
    width: 100%;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    background: #fff;

    ${media.greaterThan("small")`
      width: 320px;
      left: auto;
    `}
`

const Wrap = styled.div`
    position: fixed;
    z-index: 2010;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    visibility: hidden;

    ${props => props.open && `
      visibility: visible;

      & ${Overlay} {
        opacity: 1;
      }

      & ${Menu} {
        transform: translate(0, 0);
      }
    `}
`

const Button = styled(ButtonBase)`
    position: absolute;
    top: 16px;
    right: 16px;
    color: ${props => props.theme.color.black54};

    &:hover,
    &:active {
      color: ${props => props.theme.color.black87};
    }
`

const Section = styled.div`
    padding: 0 16px;
    border-bottom: 1px solid ${props => props.theme.color.grey300};
`

const Date = styled.h6`
    color: ${props => props.theme.color.black54};
`

const MainList = styled(ListUnstyled)`
    margin: 8px 0;
`

const control = css`
    display: flex;
    position: relative;
    margin: 8px 0;
    align-items: center;
`

const StyledDropdown = styled(DropdownSelector)`
    ${control}

    & ${Label} {
      display: inline-block;
      flex-grow: 1;
      font-family: ${props => props.theme.font.base.family};
      font-size: 13px;
      vertical-align: top;
      line-height: 24px;
    }
`

const StyledToggleSwitch = styled(ToggleSwitch)`
    ${control}

    & ${ToggleLabel} {
      flex-grow: 1;
      font-family: ${props => props.theme.font.base.family};
      font-size: 13px;
      vertical-align: top;
      line-height: 24px;
    }
`

const NavMenu = observer(() => {
  const reportStore = useStore();
  const overlay = useRef(null);
  const closeBtn = useRef(null);

  const overlayRef = useCallback(node => {
    overlay.current = node;
  }, []);
  const closeBtnRef = useCallback(node => {
    closeBtn.current = node;
  }, []);

  const closeMenu = () => {
    const { closeSideNav, sideNavOpen } = reportStore;
    if (sideNavOpen) {
      closeSideNav();
    }
  }

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  }

  const onOpenChange = (isOpen) => {
    if (isOpen && closeBtn.current) {
      closeBtn.current.focus();
    }
  }

  useEventListener('keydown', onKeydown);
  useEventListener('click', closeMenu, overlay.current);

  useEffect(() => {
    return reaction(
      () => reportStore.sideNavOpen,
      onOpenChange,
      { delay: 100 }
    )
  }, [reportStore])


  const {
    results,
    closeSideNav,
    reportTitle,
    setShowHooks,
    showFailed,
    showHooks,
    showHooksOptions,
    showPassed,
    showPending,
    showSkipped,
    sideNavOpen,
    stats,
    toggleFilter,
  } = reportStore;

  const navItemProps = {
    showPassed,
    showFailed,
    showPending,
    showSkipped,
  };

  const showHooksOpts = showHooksOptions.map(opt => ({
    title: `${opt.charAt(0).toUpperCase()}${opt.slice(1)}`,
    value: opt,
  }));

  const showHooksSelected = find(showHooksOpts, { value: showHooks });

  return (
    <Wrap open={sideNavOpen}>
      <Overlay ref={overlayRef} />
      <Menu>
        <Button
          type="button"
          onClick={closeSideNav}
          ref={closeBtnRef}>
          <Icon name="close" />
        </Button>
        <Section>
          <h3>{reportTitle}</h3>
          <Date>
            {format(stats.end, 'dddd, MMMM D, YYYY h:mma')}
          </Date>
        </Section>
        <Section>
          <StyledToggleSwitch
            label="Show Passed"
            icon="check"
            iconColor="green500"
            id="passed-toggle"
            active={showPassed}
            disabled={stats.passes === 0}
            toggleFn={() => toggleFilter('showPassed')}
          />

          <StyledToggleSwitch
            label="Show Failed"
            icon="close"
            iconColor="red500"
            id="failed-toggle"
            active={showFailed}
            disabled={stats.failures === 0}
            toggleFn={() => toggleFilter('showFailed')}
          />

          <StyledToggleSwitch
            label="Show Pending"
            icon="pause"
            iconColor="ltblue500"
            id="pending-toggle"
            active={showPending}
            disabled={stats.pending === 0}
            toggleFn={() => toggleFilter('showPending')}
          />

          <StyledToggleSwitch
            label="Show Skipped"
            icon="stop"
            iconColor="grey500"
            id="skipped-toggle"
            active={showSkipped}
            disabled={stats.skipped === 0}
            toggleFn={() => toggleFilter('showSkipped')}
          />

          <StyledDropdown
            label="Show Hooks"
            selected={showHooksSelected}
            selections={showHooksOpts}
            onSelect={item => setShowHooks(item.value)}
          />
        </Section>
        <Section>
          {!!results &&
            results.map(suite => (
              <MainList key={suite.uuid}>
                {!!suite.suites &&
                  suite.suites.map(subSuite => (
                    <NavMenuItem
                      key={subSuite.uuid}
                      suite={subSuite}
                      noTests={!suite.tests || suite.tests.length === 0}
                      {...navItemProps}
                    />
                  ))}
              </MainList>
            ))}
        </Section>
      </Menu>
    </Wrap>
  );

});

NavMenu.propTypes = {
};

NavMenu.displayName = 'NavMenu';

export default NavMenu;
