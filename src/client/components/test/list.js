import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Test } from 'components/test';

// TODO: same in suite/list, there is also base/UnstyledList
const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const TestList = ({
  tests,
  beforeHooks,
  afterHooks,
  enableCode,
}) => (
    <List>
      {!!beforeHooks &&
        beforeHooks.map(test => (
          <Test key={test.uuid} test={test} enableCode={enableCode} />
        ))}
      {!!tests &&
        tests.map(test => (
          <Test key={test.uuid} test={test} enableCode={enableCode} />
        ))}
      {!!afterHooks &&
        afterHooks.map(test => (
          <Test key={test.uuid} test={test} enableCode={enableCode} />
        ))}
    </List>
  );

TestList.propTypes = {
  tests: PropTypes.array,
  beforeHooks: PropTypes.array,
  afterHooks: PropTypes.array,
  enableCode: PropTypes.bool,
};

TestList.displayName = 'TestList';

export default TestList;
