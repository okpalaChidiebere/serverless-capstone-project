import { InvoicesActionTypes,  RECEIVE_INVOICES } from "../../actions/invoices/types";
import { Invoice } from "../../types/Invoice";


const initialState: Invoice[] = []

export default function invoices(
    state = initialState,
    action: InvoicesActionTypes
): Invoice[] {
    switch(action.type) {
        case RECEIVE_INVOICES : 
          return action.invoices
        default:
            return state
    }
  }