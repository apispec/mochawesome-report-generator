/* eslint-disable no-new */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Chartist from 'chartist';

import { media } from '../../styles/theme'

const Wrap = styled.div`
    display: none;
    position: absolute;
    top: 12px;
    right: 36px;
    width: 50px;
    height: 50px;

    ${media.greaterThan("small")`
      display: block;
    `}

    ${props => props.noTests && `
      min-height: 66px;
    `}

    & .chart-slice {
      stroke: #fff;
      stroke-width: 2px;
    }

    & .ct-series-a .chart-slice {
      fill: ${props => props.theme.color.green500};
    }

    & .ct-series-b .chart-slice {
      fill: ${props => props.theme.color.red500};
    }

    & .ct-series-c .chart-slice {
      fill: ${props => props.theme.color.ltblue500};
    }

    & .ct-series-d .chart-slice {
      fill: ${props => props.theme.color.black38};
    }
`

const SuiteChart = React.memo(props => {
  const node = useRef(null);

  const {
    totalPasses,
    totalFailures,
    totalPending,
    totalSkipped,
  } = props;

  useEffect(() => {
    new Chartist.Pie(
      node.current,
      {
        series: [totalPasses, totalFailures, totalPending, totalSkipped],
      },
      {
        classNames: {
          sliceDonutSolid: 'chart-slice',
        },
        chartPadding: 0,
        donut: true,
        donutSolid: true,
        donutWidth: 9,
        ignoreEmptyValues: true,
        showLabel: false,
        startAngle: 180,
      }
    );
  }, [totalPasses, totalFailures, totalPending, totalSkipped]);

  return (
    <Wrap ref={node} />
  );
})

SuiteChart.propTypes = {
  totalPasses: PropTypes.number,
  totalFailures: PropTypes.number,
  totalPending: PropTypes.number,
  totalSkipped: PropTypes.number,
};

SuiteChart.displayName = 'SuiteChart';

export default SuiteChart;
