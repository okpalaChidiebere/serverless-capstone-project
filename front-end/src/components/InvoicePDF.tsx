import React from 'react'

const InvoicePDF: React.FC = (props) => {


    const handlePrint = () => {

        const printableArea = document.querySelector('.invoice-pdf-page-wrap')
        printableArea?.classList.remove('invoice-pdf-page-wrap')
        window.print()
        printableArea?.classList.add('invoice-pdf-page-wrap') 
    }

    return(
        <div>
            <div className="print_button" onClick={handlePrint}>Print</div>
            <div className="invoice-pdf-summary">
                <p className="invoice-pdf-summary-text">Background</p>
            </div>
            <div className="invoice-pdf-page-wrap" >
                <div className="pageHeader"><h1 style={{backgroundColor: '#222'}}> INVOICE </h1></div>
                <div className="add-invoice-form">
                    <div>
                        <textarea className="pdf-text-area">
                        52 Oguta Road
                        Onitsha, Anambra

                        Phone: (555) 555-5555
                        </textarea>
                        <img id="image" src="images/logo.png" alt="logo" />
                    </div>
                    <div style={{justifyContent: 'space-between'}}>
                        <textarea className="customer-title pdf-text-area">
                        Widget Corp.
                        c/o Steve Widget
                        </textarea>
                        <table className="meta">
                            <tr>
                                <td className="meta-head">Invoice #</td>
                                <td>000123</td>
                            </tr>
                            <tr>
                                <td className="meta-head">Date</td>
                                <td>December 15, 2009</td>
                            </tr>
                            <tr>
                                <td className="meta-head">Amount Due(&#8358;)</td>
                                <td><div>$875.00</div></td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table className="invoice-pdf-items">
                            <thead>
		                        <tr>
		                            <th style={{width: "30px"}}>No</th>  
                                    <th>ProductCode</th>  
                                    <th>ProductType</th>  
                                    <th>ProductColor</th>  
                                    <th>Quantity</th>  
                                    <th>Price</th>  
                                    <th style={{width: "90px"}}>Discount</th>  
                                    <th>Amount</th>
		                        </tr>
		                    </thead>		 
		                    <tbody>
                                <tr className="item-row">
		                            <td >Web Updates</td>
		                            <td >CIC3</td>
		                            <td>FOREIGN</td>
		                            <td>BLUE</td>
		                            <td>50</td>
		                            <td>2000</td>
		                            <td>1</td>
		                            <td>2000</td>
		                        </tr>
                            </tbody>
                            <tfoot>
		                        <tr>
		                            <td className="blank"> </td>
		                            <td className="total-line">Total &#8358;</td>
		                            <td className="total-value">$875.00</td>
		                        </tr>
		                        <tr>
		                            <td className="blank"> </td>
		                            <td className="total-line">Amount Paid &#8358;</td>
		                            <td className="total-value">$0.00</td>
		                        </tr>
		                    </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvoicePDF