import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  Select,
  Card,
  Row,
  Col,
  Divider,
  Icon,
  Spin,
  Skeleton,
  Tabs,
  Table,
} from 'antd';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';
import { GET_MUNICIPALITIES, GET_MAIN_PAGE } from './constants';
import TunisiaMap from '../TunisaMap/TunisiaMap';
import { makeSelectMetadata, makeSelectBuget } from '../App/selectors';

const { Option } = Select;
const { TabPane } = Tabs;
const budgetColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    width: '12%',
  },
];
/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    props.loadMainPage();
    this.state = {
      cities: [], // props.meta.municipalityData[this.props.metadata.govData[0]],
      secondCity: undefined, // props.meta.municipalityData[this.props.metadata.govData[0]][0],
    };
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
    if (value) this.props.laodMunicipality(this.state.selected, value);
  };

  render() {
    // const { cities } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    console.log(this.props.budgetOfYear);
    return (
      <Fragment>
        {!this.props.metadata &&
          this.props.metadata.govData.length === 0 && (
            <Spin indicator={antIcon} />
          )}
        <br />
        <Card />
        <br />
        <Skeleton active loading={this.props.metadata.govData.length === 0}>
          <Row type="flex" gutter={32}>
            <Col span={19}>
              <Card>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Tab 1" key="1">
                    <Table
                      dataSource={this.props.budgetOfYear}
                      columns={budgetColumns}
                    />
                  </TabPane>
                  <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                  </TabPane>
                  <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                  </TabPane>
                </Tabs>
                ,
              </Card>
            </Col>
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
        </Skeleton>
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
  budgetOfYear: makeSelectBuget(2017),
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
