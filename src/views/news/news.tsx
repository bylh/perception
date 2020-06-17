import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './news.scss'
// antd
import {Card, Tag} from 'antd'

const {Meta} = Card;
const gridStyle = {
    margin: '5px'
    // textAlign: 'center',
};
interface News {
    title: string,
    url: string
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
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.request({
                method: 'get',
                url: 'https://bylh.top:8000/newsTags'
            })
            setNewsTags(data.data.data)
        }
        fetchData()
    }, [])

    async function fetNews(item) {
        console.log(this);
        let data = await axios.request({
            method: 'get',
            url: 'https://bylh.top:8000/news',
            params: {
                tag: item.name
            }
        });
        console.log(data);
        setNews(data.data.data)
    }

    // onClick不能直接绑定到自定义事件上面，要绑定到真实的dom
    // const tags = newsTags.map((item, index) => <span key={index} onClick={() => fetNews(item)}><NewsTag tag={item}/></span>)
    const tags =  <Card title="Daily News">{newsTags.map((item, index) =>
        <Tag onClick={() => fetNews(item)} key={index} color="volcano" style={gridStyle}>{item.name}</Tag>
    )}</Card>
    // {/*<NewsTag onClick={() => fetNews(item)} key={index} tag={item}/>*/}
    const newsArr = news.map((item, index) =>
        <Card
            style={{margin: '10px'}}
            title={item.title}
            extra={<a href={item.url} target="_blank">More</a>}
            // cover={<img alt="example" src={item.url} />}
            key={index * 100}>
            <a href={item.url} target="_blank">{item.title}</a>
            {/*<Meta title={item.title} description={item.title} />*/}
        </Card>
    )
    return <div>{tags}
        <div>{newsArr}</div>
    </div>

}
