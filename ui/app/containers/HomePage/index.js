import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Card, Row, Col } from 'antd';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';
import { GET_MUNICIPALITIES } from './constants';
import TunisiaMap from '../TunisaMap/TunisiaMap';

const { Option } = Select;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
    };
    // props.laodMunicipality(1, 1);
  }

  handleGovChange = value => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  };

  handleMunChange = value => {
    this.setState({
      secondCity: value,
    });
  };

  render() {
    const { cities } = this.state;
    return (
      <Fragment>
        <Card>
          <Select
            className="big-select"
            defaultValue={provinceData[0]}
            style={{ width: 120 }}
            onChange={this.handleGovChange}
          >
            {provinceData.map(province => (
              <Option key={province}>{province}</Option>
            ))}
          </Select>
          <Select
            style={{ width: 120 }}
            value={this.state.secondCity}
            onChange={this.handleMunChange}
          >
            {cities.map(city => (
              <Option key={city}>{city}</Option>
            ))}
          </Select>
        </Card>
        <br />
        <Row type="flex" gutter={32}>
          <Col span={16} />
          <Col span={8}>
            <Card>
              <TunisiaMap />
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
