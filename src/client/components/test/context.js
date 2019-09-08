import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import isString from 'lodash/isString';

import { CodeSnippet } from 'components/test';
import { textOverflow } from '../../styles/base';

const videoRegEx = /(?:mp4|webm)$/i;
const imgRegEx = /(?:png|jpe?g|gif)$/i;
const protocolRegEx = /^(?:(?:https?|ftp):\/\/)/i;
const urlRegEx = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/; // eslint-disable-line
const base64ImgRegEx = /^data:image\/([a-zA-Z0-9-_.])+;base64,([^"]*)$/i;

const isVideo = str => {
  if (!isString(str)) {
    return false;
  }

  const hashIndex = str.indexOf('#');
  return videoRegEx.test(hashIndex > 0 ? str.slice(0, hashIndex) : str);
}

const contextPropTypes = {
  ctx: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

const contextTitlePropTypes = {
  ...contextPropTypes,
  title: PropTypes.string,
};


const Video = styled.video`
    display: block;
    max-width: 100%;
    height: auto;
`

const VideoLink = styled.a`
    display: inline-block;
    font-size: 11px;
    padding: 0 1em 1em 1em;
`

const ContextVideo = ({ ctx, title }) => {
  const isUrl = urlRegEx.test(ctx);
  const hasProtocol = protocolRegEx.test(ctx);
  const linkUrl = isUrl && !hasProtocol ? `http://${ctx}` : ctx;

  return (
    <Video controls src={linkUrl}>
      <track kind="captions" />
      {title}
      <VideoLink
        href={linkUrl}
        rel="noopener noreferrer"
        target="_blank">
        {linkUrl}
      </VideoLink>
    </Video>
  );
}
ContextVideo.propTypes = contextTitlePropTypes;

const Image = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
`

const ImageLink = styled.a`
    display: inline-block;
    font-size: 11px;
    padding: 0 1em 1em 1em;
`

const ContextImage = ({ ctx, title }) => {
  const isUrl = urlRegEx.test(ctx);
  const hasProtocol = protocolRegEx.test(ctx);
  const linkUrl = isUrl && !hasProtocol ? `http://${ctx}` : ctx;

  return (
    <ImageLink
      href={linkUrl}
      rel="noopener noreferrer"
      target="_blank">
      <Image src={linkUrl} alt={title} />
    </ImageLink>
  );
}
ContextImage.propTypes = contextTitlePropTypes;

const ContextImageBase64 = ({ ctx, title }) => {
  return (
    <Image src={ctx} alt={title} />
  );
}
ContextImageBase64.propTypes = contextTitlePropTypes;

const TextLink = styled.a`
    display: inline-block;
    padding: 0 1em 1em 1em;
    font-family: ${props => props.theme.font.mono.family};
    font-size: 11px;
    color: ${props => props.theme.color.ltblue700};

    &:hover {
      color: ${props => props.theme.color.ltblue500};
    }
`

const ContextLink = ({ ctx, title }) => {
  const linkUrl = `${protocolRegEx.test(ctx) ? '' : 'http://'}${ctx}`;

  return (
    <TextLink
      href={linkUrl}
      rel="noopener noreferrer"
      target="_blank"
      alt={title}>
      {ctx}
    </TextLink>
  );
}
ContextLink.propTypes = contextTitlePropTypes;

const ContextString = ({ ctx }) => {
  return (
    <CodeSnippet
      code={ctx}
      highlight={false}
      styles="padding-top: 0;"
    />
  );
}
ContextString.propTypes = contextPropTypes;

const ContextJson = ({ ctx, highlight }) => {
  const code = JSON.stringify(ctx, null, 2);

  return (
    <CodeSnippet
      code={code}
      highlight={highlight}
      styles="padding-top: 0;"
    />
  );
}
ContextJson.propTypes = {
  ...contextPropTypes,
  highlight: PropTypes.bool,
};

const ContextItem = styled.div`
    padding-top: 11px;
`

const ContextItemTitle = styled.h4`
    ${textOverflow}

    font-family: ${props => props.theme.font.medium.family};
    font-size: 13px;
    margin: 0;
    padding: 0 11px 11px 11px;
`

const Context = styled.div`
    background-color: ${props => props.theme.color.white};
    border-top: 1px solid ${props => props.theme.color.grey50};
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`

const ContextTitle = styled.h4`
    ${textOverflow}

    font-family: ${props => props.theme.font.base.family};
    font-size: 13px;
    color: ${props => props.theme.color.black54};
    margin: 0;
    padding: 11px 11px 0 11px;
`

const renderContextContent = (content, title, highlight = false) => {
  // Videos
  if (isVideo(content)) {
    return <ContextVideo ctx={content} title={title} />;
  }

  // Images
  if (imgRegEx.test(content)) {
    return <ContextImage ctx={content} title={title} />;
  }

  // Base64 Images
  if (base64ImgRegEx.test(content)) {
    return <ContextImageBase64 ctx={content} title={title} />;
  }

  // URLs
  if (urlRegEx.test(content)) {
    return <ContextLink ctx={content} title={title} />;
  }

  // Simple string
  if (isString(content)) {
    return <ContextString ctx={content} title={title} />;
  }

  // All other types (primitives, objects, arrays...)
  return <ContextJson ctx={content} title={title} highlight={highlight} />;
};

const renderContext = (ctx, i) => {
  const containerProps = {
    // className: cx('context-item'),
  };
  if (i !== undefined) {
    containerProps.key = i;
  }

  // Context is a simple string
  if (isString(ctx)) {
    return <ContextItem {...containerProps}>{renderContextContent(ctx)}</ContextItem>;
  }

  // Context is an object with title and value
  const { title, value } = ctx;
  return (
    <ContextItem {...containerProps}>
      <ContextItemTitle>{title}:</ContextItemTitle>
      {renderContextContent(value, title, true)}
    </ContextItem>
  );
};

const TestContext = props => {
  const { context } = props;

  // All context comes in stringified initially so we parse it here
  const ctx = JSON.parse(context);
  return (
    <Context>
      <ContextTitle>Additional Test Context</ContextTitle>
      {Array.isArray(ctx)
        ? ctx.map(renderContext)
        : renderContext(ctx)}
    </Context>
  );
}


TestContext.propTypes = {
  context: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]),
};

TestContext.displayName = 'TestContext';

export default TestContext;
