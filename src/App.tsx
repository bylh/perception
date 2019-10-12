import React, { Component } from 'react'
import './App.scss'
import { Layout } from 'antd'
import Home from './views/home/home'
import HookGame from './views/hook-game/hook-game';
interface AppState {
  tabName: String
}
const { Header, Content, Footer, Sider } = Layout

class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      tabName: "hook-game"
    }
  }
  changeTab(name: String) {

    this.setState({
      tabName: this.state.tabName === 'hook-game' ? 'chess' : 'hook-game'
    });
    console.log(this.state.tabName);
  }
  render() {
    return (
      <div className="App">
        <Layout className="container">
          <Header className="header">
            <span onClick={() => this.changeTab('hook-game')}>perceive</span>
            </Header>
          <Layout className="content">
            <Sider className="sider">导航</Sider>
            <Content className="main">
              {
                this.state.tabName === 'hook-game' && <HookGame></HookGame>
              }
              {
                this.state.tabName === 'chess' && <Home name={'井字棋'}></Home>
              }
            </Content>
          </Layout>
          <Footer className="footer">关于：测试阶段</Footer>
        </Layout>
      </div>
    )
  }
}

export default App
