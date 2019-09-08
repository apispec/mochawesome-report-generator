import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty';

import { Icon } from 'components';
import { NavMenuList } from 'components/nav-menu';
import { textOverflow } from '../../styles/base';


const Item = styled.li`
    
    ${props => props.noTests && `
      /* stylelint-disable-next-line selector-max-compound-selectors */
      & > div > ul {
        padding-left: 0;
      }

      &:not(:only-child) {
        padding-left: 22px;
      }
    `}
`

const Link = styled.a`

    display: flex;
    position: relative;
    align-items: center;
    padding: 3px 0;
    color: ${props => props.theme.color.black};

    &:hover {
      color: ${props => props.theme.color.link.hover};
      text-decoration: none;
    }

    &:active,
    &:focus {
      box-shadow: 0 0 2px 0 ${props => props.theme.color.ltblue500};
      outline: none;
      text-decoration: none;
    }

    & span {
      ${textOverflow}

      transition: ${props => props.theme.link.transition};
    }

    ${props => props.disabled && `
      opacity: 0.3;
      pointer-events: none;
    `}
`

const LinkIcon = styled(Icon).attrs(props => ({
  /* eslint-disable no-nested-ternary */
  name: props.pass ? 'check' :
    props.fail ? 'close' :
      props.pending ? 'paused' :
        props.skipped ? 'stop' :
          null,
  /* eslint-enable no-nested-ternary */
  size: props.hook ? 24 : 18
}))`
    margin-right: 2px;

    ${props => props.pass && `
      color: ${props.theme.color.green500};
    `}

    ${props => props.fail && `
      color: ${props.theme.color.red500};
    `}

    ${props => props.pending && `
      color: ${props.theme.color.ltblue500};
    `}

    ${props => props.skipped && `
      color: ${props.theme.color.grey500};
    `}
`

const NavMenuItem = React.memo(props => {

  const {
    className,
    suite,
    showPassed,
    showFailed,
    showPending,
    showSkipped,
    noTests,
  } = props;
  const { suites, uuid, title } = suite;
  const navItemProps = { showPassed, showFailed, showPending, showSkipped };

  const hasTests = !isEmpty(suite.tests);
  const hasPasses = !isEmpty(suite.passes);
  const hasFailures = !isEmpty(suite.failures);
  const hasPending = !isEmpty(suite.pending);
  const hasSkipped = !isEmpty(suite.skipped);

  const fail = hasTests && hasFailures;
  const pending = hasTests && hasPending && !hasFailures;
  const skipped = hasTests && hasSkipped && !hasFailures && !hasPending;
  const pass =
    hasTests && hasPasses && !hasFailures && !hasPending && !hasSkipped;

  const shouldBeDisabled = () => {
    let count = 0;
    if (!hasTests && suites) count += 1;
    if (hasPasses) count += 1;
    if (hasFailures) count += 1;
    if (hasPending) count += 1;
    if (hasSkipped) count += 1;

    if (!showSkipped && hasSkipped) count -= 1;
    if (!showPending && hasPending) count -= 1;
    if (!showFailed && hasFailures) count -= 1;
    if (!showPassed && hasPasses) count -= 1;
    if (
      !showSkipped &&
      !showPending &&
      !showFailed &&
      !showPassed &&
      !hasTests
    )
      count -= 1;

    return count <= 0;
  };

  const scrollToSuite = (e, suiteId) => {
    e.preventDefault();
    // Find element to scroll to
    const suiteEl = document.getElementById(suiteId);
    // Get its top value
    const { top } = suiteEl.getBoundingClientRect();
    // Get the details container and get its top padding
    const detailsCnt = document.getElementById('details');
    let topPad = window
      .getComputedStyle(detailsCnt)
      .getPropertyValue('padding-top');
    topPad = parseInt(topPad, 10);
    // Calc the y position to scroll to
    // 4px offset due to shadow
    const scrollY = document.body.scrollTop + top - (topPad + 4);
    window.scrollTo(0, scrollY);
  };

  return (
    <Item className={className} noTests={noTests && !hasTests}>
      <Link
        href={`#${uuid}`}
        disabled={shouldBeDisabled()}
        onClick={e => scrollToSuite(e, uuid)}
        tabIndex={shouldBeDisabled() ? -1 : 0}>
        <LinkIcon {...{ pass, fail, pending, skipped }} />
        <span>{title === '' ? uuid : title}</span>
      </Link>
      {suites &&
        !!suites.length && <NavMenuList suites={suites} {...navItemProps} />}
    </Item>
  );
})

NavMenuItem.propTypes = {
  className: PropTypes.string,
  suite: PropTypes.object,
  showPassed: PropTypes.bool,
  showFailed: PropTypes.bool,
  showPending: PropTypes.bool,
  showSkipped: PropTypes.bool,
  noTests: PropTypes.bool,
};


NavMenuItem.displayName = 'NavMenuItem';

export default NavMenuItem;

