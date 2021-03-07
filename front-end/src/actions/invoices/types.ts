import { Invoice } from '../../types/Invoice'

export const RECEIVE_INVOICES = 'RECEIVE_INVOICES'


interface ReceivesInvoices { 
    type: typeof RECEIVE_INVOICES
    invoices: Invoice[]
}

export type InvoicesActionTypes = ReceivesInvoices