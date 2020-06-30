import React, {useState, useEffect} from 'react'
import { DownOutlined } from '@ant-design/icons';
import axios from '../../service/axios'
import './news.scss'
// antd
import {List, Avatar, Spin, Tabs, Radio, BackTop, Tag, Card} from 'antd'
export declare type TabPosition = 'left' | 'right' | 'top' | 'bottom';
const { TabPane } = Tabs;


interface News {
    title: string,
    url: string,
    desc?: string,
    cover_img_url?: string,
    avatar_img_url?: string,
    comment_count?: number,
    view_count?: number
}

interface NewsTag {
    name: string,
    ID?: number
}

interface NewsTagProps {
    tag: NewsTag,
    onClick: () => void
}

function NewsTag(props: NewsTagProps) {
    return (<div className="news-tag" onClick={props.onClick}>
        {props.tag.name}
    </div>)
}

export default function () {
    const [newsTags, setNewsTags] = useState<Array<NewsTag>>([])
    const [news, setNews] = useState<Array<News>>([])
    const [mode, setMode] = useState<TabPosition>('top')
    const [activeKey, setActiveKey] = useState<string>('0')
    const [fold, setFold] = useState<Boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.request({
                    method: 'get',
                    url: '/newsTags'
                })
                setNewsTags(data.data.data)
                fetchNews(data.data.data.find(item => item.name === 'V2EX'))
            } finally {
            }
        }
        fetchData()
    }, [])

    async function fetchNews(item) {
        if (!item) {
            return;
        }
        try {
            setLoading(true)
            let data = await axios.request({
                method: 'get',
                url: '/news',
                params: {
                    tag: item.name
                }
            });
            console.log(data);
            setNews(data.data.data)
        } finally {
            setLoading(false)
        }
    }

    const handleModeChange = e => {
        setMode(e.target.value)
    };
    const handleTabChange = key => {
        setActiveKey(key)
        fetchNews(newsTags[key])
    };
    const changeFold = () => {
        setFold(!fold)
    }
    // onClick不能直接绑定到自定义事件上面，要绑定到真实的dom
    // const tags = newsTags.map((item, index) => <span key={index} onClick={() => fetchNews(item)}><NewsTag tag={item}/></span>)
    const tags = <Card title="Daily News">{newsTags.map((item, index) =>
        <Tag style={{margin: '5px'}} onClick={() => handleTabChange(index)} key={index}
             color="volcano">{item.name}</Tag>
    )}</Card>
    // {/*<NewsTag onClick={() => fetchNews(item)} key={index} tag={item}/>*/}

    const newsList = (
        <List
            itemLayout="horizontal"
            dataSource={news}
            renderItem={item => (
                <List.Item
                    style={{margin: '10px'}}
                    extra={
                        <img
                            width={120}
                            height={90}
                            alt="logo"
                            style={{display: item.cover_img_url ? 'inline-block' : 'none'}}
                            src={item.cover_img_url}
                        />
                    }
                >
                    <List.Item.Meta
                        avatar={<Avatar style={{display: item.avatar_img_url ? 'inline-block' : 'none'}}
                                        src={item.avatar_img_url}/>}
                        title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                        description={item.desc}
                    />
                </List.Item>
            )}
        />)
    const tabs = <div>
        {/*<Radio.Group onChange={handleModeChange} value={mode} style={{marginBottom: 8, display: 'none'}}>*/}
        {/*    <Radio.Button value="top">Horizontal</Radio.Button>*/}
        {/*    <Radio.Button value="left">Vertical</Radio.Button>*/}
        {/*</Radio.Group>*/}
        <Tabs activeKey={activeKey}
              tabBarStyle={{position: 'sticky', top: 0}}
              tabPosition={mode}
              tabBarExtraContent={<DownOutlined style={{display: "none"}} onClick={changeFold}/>}
              onChange={handleTabChange}>
            {newsTags.map((item, i) => (
                <TabPane key={i} tab={item.name}>
                    <div className='tab-content striky-box'>
                        {/*<div>*/}
                        {/*    {!fold && tags}*/}
                        {/*</div>*/}
                        {newsList} 
                    </div>
                    
                </TabPane>
            ))}
        </Tabs>
    </div>
    // const newsArr = news.map((item, index) =>
    //     <Card
    //         style={{margin: '10px'}}
    //         title={item.title}
    //         // extra={<a href={item.url} target="_blank" rel="noopener noreferrer" >More</a>}
    //         // cover={<img alt="example" src={item.url} />}
    //         key={index * 100}>
    //         <a href={item.url} target="_blank" rel="noopener noreferrer" >{item.title}</a>
    //         {/*<Meta title={item.title} description={item.title} />*/}
    //     </Card>
    // )
    return <Spin size="large" spinning={loading}>
        <div className="news" style={{margin: '10px'}}>{tabs}</div>
        <BackTop/>
    </Spin>

}
