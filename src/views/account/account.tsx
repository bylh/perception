import React, {useState, useEffect} from 'react'
import {Table, Tag, Space} from 'antd';
// import ReactJson from 'react-json-view'
import axios from '../../service/axios'
import './account.scss'
import { DoubleRightOutlined } from '@ant-design/icons';

interface Account {
    exName: string,
    openOrders: []
}

const tableProps = [
    {
        title: '日期',
        dataIndex: 'OrderTime',
        key: 'OrderTime',
        ellipsis: true,
        render: time => <div>
            <div>{new Date(time).toLocaleDateString()}</div>
            {new Date(time).toLocaleTimeString()}</div>,
    },
    {
        title: '挂单价',
        dataIndex: 'Price',
        key: 'Price',
    },
    {
        title: '数量',
        dataIndex: 'Amount',
        key: 'Amount',
    },
    {
        title: '成交',
        dataIndex: 'DealAmount',
        key: 'DealAmount',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: tags => (
    //         <>
    //             {tags.map(tag => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (text, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];

// const tableData = [
//     {
//         key: '1',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
//     {
//         key: '2',
//         name: 'Jim Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         name: 'Joe Black',
//         age: 32,
//         address: 'Sidney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];
export default function () {
    const [bnAccount, setBnAccount] = useState<Account>(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.request({
                    method: 'get',
                    url: '/api/v1/trade/account',
                    params: {
                        exName: 'BINANCE'
                    }
                })
                setBnAccount({
                    exName: 'BINANCE',
                    openOrders: data.data.data
                } as Account)
            } finally {
            }
        }
        fetchData()
    }, [])
    // const openOrders = bnAccount && <ReactJson src={bnAccount.openOrders}/>
    let tableData = [];
    if (bnAccount && Array.isArray(bnAccount.openOrders)) {
        tableData = bnAccount.openOrders
    }
    console.log('tableData', tableData)

    const expandRow = (recrod) => {
        return <div>
            <Space>
                <span>{recrod.OrderID}</span>
                <span>
                    <Tag color="gold"><a href={recrod.Currency.CurrencyA.Desc}
                                         target="_blank"
                                         rel="noopener noreferrer">{recrod.Currency.CurrencyA.Symbol}</a></Tag>
                    <DoubleRightOutlined />&nbsp;&nbsp;
                    <Tag color="gold"><a href={recrod.Currency.CurrencyB.Desc}
                                         target="_blank"
                                         rel="noopener noreferrer">{recrod.Currency.CurrencyB.Symbol}</a></Tag>
                </span>

            </Space>
        </div>
    }

    const openOrders = bnAccount &&
        <Table
            rowKey={record => record.OrderID}
            columns={tableProps}
            expandable={{
                defaultExpandAllRows: false,
                expandRowByClick: true,
                expandedRowRender: record => expandRow(record),
                rowExpandable: record => true,
            }}
            dataSource={tableData}/>
    return (
        <div className="account">
            <h3>{'BINANCE'}</h3>
            {openOrders}
        </div>
    );
};
