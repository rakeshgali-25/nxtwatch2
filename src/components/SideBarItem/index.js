import './index.css'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

const SideBarItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {each} = props
      const {path, id, icon, para} = each
      const {activeId, onClickSideBar, lightTheme} = value
      const isActive = activeId === id
      const itemIcon = isActive ? 'active-icon' : ''

      const paraStyle = lightTheme ? 'light-item' : 'dark-item'
      let active
      if (isActive === true) {
        if (lightTheme === true) {
          active = 'light-active'
        } else {
          active = 'dark-active'
        }
      }

      const onClickItem = () => {
        onClickSideBar(id)
      }

      const icon2 = lightTheme ? 'light-icon' : 'dark-icon'

      return (
        <Link to={path} className="link" onClick={onClickItem}>
          <li className={`sidebar-list-item ${active}`}>
            <div className={`${icon2} ${itemIcon}`}>{icon}</div>
            <p className={paraStyle}>{para}</p>
          </li>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default SideBarItem
