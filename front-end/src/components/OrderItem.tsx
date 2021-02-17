import React from 'react'

export interface orderItem {
	index?: number
	productCode: number | string,
	productType: string,
	productColor: string,
	quantity: number,
	price: number,
	discount: number,
	amount: number,
}

interface OrderItemProps{
	orderItem: orderItem,
	removeOrder: (order: orderItem) => void,
	orderChange: (order: orderItem) => (event : React.ChangeEvent<HTMLInputElement>
		| React.ChangeEvent<HTMLSelectElement>) => void,
	updateAmount: (order: orderItem) => (event: React.KeyboardEvent<HTMLInputElement>) => void,
}

const OrderItem: React.FC<OrderItemProps> = ({ orderItem, removeOrder, orderChange, updateAmount }) => {

    return(
        <tr>
            <td style={{width: "30px"}}>{orderItem.index}</td>  
            <td>
				<input 
				type="text" 
				className="form-control" 
				name="productCode" 
				value={orderItem.productCode}
				onChange={orderChange(orderItem)}
				/>
			</td>  
            <td>
				  <select className="custom-select" value={orderItem.productType} name="productType" onChange={orderChange(orderItem)}>
				    <option value="Foreign">Foreign</option>
				    <option value="LocalEconomy">Local&Economy</option>
				    <option value="LocalStandard">Local&Standard</option>
				  </select>
            </td>
			<td>
				  <select className="custom-select"  value={orderItem.productColor} name="productColor" onChange={orderChange(orderItem)}>
				   <option value="Dark">Dark</option>
				    <option value="Green">Green</option>
				    <option value="LightBronze">Light Bronze</option>
				    <option value="White">White</option>
				    <option value="Milk">Milk</option>
				    <option value="Silver">Silver</option>
				    <option value="Blue">Blue</option>
				    <option value="Red">Red</option>
				  </select>
            </td>
            <td>
				<input 
				type="text" 
				className="form-control" 
				name="quantity" 
				value={orderItem.quantity === 0 ? '' : orderItem.quantity}
				onKeyUp={updateAmount(orderItem)}
				onChange={orderChange(orderItem)}/>
			</td>  
            <td>
				<input 
				type="text" 
				className="form-control" 
				name="price" 
				onKeyUp={updateAmount(orderItem)}
				value={orderItem.price === 0 ? '' : orderItem.price}
				onChange={orderChange(orderItem)}/>
			</td>  
            <td style={{width: "90px"}}>
				<input 
				type="text" 
				className="form-control" 
				name="discount" 
				onKeyUp={updateAmount(orderItem)}
				style={{width: "60px"}} 
				value={orderItem.discount === 0 ? '' : orderItem.discount}
				onChange={orderChange(orderItem)}/>
			</td>  
            <td>
				<input 
				type="text" 
				className="form-control" 
				name="amount" 
				readOnly={true} 
				value={orderItem.amount === 0 ? '' : orderItem.amount.toFixed(2)}
				onChange={orderChange(orderItem)}/>
			</td>  
            <td style={{width: "70px"}}>
				<input type="button" className="input-button-link" value="Delete" onClick={() => removeOrder(orderItem)}/>
			</td>               
        </tr>
    )
}

export default OrderItem