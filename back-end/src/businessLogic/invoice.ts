import { InvoiceAccess } from '../dataLayer/invoiceAccess';

import { createLogger } from '@libs/logger';

const logger = createLogger('invoiceBusinessLogic');

const invoiceAccess = new InvoiceAccess();

export async function addInvoice({ id, orders, soldTo, billTo, paymentStatus,
    paymentType, total, amountPaid, salesPerson, date }, userId: string): Promise<any> {

    logger.info('Entering Business Logic function: addInvoice');

    //const date = new Date().toISOString();
    
    return await invoiceAccess.addInvoice({
        id,
        date,
        orders,
        soldTo,
        billTo,
        paymentStatus,
        paymentType,
        total,
        amountPaid,
        salesPerson,
    }, userId)
}

export async function getAllInvoiceRecords(){
    return await invoiceAccess.getAllInvoiceRecords();
}


export async function syncInvoiceToES(body: any){
    return await invoiceAccess.syncInvoiceToES(body);
}

export async function searchInvoice(query: string){
    return await invoiceAccess.searchInvoice(query);
}