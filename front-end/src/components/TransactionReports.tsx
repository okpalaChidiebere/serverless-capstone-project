import React, { useState } from 'react'
import { History } from 'history'

interface TransactionReportsProps{
    history: History, 
}

const TransactionReports: React.FC<TransactionReportsProps> = (props) => {

    const [ state, setState ] = useState({
        listAllStoreOrders: true
    })

    const storeOrders = () => {
        setState(curr => ({
            listAllStoreOrders: !curr.listAllStoreOrders
        }))
    }


    const { listAllStoreOrders } = state
    return(
        <div>
            <div className="pageHeader"><h1> Search customer </h1></div>
            <div className="transaction-report-container">
                <div>
                <button className={`tablink ${listAllStoreOrders ? "tablink-active" : ""}`} onClick={storeOrders}><div >All Store Orders</div></button>
                <button className={`tablink ${!listAllStoreOrders ? "tablink-active" : ""}`} onClick={storeOrders}><div >My Store Orders</div></button>
                </div>
                <div>
                <table className="add-invoice-table">
                    <thead>
                        <tr>
							<th>Invoice ID</th>
							<th>Order Date</th>
							<th style={{width:"90px"}}>Status</th>
							<th>Sales Amount(&#8358;)</th>
							<th>Amount Paid(&#8358;)</th>
							<th>Employee</th>
							<th>Customer</th>
						</tr>
						<tr>
							<td><input type="text"  style={{ width:'140px',height:' 19px'}}/></td>
							<td><input type="text" style={{ width:'140px',height:' 19px'}}/></td>
							<td></td>
							<td><input type="text" style={{ width:'140px',height:' 19px'}}/></td>
							<td><input type="text" style={{ width:'140px',height:' 19px'}}/></td>
							<td><input type="text" style={{ width:'140px',height:' 19px'}}/></td>
							<td><input type="text" style={{ width:'140px',height:' 19px'}}/></td>		
						</tr> 
                    </thead>
                    </table>
                </div>
                <div>
					<table className="add-invoice-table">
                        <tbody>
                            <tr>
                                <td>1120</td>
                                <td>19-01-2021</td>
                                <td style={{color:'#30b64f', width: '90px'}}>Paid & Supplied</td>
                                <td>30000</td>
                                <td>30000</td>
                                <td>chidiebere</td>
                                <td>Cash Customer</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TransactionReports