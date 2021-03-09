
export const generateInvoiceId = () => {
    return Math.random().toString(36).substr(2,3) + (Date.now()).toString(36)
}