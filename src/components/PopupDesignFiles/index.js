import './index.css'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'
import {LightLogoutButton, DarkLogoutButton} from './styledComponents'

const PopupDesignFiles = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {lightTheme} = value
      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      const popupBg = lightTheme ? '' : 'dark-popup'
      return (
        <div>
          <Popup
            modal
            trigger={
              lightTheme ? (
                <LightLogoutButton>Logout</LightLogoutButton>
              ) : (
                <DarkLogoutButton>Logout</DarkLogoutButton>
              )
            }
          >
            {close => (
              <>
                <div className={`pop-up-container ${popupBg}`}>
                  <p>Are you sure, you want to logout</p>
                  <div className="buttons-container">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </>
            )}
          </Popup>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default withRouter(PopupDesignFiles)
