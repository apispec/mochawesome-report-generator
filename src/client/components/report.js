import React from 'react';
import PropTypes from 'prop-types';
import { Provider, observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components'
import { Footer, Loader, Navbar, ReportBody } from 'components';
import { NavMenu } from 'components/nav-menu';
// import 'styles/app.global.css';
import GlobalStyles from '../styles/app.global'
import theme from '../styles/theme'
import MobxDevTool from './mobxDevtool';

const MochawesomeReport = observer(props => {
  const { openSideNav, reportTitle, stats, devMode, VERSION } = props.store;

  return (
    <ThemeProvider theme={theme}>
      <Provider reportStore={props.store}>
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
          {devMode && <MobxDevTool position={{ bottom: 0, right: 20 }} />}
        </main>
      </Provider>
    </ThemeProvider>
  );
});

MochawesomeReport.propTypes = {
  store: PropTypes.object,
};

MochawesomeReport.displayName = 'MochawesomeReport';

export default MochawesomeReport;
