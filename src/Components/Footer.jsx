import React from 'react'
import Select from 'react-select'
import {themeOptions} from '../Styles/theme'
import {useTheme} from '../Context/ThemeContext'

const Footer = () => {
    const {setTheme,defaultTheme}=useTheme();
    const handleThemeChange=(e)=>
    {
        console.log(e);
        setTheme(e.value)
        localStorage.setItem("theme",JSON.stringify(e.value))
    }
  return (
    <div className="footer">
      <div className="intructions" style={{alignItem:'center'}}>
        <div className="hint">
          press <kbd>TAB</kbd> to open commands
        </div>
      </div>
      <div className='actual-footer'>
        <div className="footerLink">
            link
        </div>
        <div className="footerTheme">
          <Select
          options={themeOptions}
          menuPlacement="top"
          onChange={handleThemeChange}
          defaultValue={{value:defaultTheme, label:defaultTheme.label}}
          />
        </div>
    </div>
    </div>
  )
}

export default Footer