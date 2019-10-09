import React, { Component } from 'react'
import './App.scss'
import { Layout } from 'antd'
import Home from './views/home/home'

const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="container">
          <Header className="header">perceive</Header>
          <Layout className="content">
            <Sider className="sider">导航</Sider>
            <Content className="main">
              <Home name={'井字棋'}></Home>
            </Content>
          </Layout>
          <Footer className="footer">关于：测试阶段</Footer>
        </Layout>
      </div>
    )
  }
}

export default App
