import React, { useEffect } from 'react';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components'

import { Suite } from 'components/suite';
import { useStore } from '../store'
import { Container } from '../../styles/base';
import { media } from '../../styles/theme'

const Details = styled(Container)`
    padding-top: calc(${props => props.theme.navbar.default.height} + 24px);

    ${media.greaterThan("small")`
      padding-top: calc(${props => props.theme.navbar.short.height} + 24px);
    `}
`

const ReportBody = observer(() => {
  const store = useStore();

  useEffect(() => {
    const updateSuites = timeout => store.updateFilteredSuites(timeout);

    updateSuites();

    const disposer = reaction(
      () => {
        const {
          showPassed,
          showFailed,
          showPending,
          showSkipped,
          showHooks,
        } = store;
        return {
          showPassed,
          showFailed,
          showPending,
          showSkipped,
          showHooks,
        };
      },
      () => updateSuites(0),
      { delay: 300 }
    );

    return disposer;
  }, [store]);


  const {
    enableCode,
    enableChart,
    filteredSuites: suites,
  } = store;

  return (
    <Details>
      {suites.map(suite => (
        <Suite
          key={suite.uuid}
          suite={suite}
          enableChart={enableChart}
          enableCode={enableCode}
        />
      ))}
    </Details>
  )
})

export default ReportBody;
