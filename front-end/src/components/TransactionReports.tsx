import React, { useState, useRef, useMemo, useLayoutEffect } from 'react'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'
import { search } from '../api/invoices-api'



type PropsFromRedux = ConnectedProps<typeof connectedTransactionReports>
type TransactionReportsProps = PropsFromRedux

const TransactionReports: React.FC<TransactionReportsProps> = ({ invoices, authedUser }) => {

    const [ state, setState ] = useState({
        invoiceSearchFileds: {
            id: '',
            paymentStatus: '',
            total: '',
            amountPaid: '',
            salesPerson: '',
            soldTo: ''
        },
        searchResults: [],
        listAllStoreOrders: true
    })

    const searchIsEmpty = () => {
        const { id, paymentStatus, total, amountPaid, salesPerson, soldTo } = state.invoiceSearchFileds
        return id === '' && paymentStatus === '' && total === '' && amountPaid === '' && soldTo === '' && salesPerson === ''
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setState(currState => ({
          ...currState,
          invoiceSearchFileds: {
            ...currState.invoiceSearchFileds,
            [name]: value,
          },
        }));

        if(value !== ''){
            //make a api request
            searchInvoices(value, authedUser.accessToken)
        }
    }

    const searchInvoices = (query: string, token: string) => {
        search(query, token) //get the cbooks from the server
         .then((items) => {
            const updatedResult = items.length > 0 ? items.map(({ _source = {} }) => ({ ..._source })) : []
            setState(currState => ({
                ...currState,
                searchResults: updatedResult
            }))
         })
    }

    const [newInvoices, setNewInvoices] = useState(false)

    const scroller = useRef<HTMLDivElement>(null)

    //returns snapshot value
    const scrollTo = useMemo(() => {
        
        // Find all elements in container which will be checked if are in view or not
        const nodeElement = scroller.current?.querySelector('.invoice')
        if (nodeElement) {
            //capture the scroll position so we can adjust scroll latter
            return nodeElement.scrollHeight - nodeElement.scrollTop
        }

        return undefined
    }, [ invoices ])

    //runs after component mounts
    useLayoutEffect(() => {
        if (scrollTo) {

            scroller.current?.scrollBy({
                top: scrollTo + 2, //add 2 for small margin error in scroll position
                //behavior: "smooth",
            });
            setNewInvoices(true)
        }
    }, [ scrollTo, invoices ])

    // called as the scroll position changes
    const handleOnScroll = () => {
        if (scroller.current!.scrollTop < 60) {
            setNewInvoices(false)
        }
    }

    const storeOrders = () => {
        setState(curr => ({
            ...curr,
            listAllStoreOrders: !curr.listAllStoreOrders
        }))
    }


    const { listAllStoreOrders, searchResults, invoiceSearchFileds } = state

    const invoiceList = listAllStoreOrders
    ? (searchIsEmpty() ? invoices : searchResults )
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
							<th style={{width:"90px"}}>Order Date</th>
							<th>Status</th>
							<th>Sales Amount(&#8358;)</th>
							<th>Amount Paid(&#8358;)</th>
							<th>Employee</th>
							<th>Customer</th>
						</tr>
						<tr>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="id"
                            value={invoiceSearchFileds.id}
                            onChange={handleInputChange}/></td>
                            <td></td>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="paymentStatus"
                            value={invoiceSearchFileds.paymentStatus}
                            onChange={handleInputChange}/></td>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="total"
                            value={invoiceSearchFileds.total}
                            onChange={handleInputChange}/></td>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="amountPaid"
                            value={invoiceSearchFileds.amountPaid}
                            onChange={handleInputChange}/></td>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="salesPerson"
                            value={invoiceSearchFileds.salesPerson}
                            onChange={handleInputChange}/></td>
							<td><input type="text"  
                            style={{ width:'140px',height:' 19px'}}
                            name="soldTo"
                            value={invoiceSearchFileds.soldTo}
                            onChange={handleInputChange}/></td>		
						</tr> 
                    </thead>
                    </table>
                </div>
                <div style={{overflow: 'auto', flexDirection: 'column'}} ref={scroller} onScroll={handleOnScroll}>
                    <div className={`invoices-alert ${newInvoices && listAllStoreOrders ? 'active' : ''}`} ><span>new invoices</span></div>
                            {
                                invoiceList.length > 0
                                ? (
                                    <table className="add-invoice-table" style={{margin: 0}}>
                                        <tbody>
                                            {
                                                invoiceList.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()) //I could have sort this dates in an index table in my database
                                                .map((invoice, index) => (
                                                    <tr key={index} className="invoice">
                                                        <td>{invoice.id}</td>
                                                        <td style={{width: '90px'}}>{invoice.date}</td>
                                                        <td style={{color:'#30b64f'}}>{invoice.paymentStatus}</td>
                                                        <td>{invoice.total}</td>
                                                        <td>{invoice.amountPaid}</td>
                                                        <td>{invoice.salesPerson}</td>
                                                        <td>{invoice.soldTo}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    )
                                : (
                                    !searchIsEmpty() ? (
                                        <div>
                                            No Search Results
                                        </div>
                                    ) : (
                                        <div>
                                            No Invoice Recorded Yet
                                        </div>
                                    )
                                )
                            }
                        
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ invoices, authedUser }: RootState) => ({ invoices, authedUser })

  
const connectedTransactionReports = connect(mapStateToProps)

export default connectedTransactionReports(TransactionReports)