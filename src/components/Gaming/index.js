import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import Header from '../Header'
import SideBar from '../SideBar'
import GamingItem from '../GamingItem'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiConstants = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    gamingList: [],

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#231f20" height="50" width="50" />
    </div>
  )

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = ` https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewsCount: each.view_count,
      }))
      this.setState({gamingList: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    console.log('retry')
    this.getTheData()
  }

  renderTrendingBanner = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const gamingContainer = lightTheme
          ? 'light-gaming-container'
          : 'dark-gaming-container'
        return (
          <div className={gamingContainer}>
            <div className="icon-container">
              <SiYoutubegaming className="trending-icon" />
            </div>
            <h1 className="trending">Gaming</h1>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccess = () => {
    const {gamingList} = this.state

    return (
      <ul className="un-gaming-list">
        {gamingList.map(each => (
          <GamingItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We are having some trouble to complete your request.
      </p>
      <p className="failure-para">Please try again</p>
      <button type="button" className="retry-button" onClick={this.getTheData}>
        Retry
      </button>
    </div>
  )

  renderTheVideos = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      case 'INPROGRESS':
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const belowContainer = lightTheme
            ? 'below-trending-light-container'
            : 'below-trending-dark-container'
          return (
            <div className="home-container">
              <SideBar />
              <div className="display-container" data-testid="gaming">
                <Header />
                {this.renderTrendingBanner()}
                <div className={belowContainer}>{this.renderTheVideos()}</div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Gaming
