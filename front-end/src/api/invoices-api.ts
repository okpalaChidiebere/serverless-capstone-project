import Axios from 'axios';
import { apiEndpoint } from '../config';
import { Invoice } from '../types/Invoice';

export const getInvoices = async (idToken: string): Promise<Invoice[]> => {
    //console.log('Fetching invoices')
  
    const response = await Axios.get(`${apiEndpoint}/invoices`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
    });
    //console.log('Invoices: ', response.data);
    const { items } = response.data
    return items;
}

export const addInvoice = async (invoice: Invoice, idToken: string) => {
  const response = await Axios.post(`${apiEndpoint}/addInvoice`,  JSON.stringify(invoice), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
  });
  return response.data;
}