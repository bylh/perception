import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    // withRouter
} from "react-router-dom"
import './App.scss'
import {Layout, Drawer, Button} from 'antd'
import News from './views/news/news';
import Login from './views/login/login'
import Account from './views/account/account'
import Demo from './views/demo/demo';

const {Header, Content} = Layout

function Container() {
    console.log('初始化组件');
    const [visible, setVisible] = useState(false)

    const history = useHistory()

    useEffect(() => {
        console.log('useEffect执行')
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
                <ul>
                    <li>
                        <Button type="dashed" block onClick={() => changeTab({name: 'news', path: '/'})}>News</Button>
                        {/*<Link to="/">News</Link>*/}
                    </li>
                    <li>
                        <Button type="dashed" block
                                onClick={() => changeTab({name: 'account', path: '/account'})}>Account</Button>
                        {/*<Link to="/account">Account</Link>*/}
                    </li>
                    <li>
                        <Button type="dashed" block
                                onClick={() => changeTab({name: 'demo', path: '/demo'})}>Demo</Button>
                        {/*<Link to="/demo">Demo</Link>*/}
                    </li>
                    <li>
                        <Button type="dashed" block
                                onClick={() => changeTab({name: 'login', path: '/login'})}>Login</Button>
                        {/*<Link to="/login">Login</Link>*/}
                    </li>
                    <li>
                        <Button type="text" onClick={() => logout()} block>
                            logout
                        </Button>
                    </li>
                </ul>
            </nav>
            {/*<Button type="text" onClick={() => changeTab('news')} block>*/}
            {/*    News*/}
            {/*</Button>*/}
            {/*<Button type="text" onClick={() => changeTab('account')} block>*/}
            {/*    Account*/}
            {/*</Button>*/}
            {/*<Button type="text" onClick={() => changeTab('tickers')} block>*/}
            {/*    Tickers*/}
            {/*</Button>*/}
            {/*<Button type="text" onClick={() => changeTab('demo')} block>*/}
            {/*    Demo*/}
            {/*</Button>*/}

        </Drawer>

        <Layout className="container">
            <Header className="header">
                <Button type="text" onClick={() => showDrawer()}>
                    News
                </Button>
            </Header>
            <Layout className="content">
                {/*<Sider className="sider">导航</Sider>*/}
                <Content className="main">
                    <div>
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
            {/*<Footer className="footer">关于：测试阶段</Footer>*/}
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
