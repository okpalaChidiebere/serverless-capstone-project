import React from 'react'
import { History } from 'history'

interface Props{
    handleClose: ((event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void), 
    show: Boolean,
    history: History, 
}

const CashManagement: React.FC<Props> = (props) => {
    
    const { handleClose, show } = props
    const showHideClassName = show ? `modal display-block` : `modal display-none`

    const handleRedirect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        const { name } = e.currentTarget

        switch (name) {
            case "quickTillPage" : 
                props.history.push('/invoice/add')
                break
            case "tillReports" :
                props.history.push('/transactionReports')
                break          
        }
    }

    return(
        <div className={showHideClassName}>
            <div className="modal-content">
            <span className="close" onClick={handleClose}>&times;</span>
            <h2>Cash Management</h2>
            <button className="main-btn" name="quickTillPage" onClick={handleRedirect}>Quick Till Cash Order</button>
            <button className="main-btn" name="tillReports" onClick={handleRedirect}>Till Transaction Report</button>
            </div>
        </div>
    )
}

export default CashManagement