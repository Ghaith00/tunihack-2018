import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Card, Row, Col, Divider } from 'antd';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';
import { GET_MUNICIPALITIES, GET_MAIN_PAGE } from './constants';
import TunisiaMap from '../TunisaMap/TunisiaMap';
import { makeSelectMetadata } from '../App/selectors';

const { Option } = Select;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    props.loadMainPage();
    this.state = {
      cities: [], // props.meta.municipalityData[this.props.metadata.govData[0]],
      secondCity: undefined, // props.meta.municipalityData[this.props.metadata.govData[0]][0],
    };
    // props.laodMunicipality(1, 1);
  }

  handleGovSelectionFromMap = value => {
    console.log(value);
    this.handleGovChange(value);
  };

  handleGovChange = value => {
    this.setState({
      selected: value,
      cities: this.props.metadata.municipalityData[value],
      secondCity: undefined, // this.props.metadata.municipalityData[value][0],
    });
  };

  handleMunChange = value => {
    this.setState({
      secondCity: value,
    });
  };

  render() {
    // const { cities } = this.state;
    return (
      <Fragment>
        <Card />
        <br />
        <Row type="flex" gutter={32}>
          <Col span={19} />
          <Col span={5}>
            <Card loading={!this.props.metadata}>
              <span>
                Gouvernerat:{' '}
                <Select
                  className="big-select"
                  defaultValue={this.props.metadata.govData[0]}
                  value={this.state.selected}
                  style={{ width: 120 }}
                  onChange={this.handleGovChange}
                >
                  {this.props.metadata.govData.map(province => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
              </span>
              <Divider />
              <span>
                Municipalité:{' '}
                <Select
                  style={{ width: 120 }}
                  value={this.state.secondCity}
                  onChange={this.handleMunChange}
                >
                  {this.state.cities.map(city => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
              </span>
              <Divider type="horizontal">
                <h2>أو</h2>
              </Divider>

              <TunisiaMap
                selected={this.state.selected}
                handleSelection={this.handleGovSelectionFromMap}
              />
            </Card>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    laodMunicipality: (gov, mun) => {
      dispatch({ type: GET_MUNICIPALITIES, gov, mun });
    },
    loadMainPage: () => {
      dispatch({ type: GET_MAIN_PAGE });
    },
  };
}

const mapStateToProps = createStructuredSelector({
  metadata: makeSelectMetadata(),
});

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
