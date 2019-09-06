import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components'
import { Duration, Icon } from 'components';

import { clearfix, ListUnstyled } from '../../styles/base'
import { media } from '../../styles/theme'

const Cnt = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 12px;

    ${media.greaterThan("small")`
      flex-direction: initial;
      padding: 14px 12px 0 0;
    `}
`

const List = styled(ListUnstyled)`
    ${clearfix}

    display: flex;
    transition: opacity 0.2s ease-out;
    margin: 0 0 8px 0;

    ${media.greaterThan("small")`
      margin: 0;
    `}
`

const Item = styled.li`
    display: flex;
    font-family: ${props => props.theme.font.light.family};
    align-items: flex-start;
    color: #fff;
    font-size: 16px;
    flex-basis: 25%;

    ${media.greaterThan("small")`
      font-size: 18px;
      flex-basis: initial;
      margin: 0 12px;
    `}
`

const StyledIcon = styled(Icon)`
    position: relative;
    top: 2px;
    font-size: 18px;
    margin-right: 4px;

    ${media.greaterThan("small")`
      font-size: 24px;
      width: 24px;
      top: 0;
    `}
`

const CircleIcon = styled(StyledIcon)`
    font-size: 12px;
    border-radius: 50%;
    padding: 3px;

    ${media.greaterThan("small")`
      font-size: 18px;
    `}
`

const QuickSummary = ({ stats, theme }) => {
  const {
    duration,
    suites,
    testsRegistered,
    passes,
    failures,
    pending,
    skipped,
  } = stats;
  return (
    <Cnt>
      <List>
        <Item title="Duration">
          <Icon name="timer" />
          <Duration
            timer={duration}
            isSummary
          />
        </Item>
        <Item title="Suites">
          <StyledIcon name="library_books" />
          {suites}
        </Item>
        <Item title="Tests">
          <StyledIcon name="assignment" />
          {testsRegistered}
        </Item>
      </List>
      <List>
        <Item title="Passed">
          <CircleIcon name="check" color={theme.color.green700} bgColor={theme.color.green100} />
          {passes}
        </Item>
        <Item title="Failed">
          <CircleIcon name="close" color={theme.color.red700} bgColor={theme.color.red100} />
          {failures}
        </Item>
        {!!pending && (
          <Item title="Pending">
            <CircleIcon name="pause" color={theme.color.ltblue700} bgColor={theme.color.ltblue100} />
            {pending}
          </Item>
        )}
        {!!skipped && (
          <Item title="Skipped">
            <CircleIcon name="stop" color={theme.color.grey700} bgColor={theme.color.grey100} />
            {skipped}
          </Item>
        )}
      </List>
    </Cnt>
  );
};

QuickSummary.propTypes = {
  stats: PropTypes.object,
  theme: PropTypes.object,
};

QuickSummary.displayName = 'QuickSummary';

export default withTheme(QuickSummary);
