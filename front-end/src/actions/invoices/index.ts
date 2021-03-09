import { Invoice } from "../../types/Invoice";
import { InvoicesActionTypes, RECEIVE_INVOICES, ADD_INVOICE } from "./types";


export const receiveInvoices = (invoices: Invoice[]): InvoicesActionTypes =>
({
    type: RECEIVE_INVOICES,
    invoices,
})

export const addInvoice = (invoice: Invoice): InvoicesActionTypes =>
({
    type: ADD_INVOICE,
    invoice,
})
