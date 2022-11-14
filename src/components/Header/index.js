import {Component} from 'react'
import {BsMoon} from 'react-icons/bs'
import {BiSun} from 'react-icons/bi'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import NxtWatchContext from '../../context/NxtWatchContext'
import PopupDesignFiles from '../PopupDesignFiles'

import './index.css'

import {
  HeaderContainer,
  CompanyImage,
  Profile,
  Icon,
  RightContainer,
} from './styledComponents'

class Header extends Component {
  render() {
    return (
      <NxtWatchContext>
        {value => {
          const {lightTheme, onClickTheme} = value

          const themeClicked = () => {
            onClickTheme()
            console.log(lightTheme)
          }

          const companyLogo = lightTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const themeButton = lightTheme
            ? 'theme-button-light'
            : 'theme-button-dark'
          const themeIcon = lightTheme ? <BsMoon /> : <BiSun />
          const bgColor = lightTheme ? '#ffffff' : '#212121'
          return (
            <HeaderContainer color={bgColor}>
              <Link to="/" className="link">
                <CompanyImage src={companyLogo} alt="website logo" />
              </Link>
              <RightContainer>
                <button
                  type="button"
                  data-testid="theme"
                  onClick={themeClicked}
                  className={themeButton}
                >
                  {themeIcon}
                </button>
                <Profile
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-header"
                />

                <PopupDesignFiles />
              </RightContainer>
            </HeaderContainer>
          )
        }}
      </NxtWatchContext>
    )
  }
}

export default Header
