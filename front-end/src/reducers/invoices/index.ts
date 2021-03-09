import { InvoicesActionTypes,  RECEIVE_INVOICES, 
  ADD_INVOICE } from "../../actions/invoices/types";
import { Invoice } from "../../types/Invoice";


const initialState: Invoice[] = []

export default function invoices(
    state = initialState,
    action: InvoicesActionTypes
): Invoice[] {
    switch(action.type) {
        case RECEIVE_INVOICES : 
          return action.invoices
        case ADD_INVOICE : 
          return state.concat([action.invoice])
        default:
            return state
    }
  }