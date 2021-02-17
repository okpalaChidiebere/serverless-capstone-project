import React, { useState } from 'react'
import OrderItem, { orderItem  as item } from './OrderItem'
import serializeForm from 'form-serialize'

/*const invoiceData = {
    orders: [
        {
            productCode: '1132',
	        productType: 'Foreign',
	        productColor: 'Dark',
	        quantity: 4,
	        price: 2000,
	        discount: 0,
	        amount: 8000,
        },
        {
            productCode: '11227',
	        productType: 'Local',
	        productColor: 'LightBronze',
	        quantity: 2,
	        price: 1000,
	        discount: 0,
	        amount: 2000,
        }
    ],
    soldTo: 'Cash Customer',
    billTo: 'Cash Customer',
    paymentStatus: 'PaidSupplied',
    paymentType: 'Cash',
    total: 10000,
    amountPaid: 10000,
}*/
interface AddInvoiceState {
    orders: item[],
    soldTo: string,
    billTo: string,
    paymentStatus: string,
    paymentType: string,
    total: number,
    amountPaid: number,

}


const AddInvoice: React.FC = (props) => {

    const [ state, setState ] = useState<AddInvoiceState>({
        orders: [],
        soldTo: 'Cash Customer',
        billTo: 'Cash Customer',
        paymentStatus: 'PaidSupplied',
        paymentType: 'Cash',
        total: 0,
        amountPaid: 0,
    })


    const handleOrderChange = (order: item) => (event : React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>) => {

            const { name, value } = event.target
            const newItem = {
                ...order,
                [name]: value
            }
        setState(currState => ({
            ...currState,
            orders: currState.orders.filter((o, key) => key !== order.index).concat(newItem)
        }))
    }

    const handleUpdateAmount = (order: item) => (event: React.KeyboardEvent<HTMLInputElement>) => {

		const amount = (order.quantity * order.price)-(order.quantity * order.price * order.discount)/100

        const newItem = {
            ...order,
            amount,
        }

        const total = orders.reduce( (tot, item, index) => {
            let tmpAmt = item.amount
            if(index === order.index){
                tmpAmt = amount
            }
            return tot + (tmpAmt || 0)
        }, 0)

        setState(currState => ({
            ...currState,
            orders: currState.orders.filter((o, key) => key !== order.index).concat(newItem),
            total
        }))
	}

    const removeOrder = (order: item) => {
        //const { orders } = state
        setState(currState => ({
            ...currState,
            orders: currState.orders.filter((o, key) => key !== order.index),
            total: (state.total - order.amount)
        }))
    }

    const addOrder = () => {

        setState(currState => ({
            ...currState,
            orders: currState.orders.concat({
                productCode: '',
                productType: 'Foreign',
                productColor: 'Dark',
                quantity: 0,
                price: 0,
                discount: 0,
                amount: 0,
            })
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        const formValues = serializeForm(e.currentTarget, { hash: true })
        console.log(formValues)
    }

    const handleUpdateInvoiceSummary = (event: 
        React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = event.target;
        setState(currState => ({
            ...currState,
            [name]: value
        }))
    }

    const { orders, soldTo, billTo, paymentStatus, paymentType, amountPaid, total } = state


    return(
        <form className="add-invoice-container" onSubmit={handleSubmit}>
            {/*JSON.stringify(total)*/}
            <div className="pageHeader"><h1> Customer name and ID </h1></div>
            <div className="add-invoice-form">
                <div>
                    <div className="sold-invoice-info">
                        <span>{`Sold-To: ${soldTo}`}</span>
                        <span>{`Bill-To: ${billTo}`}</span>
                    </div>
                    <div><button className="main-btn">Subnit</button></div>
                </div>
                <div>Basic Information</div>
                <div>
                    <table className="add-invoice-table">
                        <thead>
                            <tr>
                                <th style={{width: "30px"}}>No</th>  
                                <th>ProductCode</th>  
                                <th>ProductType</th>  
                                <th>ProductColor</th>  
                                <th>Quantity(in Pcs)</th>  
                                <th>Price</th>  
                                <th style={{width: "90px"}}>Discount</th>  
                                <th>Amount</th>
                                <th style={{width: "70px"}}><input type="button" value="+" onClick={addOrder}/></th>  
	                        </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 && orders.map((item, key) => 
                            <OrderItem
                            key={key} 
                            orderItem={{...item, index: key}}
                            removeOrder={removeOrder}
                            orderChange={handleOrderChange}
                            updateAmount={handleUpdateAmount}
                            />)}
                        </tbody>
                    </table>
                </div>
                <div>
                    <span style={{padding: '20px', display: 'inline-block'}}>
                        <label className="inlineFormCustomSelect">Choose an Option to start a Work Order</label>
                        <select name="paymentStatus" value={paymentStatus} onChange={handleUpdateInvoiceSummary}>
				            <option value="PaidSupplied">Paid & Supplied</option>
				            <option value="PaidNotSupplied">Paid & Not Supplied</option>
				            <option value="NotPaidSupplied">Not Paid & Supplied</option>
				            <option value="NotPaidNotSupplied">Not Paid & Not Supplied</option>
				            <option value="NotFullPaymentSupplied">Not Full Payment & Supplied</option>
				            <option value="NotFullPaymentNotSupplied">Not Full Payment & Not Supplied</option>
				        </select>
                    </span>
                    <span style={{padding: '20px', display: 'inline-block'}}>
                        <label>Customer Type</label>
				        <select name="paymentType" value={paymentType} onChange={handleUpdateInvoiceSummary}>
		                    <option value="NoPaymentYet" >No Payment yet</option>
				            <option value="Cash">Cash</option>
				            <option value="Cheque">Cheque</option>
				            <option value="NotCompletePaymentCash" >Not Complete Payment Cash</option>
				            <option value="NotCompletePaymentCheque" >Not Complete Payment Cheque</option>
				        </select>
                    </span>
                    <span className="invoice-tableFoot"> 
                    <table className="add-invoice-table">
                        <tfoot>
                            <tr>
                                <td>Amount Paid:</td>
                                <td><input 
                                type="text" 
                                className="form-control" 
                                name="amountPaid" 
                                value={amountPaid} 
                                onChange={handleUpdateInvoiceSummary}
                                /></td>
                            </tr>
                            <tr>
                                <td>total:</td>
                                <td style={{textAlign:'center'}} className="total">{total.toFixed(2)}</td>
                            </tr>
                        </tfoot> 
                    </table>
                    </span>
                </div>
            </div>
        </form>
    )
}

export default AddInvoice