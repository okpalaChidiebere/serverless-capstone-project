import { Invoice } from "../../types/Invoice";
import { InvoicesActionTypes, RECEIVE_INVOICES } from "./types";


export const receiveInvoices = (invoices: Invoice[]): InvoicesActionTypes =>
({
    type: RECEIVE_INVOICES,
    invoices,
})