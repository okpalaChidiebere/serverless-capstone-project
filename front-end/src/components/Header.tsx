import React, { useState, useEffect } from 'react'
import { RootState } from '../reducers'
import { connect, ConnectedProps } from 'react-redux'

type PropsFromRedux = ConnectedProps<typeof connectedHeader>
type HeaderProps = PropsFromRedux

function Header({ authedUser }: HeaderProps) {

  const { user } = authedUser

  const display_ct = () => {

    const x = new Date()
    let currentMonth=x.getMonth()
    if (currentMonth < 10) { currentMonth = 0 + currentMonth }
    let x1=x.getFullYear() + " " +currentMonth + " " + x.getDate();
    x1 = x1 + " " + x.getHours( )+ ":" + x.getMinutes() + ":" + x.getSeconds()

    return x1
  } 

  const [ time, setTIme ] = useState(display_ct())

  useEffect(() => {
    (async () => {
      window.setTimeout(() => setTIme(display_ct()), 1000)
    })()
  })

  return (
    <header>
      <div className="time">{time}</div>
      <div className="logged-user" style={{}}>
        <span style={{color: 'white'}}>{`store#${user?.store}`}</span>
        <span style={{color: '#0473b4'}}>{`Team Member: ${user?.full_name}`}</span>
      </div>
    </header>
  )
}

const mapStateToProps = ({ authedUser }: RootState) => ({ authedUser })
  
const connectedHeader = connect(mapStateToProps)
export default connectedHeader(Header)