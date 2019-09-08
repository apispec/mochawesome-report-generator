import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { QuickSummary, Icon } from 'components';
import { clearfix, ButtonBase } from '../../styles/base'
import { media } from '../../styles/theme'

const Component = styled.div`
    ${clearfix}

    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    min-height: ${props => props.theme.navbar.default.height};
    height: ${props => props.theme.navbar.default.height};
    margin-bottom: 0;
    border: none;
    background: ${props => props.theme.color.bluegrey800};
    box-shadow: ${props => props.theme.shadow.zDepth1};

    ${media.greaterThan("small")`
      min-height: ${props => props.theme.navbar.short.height};
      height: ${props => props.theme.navbar.short.height};
      flex-direction: initial;
    `}
`

const ReportInfoCount = styled.div`
    display: flex;
    overflow: hidden;
    padding-right: 12px;

    ${media.greaterThan("small")`
      flex-grow: 1;
    `}
`

const MenuButton = styled(ButtonBase)`
    height: 40px;
    margin: 8px 8px 0 8px;
    padding: 8px;
    color: ${props => props.theme.color.icon.inactive.light};

    &:hover {
      color: ${props => props.theme.color.icon.active.light};
    }
`

const ReportTitle = styled.h1`
    flex-grow: 1;
    font-family: ${props => props.theme.font.light.family};
    color: #fff;
    font-size: 18px;
    line-height: calc(${props => props.theme.navbar.short.height} - 4px);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const PercentBar = styled.div`
    ${clearfix}

    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
`
const PercentBarSegment = styled.span.attrs(props => ({
  title: `${props.percent.toFixed(2)}% ${props.titleSuffix}`,
}))`
    height: 4px;
    width: ${props => props.percent}%;

    ${props => props.type === 'pass' && `background-color: ${props.theme.color.green500};`}
    ${props => props.type === 'fail' && `background-color: ${props.theme.color.red500};`}
    ${props => props.type === 'pend' && `background-color: ${props.theme.color.ltblue500};`}
`;


const Navbar = ({ onMenuClick, reportTitle, stats }) => {
  const { passPercent, pendingPercent } = stats;

  const failPercent = 100 - passPercent;
  const allPending = pendingPercent === 100;
  const showPctBar = passPercent !== null && pendingPercent !== null;

  return (
    <Component role="navigation">
      <ReportInfoCount>
        <MenuButton onClick={onMenuClick}>
          <Icon name="menu" />
        </MenuButton>
        <ReportTitle title={reportTitle}>
          {reportTitle}
        </ReportTitle>
      </ReportInfoCount>
      <QuickSummary stats={stats} />
      {showPctBar && (
        <PercentBar>
          {allPending && <PercentBarSegment percent={pendingPercent} type="pend" titleSuffix="Pending" />}
          {!allPending && <PercentBarSegment percent={passPercent} type="pass" titleSuffix="Passing" />}
          {!allPending && <PercentBarSegment percent={failPercent} type="fail" titleSuffix="Failing" />}
        </PercentBar>
      )}
    </Component>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func,
  reportTitle: PropTypes.string,
  stats: PropTypes.object,
};

Navbar.displayName = 'Navbar';

export default Navbar;
