import { css } from 'styled-components';

// TODO: move to styled base types, e.g. Heading
export default props => css`
    /* Headings */
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4,
.h5,
.h6 {
  font-family: ${props.theme.headings.fontFamily};
  font-weight: ${props.theme.headings.fontWeight};
  line-height: ${props.theme.headings.lineHeight};
  color: ${props.theme.headings.color};

  & small,
  & .small {
    font-weight: normal;
    line-height: 1;
    color: ${props.theme.headings.smallColor};
  }
}

h1,
.h1,
h2,
.h2,
h3,
.h3 {
  margin-top: ${props.theme.font.lineHeightComputed};
  margin-bottom: calc(${props.theme.font.lineHeightComputed} / 2);

  & small,
  & .small {
    font-size: 65%;
  }
}

h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: calc(${props.theme.font.lineHeightComputed} / 2);
  margin-bottom: calc(${props.theme.font.lineHeightComputed} / 2);

  & small,
  & .small {
    font-size: 75%;
  }
}

h1,
.h1 {
  font-size: var(--font-size-h1);
}

h2,
.h2 {
  font-size: var(--font-size-h2);
}

h3,
.h3 {
  font-size: ${props.theme.headings.size3};
}

h4,
.h4 {
  font-size: var(--font-size-h4);
}

h5,
.h5 {
  font-size: var(--font-size-h5);
}

h6,
.h6 {
  font-size: ${props.theme.headings.size6};
}

/* Body text */
p {
  margin: 0 0 calc(var(--line-height-computed) / 2);
}

.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
.text-justify {
  text-align: justify;
}
.text-nowrap {
  white-space: nowrap;
}

.text-lowercase {
  text-transform: lowercase;
}
.text-uppercase {
  text-transform: uppercase;
}
.text-capitalize {
  text-transform: capitalize;
}

/* Lists */
ul,
ol {
  margin-top: 0;
  margin-bottom: calc(var(--line-height-computed) / 2);

  ul,
  ol {
    margin-bottom: 0;
  }
}

.list-unstyled {
  padding-left: 0;
  list-style: none;
}

.list-inline {
  padding-left: 0;
  list-style: none;
  margin-left: -5px;

  & > li {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
  }
}

/* Pre and Code */
code {
  font-family: ${props.theme.font.mono.family};
}

`
