import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';
import { GET_MUNICIPALITIES } from './constants';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  componentWillMount() {
    this.props.laodMunicipality(2, 1); // eslint-disable-line
  }

  render() {
    return (
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        container
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    laodMunicipality: (gov, mun) => {
      dispatch({ type: GET_MUNICIPALITIES, gov, mun });
    },
  };
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
