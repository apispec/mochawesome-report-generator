/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Duration, Icon } from 'components';
import { CodeSnippet, TestContext } from 'components/test';
import { useToggle, textOverflow } from '../../styles/base';

const TestCard = styled.section`
    border-bottom: 1px solid ${props => props.theme.color.grey300};
`

const HeaderButton = styled.button`
    display: flex;
    position: relative;
    background: ${props => props.theme.color.white};
    border: none;
    border-left: 3px solid transparent;
    cursor: pointer;
    flex-wrap: wrap;
    padding: 10px 16px 10px 13px;
    transition: border-color 0.2s ease-out;
    width: 100%;

    ${props => props.disabled && `
      cursor: default;
    `}

    &:focus {
      box-shadow: 0 0 2px 0 ${props => props.theme.color.ltblue500};
      outline: none;
    }

    ${props => !props.disabled && !props.expanded && `
      &:focus,
      &:hover {
        border-left-color: ${props.theme.color.grey500};
      }
    `}   
    
    ${props => props.expanded && `
      ${props.pass && `
        border-left-color: ${props.theme.color.green500};
      `}
      ${props.fail && `
        border-left-color: ${props.theme.color.red500};
      `}
    `}
`

const Title = styled.h4`
    ${textOverflow}

    flex-grow: 1;
    font-family: ${props => props.theme.font.base.family};
    font-size: 13px;
    line-height: 24px;
    margin: 0;
    padding-right: 12px;
    text-align: left;

    ${props => props.hook && `
      color: ${props.theme.color.black54};
    `}

    ${props => props.expanded && `
      line-height: 1.5;
      padding-top: 3px;
      white-space: normal;
    `}
`

const Info = styled.div`
    display: flex;
`

const TestDuration = styled(Duration)`
    font-family: ${props => props.theme.font.base.family};
    line-height: 24px;
    color: ${props => props.theme.color.black54};

    ${props => !props.pending && `
      &:hover {
        color: ${props.theme.color.black87};
      }
    `}

    ${props => props.expanded && `
      color: ${props.theme.color.black87};
    `}

    transition: color 0.2s ease-out;
`

const ErrorMessage = styled.p`
    color: var(--red500);
    font-size: 12px;
    margin: 10px 0 0 0;
    text-align: left;
    width: 100%;
    word-break: break-word;
`

const TestIcon = styled(Icon).attrs(props => ({
  /* eslint-disable no-nested-ternary */
  name: props.pass ? 'check' :
    props.fail ? 'close' :
      props.pending ? 'paused' :
        props.skipped ? 'stop' :
          props.hook ? props.fail ? 'error_outline' :
            props.before ? 'rotate_left' : 'rotate_right' :
            null,
  /* eslint-enable no-nested-ternary */
  size: props.hook ? 24 : 18
}))`
    align-self: flex-start;
    padding: 3px;
    border-radius: 50%;
    color: #fff;
    margin-right: 16px;

    ${props => props.pass && `
      color: ${props.theme.color.green100};
      background-color: ${props.theme.color.green500};
    `}

    ${props => props.fail && `
      color: ${props.theme.color.red100};
      background-color: ${props.theme.color.red500};
    `}

    ${props => props.pending && `
      color: ${props.theme.color.ltblue100};
      background-color: ${props.theme.color.ltblue500};
    `}

    ${props => props.skipped && `
      color: ${props.theme.color.grey100};
      background-color: ${props.theme.color.grey500};
    `}

    ${props => props.hook && `
      color: ${props.theme.color.black38};
      padding: 0;

      ${props.fail && `
        color: ${props.theme.color.red500};
      `}
    `}
`

const ContextIcon = styled(Icon).attrs(() => ({
  name: 'chat_bubble_outline',
  size: 18
}))`
    position: relative;
    /* stylelint-disable-next-line declaration-no-important */
    line-height: 24px !important;
    color: ${props => props.theme.color.black38};
    margin-right: 8px;
    top: 1px;
`

const DurationIcon = styled(Icon).attrs(() => ({
  name: 'timer',
  size: 18
}))`
    margin-left: 4px;
    /* stylelint-disable-next-line declaration-no-important */
    line-height: 24px !important;
    color: ${props => props.theme.color.black38};

    ${props => props.speed === 'slow' && `
      color: ${props.theme.color.red300};
    `}

    ${props => props.speed === 'medium' && `
      color: ${props.theme.color.yellow700};
    `}
`

const BodyWrap = styled.div`
    border-left: 3px solid transparent;
    transition: border-color 0.2s ease-out;

    ${props => props.expanded && `
      display: block;
      padding-bottom: 10px;

      ${props.pass && `
        border-left-color: ${props.theme.color.green500};
      `}
      ${props.fail && `
        border-left-color: ${props.theme.color.red500};
      `}
    `}
`

const Body = styled.div`
    display: none;
    background-color: ${props => props.theme.color.nearwhite}; 
    border: 1px solid ${props => props.theme.color.grey50};
    border-radius: 4px;

    ${props => props.expanded && `
      display: block;
      margin: 0 16px 0 13px;
    `}
`

const Test = props => {
  const [expanded, toggleExpanded] = useToggle(false);

  const toggleExpandedState = () => {
    const { test, enableCode } = props;
    if (
      (enableCode && test.pass) ||
      !!test.context ||
      test.fail ||
      test.isHook
    ) {
      toggleExpanded();
    }
  }

  const { test, enableCode } = props;
  const {
    uuid,
    title,
    speed,
    duration,
    pass,
    fail,
    pending,
    skipped,
    isHook,
    err,
    code,
    context,
  } = test;
  const isInactive = pending || skipped || (pass && !enableCode && !context);

  return (
    <TestCard id={uuid} expanded={expanded} passed={pass} failed={fail}>
      <header>
        <HeaderButton
          expanded={expanded}
          aria-expanded={expanded}
          type="button"
          onClick={toggleExpandedState}
          disabled={isInactive}
          pass={pass}
          fail={fail}>
          <TestIcon {...{ pass, fail, pending, skipped }} hook={isHook} before={title.match(/^"before/)} />
          <Title hook={isHook} expanded={expanded} title={title}>
            {title}
          </Title>
          <Info>
            {!!context && (
              <ContextIcon />
            )}
            {!isHook && (
              <TestDuration expanded={expanded} pending={pending} timer={duration} />
            )}
            {!isHook && (
              <DurationIcon speed={speed} />
            )}
          </Info>
          {!!err.message && <ErrorMessage>{err.message}</ErrorMessage>}
        </HeaderButton>
      </header>
      {/* TODO: expanded in BodyWrap and Body redundant */}
      {expanded && (
        <BodyWrap expanded={expanded} pass={pass} fail={fail}>
          <Body expanded={expanded}>
            {
              <CodeSnippet
                code={err.estack}
                highlight={false}
                label="Stack Trace"
              />
            }
            {
              <CodeSnippet
                code={err.diff}
                lang="diff"
                label="Diff"
              />
            }
            {enableCode && (
              <CodeSnippet
                code={code}
                label="Test Code"
              />
            )}
            {!!context && <TestContext context={context} />}
          </Body>
        </BodyWrap>
      )}
    </TestCard>
  );
}

Test.propTypes = {
  test: PropTypes.object,
  enableCode: PropTypes.bool,
};

Test.defaultProps = {
  enableCode: true,
}

Test.displayName = 'Test';

export default Test;

