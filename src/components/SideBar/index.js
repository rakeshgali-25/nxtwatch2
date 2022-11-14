import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import {ListContainer, Item, CompanyImage} from './styledComponents'
import SideBarItem from '../SideBarItem'

import './index.css'
import NxtWatchContext from '../../context/NxtWatchContext'

const sideBarItems = [
  {
    id: 'HOME',
    path: '/',
    icon: <AiFillHome className="sidebar-icon" />,
    para: 'Home',
  },
  {
    id: 'TRENDING',
    path: '/trending',
    icon: <MdWhatshot className="sidebar-icon" />,
    para: 'Trending',
  },
  {
    id: 'GAMING',
    path: '/gaming',
    icon: <SiYoutubegaming className="sidebar-icon" />,
    para: 'Gaming',
  },
  {
    id: 'SAVEDVIDEOS',
    path: '/saved-videos',
    icon: <BiListPlus className="sidebar-icon" />,
    para: 'Saved Videos',
  },
]

class SideBar extends Component {
  renderSidebar = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value

        console.log(lightTheme)
        const sdBg = lightTheme ? 'lightBg' : 'darkBg'
        const companyLogo = lightTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

        const para = lightTheme ? 'light-para' : 'dark-para'

        return (
          <div className={`sidebar-container ${sdBg}`}>
            <CompanyImage src={companyLogo} alt="website logo" />
            <ListContainer>
              {sideBarItems.map(each => (
                <SideBarItem each={each} key={each.id} />
              ))}
            </ListContainer>
            <div className="below-container">
              <p className={`contact-us ${para}`}>CONTACT US</p>
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="logo"
                />
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="logo"
                />
              </div>
              <p className={para}>
                Enjoy! Now to see your channels and recommendations!
              </p>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    const theme = this.renderSidebar()

    return <>{this.renderSidebar()}</>
  }
}
export default SideBar
