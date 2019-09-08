import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty';

import { Icon } from 'components';
import { TestList } from 'components/test';
import { SuiteChart, SuiteList, SuiteSummary } from 'components/suite';

import { clearfix, useToggle } from '../../styles/base'
import { media } from '../../styles/theme'


const SuiteCard = styled.section`
    ${clearfix}

    position: relative;
    background-color: ${props => props.theme.color.white};
    margin-bottom: 20px;

    ${props => props.root && `
      box-shadow: ${props.theme.shadow.zDepth1};
      margin: 0 0 24px 0;
    `}

    ${props => !props.root && `
      border: 1px solid ${props.theme.color.grey300};
      border-right: none;
      border-bottom: none;
      margin: 16px 0 16px 16px;

      ${!props.hasTests && `
        border-bottom: 1px solid ${props.theme.color.grey300};
      `}
    `}

    ${props => props.hasSuites && `
    
    `}

    ${props => !props.hasSuites && `
    
    `}

    /* TODO: .list-main > .no-tests > .body > ul > li > .component:not(.no-suites) */
    ${props => props.hasTests && `
      ${props.hasSuites && `
        border-bottom: 1px solid ${props.theme.color.grey300};
      `}
    `}

    ${props => !props.hasTests && !props.hasBeforeHooks && !props.hasAfterHooks && `
    
    `}

    ${props => props.hasPasses && `
    
    `}

    ${props => props.hasFailures && `
    
    `}

    ${props => props.hasPending && `

    `}

    ${props => props.hasSkipped && `

    `}

    ${props => props.enableChart && `

    `}
`

const Header = styled.header`
    ${clearfix}

    border-bottom: 1px solid ${props => props.theme.color.grey300};

    ${props => props.noTests && `
      padding-bottom: 0;
      border-bottom: none;
    `}

    ${media.greaterThan("small")`
      ${props => props.enableChart && !props.noTests && `
        min-height: 66px;
      `}
    `}    
`

const HeaderButton = styled.button`
    background: #fff;
    border: none;
    cursor: pointer;
    padding: 12px 16px;
    text-align: left;
    width: 100%;

    &:focus {
      box-shadow: 0 0 2px 0 ${props => props.theme.color.ltblue500};
      outline: none;
    }
`

const Title = styled.h3`
    display: flex;
    font-family: ${props => props.theme.font.light.family};
    font-size: 21px;
    margin: 0;

    & span {
      margin-right: auto;
    }
`

const ExpandIcon = styled(Icon)`
    margin-left: 58px;
`

const FileName = styled.h6`
    color: ${props => props.theme.color.black54};
    font-family: ${props => props.theme.font.base.family};
    margin: 6px 0 0 0;
`

const Body = styled.div`
    ${clearfix}

    ${props => props.hide && `
      display: none;
    `}

    ${props => props.hasSuites && `
      border-bottom: 1px solid ${props.theme.color.grey300};
    `}
`

const Suite = React.memo(props => {
  const [expanded, toggleExpanded] = useToggle(true);

  const { suite, enableChart, enableCode, isMain } = props;
  const {
    root,
    rootEmpty,
    suites,
    tests,
    beforeHooks,
    afterHooks,
    uuid,
    title,
    file,
    duration,
  } = suite;

  const hasSuites = !isEmpty(suites);
  const hasTests = !isEmpty(tests);
  const hasPasses = !isEmpty(suite.passes);
  const hasFailures = !isEmpty(suite.failures);
  const hasPending = !isEmpty(suite.pending);
  const hasSkipped = !isEmpty(suite.skipped);
  const hasBeforeHooks = !isEmpty(beforeHooks);
  const hasAfterHooks = !isEmpty(afterHooks);
  const totalTests = hasTests ? tests.length : 0;
  const totalPasses = hasPasses ? suite.passes.length : 0;
  const totalFailures = hasFailures ? suite.failures.length : 0;
  const totalPending = hasPending ? suite.pending.length : 0;
  const totalSkipped = hasSkipped ? suite.skipped.length : 0;

  const subSuites = isMain2 =>
    hasSuites && (
      <SuiteList
        suites={suites}
        enableChart={enableChart}
        enableCode={enableCode}
        main={isMain2}
      />
    );

  const testListComp = () =>
    (hasTests || hasBeforeHooks || hasAfterHooks) && (
      <TestList
        uuid={uuid}
        tests={tests}
        beforeHooks={beforeHooks}
        afterHooks={afterHooks}
        enableCode={enableCode}
      />
    );

  const summaryProps = {
    duration,
    totalTests,
    totalPasses,
    totalFailures,
    totalPending,
    totalSkipped,
    noMargin: title === '' && file === '',
  };
  const chartProps = {
    totalPasses,
    totalFailures,
    totalPending,
    totalSkipped,
  };

  if (rootEmpty && !hasBeforeHooks && !hasAfterHooks) {
    return subSuites(true);
  }

  const hideHeader = root && !hasTests && (hasBeforeHooks || hasAfterHooks);

  return (
    <li id={uuid}>
      <SuiteCard root={root || isMain} {...{ hasSuites, hasTests, hasBeforeHooks, hasAfterHooks, hasPasses, hasFailures, hasPending, hasSkipped, enableChart }}>
        {!hideHeader && (
          <Header noTests={!hasTests} enableChart={enableChart}>
            <HeaderButton
              aria-expanded={expanded}
              type="button"
              onClick={toggleExpanded}>
              {title !== '' &&
                <Title>
                  <span>{title}</span>
                  <ExpandIcon name={expanded ? 'expand_less' : 'expand_more'} size={18} />
                </Title>}
              {file !== '' &&
                <FileName>{file}</FileName>}
              {hasTests && enableChart &&
                <SuiteChart {...chartProps} />}
              {hasTests &&
                <SuiteSummary {...summaryProps} />}
            </HeaderButton>
          </Header>
        )}
        <Body hasSuites={hasSuites} hide={!expanded}>
          {testListComp()}
          {subSuites()}
        </Body>
      </SuiteCard>
    </li>
  );
})

Suite.propTypes = {
  suite: PropTypes.object,
  enableChart: PropTypes.bool,
  enableCode: PropTypes.bool,
  isMain: PropTypes.bool,
};

Suite.displayName = 'Suite';

export default Suite;
