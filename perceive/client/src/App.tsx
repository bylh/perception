import React, { Component } from 'react'
import './App.scss'
import { Layout } from 'antd'

const { Header, Content, Footer, Sider } = Layout

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout className="bylh">
          <Header className="header">Header</Header>
          <Layout className="content">
            <Sider className="sider">Sider</Sider>
            <Content className="main">Content</Content>
          </Layout>
          <Footer className="footer">Footer</Footer>
        </Layout>
      </div>
    )
  }
}

export default App
