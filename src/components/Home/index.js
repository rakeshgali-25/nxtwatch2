import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideBar from '../SideBar'
import NxtWatchBanner from '../NxtWatchBanner'
import VideoItem from '../VideoItem'
import NxtWatchContext from '../../context/NxtWatchContext'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noVideos: 'NOVIDEOS',
}

class Home extends Component {
  state = {
    banner: true,
    videosList: [],
    searchInput: '',
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
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      if (data.videos.length === 0) {
        this.setState({apiStatus: apiConstants.noVideos, searchInput: ''})
      } else {
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
          videosList: updatedData,
          apiStatus: apiConstants.success,
        })
      }
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  onClickInto = () => {
    const {banner} = this.state
    this.setState(prevState => ({banner: !prevState.banner}))
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.getTheData)
  }

  onClickRetry = () => {
    console.log('retry')
    this.getTheData()
  }

  renderSearchBar = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value

        const {searchInput} = this.state
        const sdBg = lightTheme ? 'light-bg' : 'dark-bg'
        const searchInputTheme = lightTheme
          ? 'search-input-light'
          : 'search-input-dark'

        return (
          <div className="search-container">
            <input
              type="search"
              className={searchInputTheme}
              onChange={this.onChangeInput}
              placeholder="Search"
              value={searchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className={`search-icon ${sdBg}`}
            >
              <BsSearch onClick={this.onClickSearch} />
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderSuccess = () => {
    const {videosList} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const homeBg = lightTheme ? 'light-home-bg' : 'dark-home-bg'
          return (
            <ul className={`un-list ${homeBg}`}>
              {videosList.map(each => (
                <VideoItem each={each} key={each.id} />
              ))}
            </ul>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }

  renderNoVideos = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const headingTheme = lightTheme ? 'light-heading' : 'dark-heading'
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no video"
              className="failure-image"
            />
            <h1 className={headingTheme}>No Search results found</h1>
            <p className="failure-para">
              Try different keywords or remove search filter
            </p>

            <button
              type="button"
              className="retry-button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderFailure = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {lightTheme} = value
        const headingTheme = lightTheme ? 'light-heading' : 'dark-heading'
        return (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
              className="failure-image"
            />
            <h1 className={headingTheme}>Oops! Something Went Wrong</h1>
            <p className="failure-para">
              We are having some trouble to complete your request.
            </p>
            <p className="failure-para">Please try again</p>
            <button
              type="button"
              className="retry-button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  renderTheVideos = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'NOVIDEOS':
        return this.renderNoVideos()
      case 'FAILURE':
        return this.renderFailure()
      case 'INPROGRESS':
        return this.renderLoading()

      default:
        return null
    }
  }

  render() {
    const {banner} = this.state
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {lightTheme} = value
          const homeBg = lightTheme ? 'light-home-bg' : 'dark-home-bg'
          const displayHomeContainer = lightTheme
            ? 'display-saved-container-dark'
            : 'display-saved-container-light'
          return (
            <div className="home-container">
              <SideBar />
              <div className="display-container">
                <Header />
                {banner && <NxtWatchBanner onClickInto={this.onClickInto} />}
                <div className={`below-home-container  ${homeBg}`}>
                  {this.renderSearchBar()}
                  {this.renderTheVideos()}
                </div>
              </div>
            </div>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default Home
