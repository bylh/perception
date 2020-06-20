import React, {useState, useEffect} from 'react'
import axios from '../../service/axios'
import './news.scss'
// antd
import {Card, Tag, List, Avatar, Spin} from 'antd'

// const {Meta} = Card;
const gridStyle = {
    margin: '5px',
    // width: '100px',
    // textAlign: 'center' as const,
};

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

    // onClick不能直接绑定到自定义事件上面，要绑定到真实的dom
    // const tags = newsTags.map((item, index) => <span key={index} onClick={() => fetchNews(item)}><NewsTag tag={item}/></span>)
    const tags =  <Card title="Daily News">{newsTags.map((item, index) =>
        <Tag onClick={() => fetchNews(item)} key={index} color="volcano" style={gridStyle}>{item.name}</Tag>
    )}</Card>
    // {/*<NewsTag onClick={() => fetchNews(item)} key={index} tag={item}/>*/}
    const newsList = (<List
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
                    avatar={<Avatar style={{display: item.avatar_img_url ? 'inline-block' : 'none'}} src={item.avatar_img_url} />}
                    title={<a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>}
                    description={item.desc}
                />
            </List.Item>
        )}
    />)
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
    return <div>
        {tags}
        <Spin size="large" spinning={loading}>
            <div>{newsList}</div>
        </Spin>
    </div>

}
