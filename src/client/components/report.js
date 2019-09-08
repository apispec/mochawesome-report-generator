import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components'
import { Footer, Loader, Navbar, ReportBody } from 'components';
import { NavMenu } from 'components/nav-menu';
import GlobalStyles from '../styles/app.global'
import theme from '../styles/theme'
import { StoreProvider } from './store'

const MochawesomeReport = observer(props => {
  const { openSideNav, reportTitle, stats, VERSION } = props.store;

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={props.store}>
        <main>
          <GlobalStyles />
          <Navbar
            onMenuClick={openSideNav}
            reportTitle={reportTitle}
            stats={stats}
          />
          <ReportBody />
          <Loader />
          <Footer version={VERSION} />
          <NavMenu />
        </main>
      </StoreProvider>
    </ThemeProvider>
  );
});

MochawesomeReport.propTypes = {
  store: PropTypes.object,
};

MochawesomeReport.displayName = 'MochawesomeReport';

export default MochawesomeReport;
