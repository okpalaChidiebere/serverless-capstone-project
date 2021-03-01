import React, { Fragment, useState } from 'react'
import CashManagement from './modal/CashManagement'
import Toast from './Toast'
import { RouteComponentProps } from 'react-router-dom'


/*interface HomeProps{
  history: History, 
}*/

const Home: React.FC<RouteComponentProps> = (props) =>  {

  const toast = new Toast()
  const [ viewModal, openModal ] = useState({
    showCashManagementModal: false,
  })

  const { showCashManagementModal } = viewModal

  const handleShowCMModal = () => {
    openModal({...viewModal, showCashManagementModal: !showCashManagementModal})
  }

  const handleToast = () => {
    toast.show('This is toast')
  }

  return (
    <Fragment>
      <div className="home-container">
        <div className="home-pic"></div>
        <div className="home-nav-buttons">
          <button className="main-btn" onClick={handleShowCMModal}> Cash management </button>
          <button className="main-btn" onClick={handleToast}> Cash management </button>
        </div>
      </div>
      <CashManagement show={showCashManagementModal} handleClose={handleShowCMModal} {...props}/>
    </Fragment>
  );
}

export default Home;