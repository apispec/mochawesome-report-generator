import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { NavMenuItem } from 'components/nav-menu';
import { ListUnstyled } from '../../styles/base';


const SubList = styled(ListUnstyled)`
    padding-left: 24px;
    margin: 0 0 2px 0;
`

const NavMenuList = React.memo(props => {
  const {
    suites,
    showPassed,
    showFailed,
    showPending,
    showSkipped,
  } = props;
  const navItemProps = { showPassed, showFailed, showPending, showSkipped };

  return (
    !!suites && (
      <div>
        {suites.map(subSuite => (
          <SubList key={subSuite.uuid}>
            <NavMenuItem suite={subSuite} {...navItemProps} />
          </SubList>
        ))}
      </div>
    )
  );
})

NavMenuList.propTypes = {
  suites: PropTypes.array,
  showPassed: PropTypes.bool,
  showFailed: PropTypes.bool,
  showPending: PropTypes.bool,
  showSkipped: PropTypes.bool,
};

NavMenuList.displayName = 'NavMenuList';

export default NavMenuList;
