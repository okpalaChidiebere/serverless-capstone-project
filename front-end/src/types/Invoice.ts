export interface Invoice {
    id: string,
    date: string,
    orders: order[],
    soldTo: string,
    billTo: string,
    paymentStatus: string,
    paymentType: string,
    total: number,
    amountPaid: number,
    salesPerson: string,
}

export interface order {
	index?: number
	productCode: number | string,
	productType: string,
	productColor: string,
	quantity: number,
	price: number,
	discount: number,
	amount: number,
}