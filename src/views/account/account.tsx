
import React, {useState, useEffect} from 'react'
import ReactJson from 'react-json-view'
import axios from '../../service/axios'
import './account.scss'
interface Account {
    exName: string,
    openOrders: []
}
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
    const openOrders = bnAccount && <ReactJson src={bnAccount.openOrders}/>
        // bnAccount.openOrders.map((item, index) =>
        // <div key={index}>{JSON.stringify(item)}</div>
    // )
    return (
        <div className="account">
            <h3>{'BINANCE'}</h3>
            {openOrders}
        </div>
    );
};
