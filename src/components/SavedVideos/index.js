import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {MdWhatshot} from 'react-icons/md'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'
import TrendingItem from '../TrendingItem'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class SavedVideos extends Component {
  state = {
    apiStatus: apiConstants.initial,
  }

  renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getTheData()
  }

  renderSavedBanner = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const darkBg = lightTheme ? 'light-bg-trending' : 'dark-bg-trending'
        const iconBg = lightTheme ? '' : 'dark-trending-icon'
        return (
          <div className={darkBg}>
            <div className="icon-container">
              <BiListPlus className={`trending-icon ${iconBg}`} />
            </div>
            <h1 className="trending">Saved Videos</h1>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderTheVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {savedVideos, lightTheme} = value
        const headingTheme = lightTheme ? 'light-heading' : 'dark-heading'

        if (savedVideos.length !== 0) {
          return (
            <ul className="un-trending-list">
              {savedVideos.map(each => (
                <TrendingItem each={each} key={each.id} />
              ))}
            </ul>
          )
        }
        return (
          <div className="no-videos-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
              className="failure-image"
            />
            <h1 className={headingTheme}>No saved videos found</h1>
            <p className="failure-para">
              You can save your videos while watching them
            </p>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const belowContainer = lightTheme
            ? 'below-saved-light-container'
            : 'below-saved-dark-container'

          const savedContainer = lightTheme
            ? 'display-saved-container-dark'
            : 'display-saved-container-light'
          return (
            <div className="saved-container">
              <SideBar />
              <div className={savedContainer}>
                <Header />
                {this.renderSavedBanner()}
                <div className={belowContainer}>{this.renderTheVideos()}</div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default SavedVideos
