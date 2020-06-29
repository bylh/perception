import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
} from "react-router-dom"
import './App.scss'
import {Layout, Drawer, Button, Input} from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import News from './views/news/news';
import Login from './views/login/login'
import Account from './views/account/account'
import Demo from './views/demo/demo';
import MySearch from './views/search/search'
import MyCarousel from './views/carousel/carousel'

const {Header, Content} = Layout
const { Search } = Input
const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
)

function Container() {
    const [visible, setVisible] = useState(false)
    const history = useHistory()
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
        } else {
        }
    }, [])
    const showDrawer = () => {
        setVisible(true)
    };
    const onClose = () => {
        setVisible(false)
    };
    const changeTab = ({name, path}) => {
        history.push(path)
        setVisible(false)
    }
    const logout = () => {
        localStorage.removeItem('token')
        history.push('/login')
        setVisible(false);
        window.location.reload()
    }
    return <div className="App">
        <Drawer
            title="功能"
            placement="top"
            closable={false}
            onClose={() => onClose()}
            visible={visible}
        >
            <nav>
                <Button block type="primary"
                        onClick={() => changeTab({name: 'news', path: '/'})}>News</Button>
                <Button block type="primary"
                        onClick={() => changeTab({name: 'account', path: '/account'})}>Account</Button>
                <Button block type="primary"
                        onClick={() => changeTab({name: 'demo', path: '/demo'})}>Demo</Button>
                <Button block type="primary"
                        onClick={() => changeTab({name: 'login', path: '/login'})}>Login</Button>
                <Button type="primary" onClick={() => logout()} block>
                    logout
                </Button>
            </nav>
        </Drawer>

        <Layout className="container">
            <Header className="header">
                <Button type="text" onClick={() => showDrawer()}>
                    News
                </Button>
                <Search
                    placeholder="input search text"
                    onSearch={value => console.log(value)}
                    loading={false}
                    suffix={suffix}
                    style={{ width: '70%', marginLeft: '10px', maxWidth: '400px'}}
                />
            </Header>
            <Layout className="content">
                <Content className="main">
                    <div>
                        <MySearch/>
                        <MyCarousel/>
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/account">
                                <Account/>
                            </Route>
                            <Route path="/demo">
                                <Demo/>
                            </Route>
                            <Route path="/">
                                <News/>
                            </Route>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
}

function App() {
    return (
        <Router>
            <Container/>
        </Router>
    )
}

export default App
