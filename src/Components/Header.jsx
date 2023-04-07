import React from 'react'
import AccountIcon from './AccountIcon'
import CompareButton from './CompareButton'

const Header = () => {
  return (
    <div className="header">
        <div className="logo">
            LOGO
        </div>
        <div>
              <CompareButton/>
            </div>
        <div className="icons">
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header