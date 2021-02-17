import React, { useState, useEffect } from 'react'


function Header() {

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
        <span style={{color: 'white'}}>store#1232 52 Oguta Road, Onitsha, Anambra.</span>
        <span style={{color: '#0473b4'}}>Team Member: Okpala Collins</span>
      </div>
    </header>
  )
}

export default Header