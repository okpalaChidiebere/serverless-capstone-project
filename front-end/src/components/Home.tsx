import React, { Fragment, useState } from 'react'
import CashManagement from './modal/CashManagement'
import Toast from './Toast'
import { RouteComponentProps } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { Auth } from 'aws-amplify'
import { setAuthedUser } from '../actions/authedUser'


type PropsFromRedux = ConnectedProps<typeof connectedHome>
type HomeProps = PropsFromRedux & RouteComponentProps

const Home: React.FC<HomeProps> = (props) =>  {

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

  const handleSignOut = async () => {
    try{
      await Auth.signOut()
    }catch(err){
      alert(err)
    }
  }

  return (
    <Fragment>
      <div className="home-container">
        <div className="home-pic"></div>
        <div className="home-nav-buttons">
          <button className="main-btn" onClick={handleShowCMModal}> Cash management </button>
          <button className="main-btn" onClick={handleToast}> Cash management </button>
          <button className="main-btn" onClick={handleSignOut}> SignOut </button>
        </div>
      </div>
      <CashManagement show={showCashManagementModal} handleClose={handleShowCMModal} {...props}/>
    </Fragment>
  );
}

const mapDispatchToProps = {
  setAuthedUser
}
const connectedHome = connect(null, mapDispatchToProps)
export default connectedHome(Home);