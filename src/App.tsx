import React, {createContext, useEffect, useState} from 'react'
import './App.scss'
import {Layout, Drawer, Button} from 'antd'
// import Home from './views/home/home'
// import HookGame from './views/hook-game/hook-game';
// import DraggableList from './views/draggable-list/draggable-list';
import News from './views/news/news';
import Login from './views/login/login'
import Account from './views/account/account'


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

const AuthContext = createContext(null);
function App() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    // const [sessionId, setSessionId] = useState<String>()
    const [tabName, setTabName] = useState<String>('news')

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            setIsLogin(true)
            // setSessionId(token)
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
        window.location.reload()
    }
     return (
        <div className="App">
            <Drawer
                title="功能"
                placement="top"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Button type="text" onClick={() => changeTab('news')} block>
                    News
                </Button>
                <Button type="text" onClick={() => changeTab('account')} block>
                    Account
                </Button>
                <Button type="text" onClick={() => changeTab('tickers')} block>
                    Tickers
                </Button>
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
                        {isLogin &&
                            <>
                            {tabName === "news" && <News/>}
                            {tabName === 'account' && <Account/>}
                            </>
                        }
                        {!isLogin &&
                            <div>
                                <AuthContext.Provider value={setIsLogin}>
                                    <Login/>
                                </AuthContext.Provider>
                            </div>
                        }
                        {/*<DraggableList list={list}/>*/}
                        {/*{*/}
                        {/*  this.state.tabName === 'hook-game' && <HookGame/>*/}
                        {/*}*/}
                        {/*{*/}
                        {/*  this.state.tabName === 'chess' && <Home name={'井字棋'}/>*/}
                        {/*}*/}
                    </Content>
                </Layout>
                {/*<Footer className="footer">关于：测试阶段</Footer>*/}
            </Layout>
        </div>
    )
}
export {
    AuthContext
}
export default App
