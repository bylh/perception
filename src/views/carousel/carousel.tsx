import React, {useState, useEffect} from 'react';
import axios from '../../service/axios'
import { Carousel} from 'antd'
import './carousel.scss'
interface Soul {
    title: string,
    hits: string
}

export default function Search() {
    const [souls, setSouls] = useState<Array<Soul>>([])
    useEffect(() => {
        
        const fetchData = async () => {
            const res = await axios.request({
                url: '/souls',
                params: {
                    offset: -1,
                    limit: 4
                }
            })
            if (res.data.code !== 200) {
                return;
            }
            setSouls(res.data.data || [])
        }
        fetchData().then().catch(err => {
            console.error('获取souls失败', err)
        })
    }, [])
    return (
        <div className="carousel">
            <Carousel effect="scrollx" autoplay>
                {
                    souls.map((item, index) => <div key={index}><div className="soul-item">{item.title}</div></div>)
                }
            </Carousel>
        </div>
    );
}