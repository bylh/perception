import React, {useState, useEffect} from 'react'
import {Table, Space, Divider} from 'antd';
// import ReactJson from 'react-json-view'
import axios from '../../../service/axios'
import './tickers.scss'
import {DoubleRightOutlined, ArrowUpOutlined} from '@ant-design/icons';

interface Account {
    exName: string,
    tickers: []
}

const tableProps = [
    // {
    //     title: '日期',
    //     dataIndex: 'date',
    //     key: 'date',
    //     ellipsis: true,
    //     render: time => <div>
    //         <div>{new Date(time).toLocaleDateString()}</div>
    //         {new Date(time).toLocaleTimeString()}</div>,
    // },
    {
        title: '币种',
        dataIndex: 'omitempty',
        key: 'omitempty',
    },
    {
        title: '卖价',
        dataIndex: 'sell',
        key: 'sell',
    },
    {
        title: '买价',
        dataIndex: 'buy',
        key: 'buy',
    },
    {
        title: '当前',
        dataIndex: 'last',
        key: 'last',
    },

];

export default function () {
    const [bnAccount, setBnAccount] = useState<Account>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.request({
                    method: 'get',
                    url: '/api/v1/trade/getAllTickers',
                    params: {
                        exName: 'BINANCE'
                    }
                })
                setBnAccount({
                    exName: 'BINANCE',
                    tickers: data.data.data
                } as Account)
            } finally {
            }
        }
        fetchData()
    }, [])
    // const tickers = bnAccount && <ReactJson src={bnAccount.tickers}/>
    let tableData = [];
    if (bnAccount && Array.isArray(bnAccount.tickers)) {
        tableData = bnAccount.tickers
    }
    console.log('tableData', tableData)

    const expandRow = (recrod) => {
        return <div className="expand-row">
            <Space>
                <div>
                    {/*<div>{new Date(recrod.date).toLocaleDateString()}</div>*/}
                    {/*{new Date(recrod.date).toLocaleTimeString()}*/}
                    {new Date(recrod.date).toLocaleString()}
                </div>
                <div>高：{recrod.high}</div>
                <div>低：{recrod.low}</div>

            </Space>
        </div>
    }

    const tickers = bnAccount &&
        <Table
            rowKey={record => record.omitempty}
            columns={tableProps}
            pagination={{
                hideOnSinglePage: true,
                pageSize: 50,
            }}
            expandable={{
                defaultExpandAllRows: false,
                expandRowByClick: true,
                expandedRowRender: record => expandRow(record),
                rowExpandable: record => true,
            }}
            dataSource={tableData}/>
    return (
        <div className="account">
            <div id="tickers">
                <Divider plain dashed>{'市场'}<a href="#openorder"><ArrowUpOutlined /></a></Divider>
            </div>
            {tickers}
        </div>
    );
};
