import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        container
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) { // eslint-disable-line
  return {};
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({
  key: 'global',
  saga,
  mode: DAEMON,
});
export default compose(
  withSaga,
  withConnect,
)(HomePage);
