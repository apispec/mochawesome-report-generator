import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import Suite from './suite';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const SuiteList = ({ suites, enableChart, enableCode, main }) => (
  <List>
    {!!suites &&
      suites.map(suite => (
        <Suite
          key={suite.uuid}
          suite={suite}
          enableChart={enableChart}
          enableCode={enableCode}
          isMain={main}
        />
      ))}
  </List>
);

SuiteList.propTypes = {
  suites: PropTypes.array,
  enableChart: PropTypes.bool,
  enableCode: PropTypes.bool,
  main: PropTypes.bool,
};

SuiteList.displayName = 'SuiteList';

export default SuiteList;
