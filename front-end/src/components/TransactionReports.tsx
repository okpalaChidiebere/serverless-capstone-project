import React, { useState } from 'react'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'
import { History } from 'history'

/*interface TransactionReportsProps{
    history: History, 
}*/

type PropsFromRedux = ConnectedProps<typeof connectedTransactionReports>
type TransactionReportsProps = PropsFromRedux

const TransactionReports: React.FC<TransactionReportsProps> = ({ invoices, authedUser }) => {

    const [ state, setState ] = useState({
        listAllStoreOrders: true
    })

    const storeOrders = () => {
        setState(curr => ({
            listAllStoreOrders: !curr.listAllStoreOrders
        }))
    }


    const { listAllStoreOrders } = state

    const invoiceList = listAllStoreOrders
    ? invoices
    : invoices.filter (i => i.salesPerson === authedUser.user?.full_name)

    
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
                            {
                                invoiceList.length > 0
                                ? (invoiceList.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) //I could have sort this dates in an index table in my database
                                .map(invoice => (
                                    <tr>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.date}</td>
                                        <td style={{color:'#30b64f', width: '90px'}}>{invoice.paymentStatus}</td>
                                        <td>{invoice.total}</td>
                                        <td>{invoice.amountPaid}</td>
                                        <td>{invoice.salesPerson}</td>
                                        <td>{invoice.soldTo}</td>
                                    </tr>
                                )))
                                : (<div>
                                    No Invoice Recorded Yet
                                </div>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ invoices, authedUser }: RootState) => ({ invoices, authedUser })

  
const connectedTransactionReports = connect(mapStateToProps)

export default connectedTransactionReports(TransactionReports)