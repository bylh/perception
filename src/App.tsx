import React, { Component } from 'react'
import './App.scss'
import { Layout } from 'antd'
import Home from './views/home/home'
import HookGame from './views/hook-game/hook-game';
import DraggableList from './views/draggable-list/draggable-list';
interface AppState {
  tabName: String,
}
const { Header, Content, Footer, Sider } = Layout
const list = [{
  src: 'https://images.unsplash.com/photo-1590355271375-2a33fa90634a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
  title: 'mac'
}, {
  src: 'https://images.unsplash.com/photo-1591087307816-b9fa08b5473c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
  title: 'win'
}, {
  src: 'https://images.unsplash.com/photo-1590057984466-44fd56a0d3b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
  title: 'linux'
}]
class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      tabName: "chess",
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
              <DraggableList list={list}/>
              {
                this.state.tabName === 'hook-game' && <HookGame/>
              }
              {
                this.state.tabName === 'chess' && <Home name={'井字棋'}/>
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
