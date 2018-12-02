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
import { Chart, Tooltip, Axis, Bar, Legend } from 'viser-react';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import saga from './saga';
import {
  GET_MUNICIPALITIES,
  GET_MAIN_PAGE,
  CHANGE_BUDGET_YEAR,
} from './constants';
import TunisiaMap from '../TunisaMap/TunisiaMap';
import {
  makeSelectMetadata,
  makeSelectBuget,
  makeSelectBudgetYears,
  makeSelectBudgets,
  makeSelectProjects,
} from '../App/selectors';

const { Option } = Select;
const { TabPane } = Tabs;
const projectsColumns = [
  {
    title: 'المشروع',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'الوصف',
    dataIndex: 'description',
    key: 'description',
    width: '12%',
  },
  {
    title: 'النوع',
    dataIndex: 'type',
    key: 'type',
    width: '12%',
  },
  {
    title: 'المجال',
    dataIndex: 'field',
    key: 'field',
    width: '12%',
  },
  {
    title: 'التكلفة المبرمجة',
    dataIndex: 'planned cost',
    key: 'planned cost',
    width: '12%',
  },
  {
    title: 'التكلفة المبرمجة',
    dataIndex: 'cost',
    key: 'cost',
    width: '12%',
  },
];
const budgetColumns = [
  {
    title: 'العنوان',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'المجموع',
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
    this.props.changeBudgetYear(undefined);
  };

  handleMunChange = value => {
    this.setState({
      secondCity: value,
    });
    if (value) this.props.laodMunicipality(this.state.selected, value);
    this.props.changeBudgetYear(undefined);
  };

  render() {
    // const { cities } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    console.log(this.props.projects);
    // let balance;
    // try {
    //   balance =
    //     Number(this.props.budgetOfYear[1].total) -
    //     Number(this.props.budgetOfYear[0].total);
    //   if (balance < 0) {
    //     balance = `- ${balance}`;
    //   } else {
    //     balance = `+ ${balance}`;
    //   }
    // } catch (e) {
    //   balance = '0';
    // }
    // const data = [{ year: 2121, sales: 32 }];
    const data = this.props.budgets
      ? this.props.budgets.map(item => {
          const obj = {};
          obj.year = Object.keys(item)[0];
          obj.out = Number(item[obj.year][0].total);
          obj.in = Number(item[obj.year][1].total);
          return obj;
        })
      : [];
    console.log(data);
    const scale = [
      {
        dataKey: 'in',
        tickInterval: 1000000,
      },
    ];

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
                  <TabPane tab="الميزانية" key="1">
                    <h2 style={{ textAlign: 'center' }}>المداخيل </h2>
                    <Chart forceFit height={400} data={data} scale={scale}>
                      <Tooltip />
                      <Axis />
                      <Bar position="year*in" />
                    </Chart>
                    <Divider />{' '}
                    <h2 style={{ textAlign: 'center' }}>
                      جدول النفقات و المداخيل المفصل{' '}
                    </h2>
                    <Row type="flex" gutter={16} align="middle" justify="end">
                      <Col>
                        <Select
                          className="big-select"
                          style={{ width: 120 }}
                          onChange={this.props.changeBudgetYear}
                        >
                          {this.props.budgetYears.map(year => (
                            <Option key={year}>{year}</Option>
                          ))}
                        </Select>
                        <span style={{ fontSize: '20px' }}>: إختر السنة</span>
                      </Col>
                    </Row>
                    <Divider />
                    <Table
                      dataSource={this.props.budgetOfYear}
                      columns={budgetColumns}
                    />
                  </TabPane>
                  <TabPane tab="المشاريع" key="2">
                    <h2 style={{ textAlign: 'center' }}>جدول مفصل </h2>
                    <Divider />
                    <Table
                      dataSource={this.props.projects }
                      columns={projectsColumns}
                    />
                  </TabPane>
                  <TabPane tab="ممتلكات" key="3">
                    ممتلكات
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
    changeBudgetYear: year => {
      dispatch({ type: CHANGE_BUDGET_YEAR, payload: year });
    },
  };
}

const mapStateToProps = createStructuredSelector({
  metadata: makeSelectMetadata(),
  budgetOfYear: makeSelectBuget(),
  budgetYears: makeSelectBudgetYears(),
  budgets: makeSelectBudgets(),
  projects: makeSelectProjects(),
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
