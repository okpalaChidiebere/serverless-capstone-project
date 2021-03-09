import { Invoice } from '../../types/Invoice'

export const RECEIVE_INVOICES = 'RECEIVE_INVOICES'
export const ADD_INVOICE = 'ADD_INVOICE'


interface ReceivesInvoices { 
    type: typeof RECEIVE_INVOICES
    invoices: Invoice[]
}

interface AddInvoiceAction {
    type: typeof ADD_INVOICE 
    invoice: Invoice
}

export type InvoicesActionTypes = ReceivesInvoices | AddInvoiceAction