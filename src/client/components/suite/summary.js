import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Duration, Icon } from 'components';
import { ListUnstyled, clearfix } from '../../styles/base';


const Component = styled(ListUnstyled)`
    ${clearfix}

    display: flex;
    font-family: ${props => props.theme.font.base.family};
    font-size: 15px;
    margin: 16px 0 0 0;

    ${props => props.noMargin && `
      margin: 0;
    `}
`

const Item = styled.li`
    display: flex;
    line-height: 18px;
    margin: 0 8px;
    color: ${props => props.theme.color.black54};

    &:first-child {
      margin-left: 0;
    }

    ${props => props.type === 'passed' && `
      color: ${props.theme.color.green500}
    `}

    ${props => props.type === 'failed' && `
      color: ${props.theme.color.red500}
    `}

    ${props => props.type === 'pending' && `
      color: ${props.theme.color.ltblue500}
    `}

    ${props => props.type === 'skipped' && `
      color: ${props.theme.color.black38}
    `}
`

const SummaryIcon = styled(Icon)`
    margin-right: 2px;
`

const SuiteSummary = props => {
  const {
    duration,
    totalTests,
    totalPasses,
    totalFailures,
    totalPending,
    totalSkipped,
    noMargin,
  } = props;

  return (
    <Component noMargin={noMargin}>
      <Item type="duration" title="Duration">
        <SummaryIcon name="timer" size={18} />
        <Duration timer={duration} />
      </Item>
      <Item type="tests" title="Tests">
        <SummaryIcon name="assignment" size={18} />
        {totalTests}
      </Item>
      {!!totalPasses && (
        <Item type="passed" title="Passed">
          <SummaryIcon name="check" size={18} />
          {totalPasses}
        </Item>
      )}
      {!!totalFailures && (
        <Item type="failed" title="Failed">
          <SummaryIcon name="close" size={18} />
          {totalFailures}
        </Item>
      )}
      {!!totalPending && (
        <Item type="pending" title="Pending">
          <SummaryIcon name="pause" size={18} />
          {totalPending}
        </Item>
      )}
      {!!totalSkipped && (
        <Item type="skipped" title="Skipped">
          <SummaryIcon name="stop" size={18} />
          {totalSkipped}
        </Item>
      )}
    </Component>
  );
};

SuiteSummary.propTypes = {
  duration: PropTypes.number,
  totalTests: PropTypes.number,
  totalPasses: PropTypes.number,
  totalFailures: PropTypes.number,
  totalPending: PropTypes.number,
  totalSkipped: PropTypes.number,
  noMargin: PropTypes.bool
};

SuiteSummary.displayName = 'SuiteSummary';

export default SuiteSummary;
