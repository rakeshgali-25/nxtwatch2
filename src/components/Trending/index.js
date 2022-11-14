import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {MdWhatshot} from 'react-icons/md'
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

class Trending extends Component {
  state = {
    trendingList: [],

    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getTheData()
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getTheData = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = ` https://apis.ccbp.in/videos/trending`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)

    console.log(response.ok)
    if (response.ok === true) {
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
      }))
      this.setState({
        trendingList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getTheData()
  }

  renderTrendingBanner = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const darkBg = lightTheme ? 'light-bg-trending' : 'dark-bg-trending'
        const iconBg = lightTheme ? '' : 'dark-trending-icon'
        return (
          <div className={darkBg}>
            <div className="icon-container">
              <MdWhatshot className={`trending-icon ${iconBg}`} />
            </div>
            <h1 className="trending">Trending</h1>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccess = () => {
    const {trendingList} = this.state

    return (
      <ul className="un-trending-list">
        {trendingList.map(each => (
          <TrendingItem each={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderTrendingFailure = () => (
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
      <p className="failure-para">Please try again.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderTheVideos = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccess()
      case apiConstants.failure:
        return this.renderTrendingFailure()
      case apiConstants.inProgress:
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
            <div className="trending-container">
              <SideBar />
              <div className="display-container" data-testid="trending">
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

export default Trending
