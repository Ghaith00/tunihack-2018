/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import GlobalStyle from '../../global-styles';
const { Header, Footer, Content } = Layout;

export default class App extends React.Component {
  state = {
    windowHeight: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowHeight: window.innerHeight });
  };

  render() {
    const minHeight = this.state.windowHeight - 172;

    return (
      <Layout>
        <Header>Header</Header>
        <Content style={{ padding: '50px 50px', minHeight }}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
