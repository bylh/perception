import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    withRouter
} from "react-router-dom"
import './App.scss'
import {Layout, Drawer, Button} from 'antd'
// import Home from './views/home/home'
// import HookGame from './views/hook-game/hook-game';
// import DraggableList from './views/draggable-list/draggable-list';
import News from './views/news/news';
import Login from './views/login/login'
import Account from './views/account/account'
import Demo from './views/demo/demo';


const {Header, Content} = Layout

// const list = [{
//     src: 'https://images.unsplash.com/photo-1590355271375-2a33fa90634a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
//     title: 'mac'
// }, {
//     src: 'https://images.unsplash.com/photo-1591087307816-b9fa08b5473c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
//     title: 'win'
// }, {
//     src: 'https://images.unsplash.com/photo-1590057984466-44fd56a0d3b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk2MjE2fQ',
//     title: 'linux'
// }]


function App() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    // const [sessionId, setSessionId] = useState<String>()
    const [tabName, setTabName] = useState<String>('news')
    const history = useHistory()
    console.log('his1', history);
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setIsLogin(true)
            // setSessionId(token)
        } else {
            console.log('his2', history);
            // TODO 不起作用
            history.push('/login')
        }
    }, [])
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const changeTab = (name) => {
        setTabName(name)
        setVisible(false)
    }
    const logout = () => {
        localStorage.removeItem('token')
        history.push('/login')
        // window.location.reload()
    }
    return (
        <Router>
            <div className="App">
                <Drawer
                    title="功能"
                    placement="top"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">News</Link>
                            </li>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                            <li>
                                <Link to="/demo">Demo</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
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
                    <Button type="text" onClick={() => logout()} block>
                        logout
                    </Button>

                </Drawer>

                <Layout className="container">
                    <Header className="header">
                        <Button type="text" onClick={showDrawer}>
                            News
                        </Button>
                    </Header>
                    <Layout className="content">
                        {/*<Sider className="sider">导航</Sider>*/}
                        <Content className="main">

                            {/*{isLogin &&*/}
                            {/*<>*/}
                            {/*    {tabName === "news" && <News/>}*/}
                            {/*    {tabName === 'account' && <Account/>}*/}
                            {/*    {tabName === 'demo' && <Demo/>}*/}
                            {/*</>*/}
                            {/*}*/}
                            {/*{!isLogin &&*/}
                            {/*<div>*/}
                            {/*    <AuthContext.Provider value={setIsLogin}>*/}
                            {/*        <Login/>*/}
                            {/*    </AuthContext.Provider>*/}
                            {/*</div>*/}
                            {/*}*/}
                            {/*<DraggableList list={list}/>*/}
                            {/*{*/}
                            {/*  this.state.tabName === 'hook-game' && <HookGame/>*/}
                            {/*}*/}
                            {/*{*/}
                            {/*  this.state.tabName === 'chess' && <Home name={'井字棋'}/>*/}
                            {/*}*/}

                            <div>
                                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
        </Router>
    )
}
export default withRouter(App)
