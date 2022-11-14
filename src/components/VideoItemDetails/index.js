import './index.css'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd, MdPlaylistAddCheck} from 'react-icons/md'
import NxtWatchContext from '../../context/NxtWatchContext'
import Header from '../Header'

import SideBar from '../SideBar'

const apiConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    apiStatus: apiConstants.initial,
    liked: false,
    disLiked: false,
    saved: false,
  }

  componentDidMount() {
    this.getTheData()
  }

  onClickLiked = () => {
    const {liked} = this.state
    if (liked === true) {
      this.setState({
        liked: false,
        disLiked: false,
      })
    } else {
      this.setState({
        liked: true,
        disLiked: false,
      })
    }
  }

  onClickDisLiked = () => {
    const {disLiked, liked} = this.state
    if (disLiked === true && liked === false) {
      this.setState({
        liked: false,
        disLiked: false,
      })
    } else {
      this.setState({
        liked: false,
        disLiked: true,
      })
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  getTheData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiUrl = ` https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      console.log(updatedData)
      this.setState({
        videoDetails: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  getDiff = publishedAt => {
    const diff = formatDistanceToNow(new Date(publishedAt))
    return diff
  }

  renderSuccess = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {videoDetails, liked, disLiked, saved} = this.state
        const {
          channel,
          description,
          id,
          publishedAt,
          thumbnailUrl,
          title,
          videoUrl,
          viewCount,
        } = videoDetails
        const {name, profileImageUrl, subscriberCount} = channel
        console.log(videoUrl)
        const difference = this.getDiff(publishedAt)
        const {onClickSaveButton} = value

        const saveClicked = () => {
          onClickSaveButton(videoDetails)
          this.setState(prevState => ({saved: !prevState.saved}))
        }

        const {lightTheme} = value
        const videoDetailsContainer = lightTheme
          ? 'video-details-light'
          : 'video-details-dark'
        const videoTitle = lightTheme ? 'video-title-light' : 'video-title-dark'

        const videoPara1 = lightTheme ? 'video-para1-light' : 'video-para1-dark'
        const videoPara2 = lightTheme ? 'video-para2-light' : 'video-para2-dark'
        const likedBtn = liked ? 'liked-true' : ''
        const disLikeBtn = disLiked ? 'liked-true' : ''
        const saveBtn = saved ? 'liked-true' : ''
        const saveIcon = saved ? <MdPlaylistAddCheck /> : <MdPlaylistAdd />
        const saveText = saved ? 'Saved' : 'Save'
        return (
          <div className={videoDetailsContainer}>
            <ReactPlayer url={videoUrl} width="800px" height="600px" controls />
            <p className={videoTitle}>{title}</p>
            <div className="views-container">
              <p className={`para-left ${videoPara1}`}>
                {viewCount} views . {difference} ago
              </p>
              <div className="like-container">
                <button
                  type="button"
                  onClick={this.onClickLiked}
                  className={`para-button ${videoPara1} ${likedBtn}`}
                >
                  <BiLike /> Like
                </button>
                <button
                  type="button"
                  onClick={this.onClickDisLiked}
                  className={`para-button ${videoPara1} ${disLikeBtn}`}
                >
                  <BiDislike /> Dislike
                </button>
                <button
                  type="button"
                  onClick={saveClicked}
                  className={`save-button ${videoPara1} ${saveBtn}`}
                >
                  {saveIcon} {saveText}
                </button>
              </div>
            </div>
            <hr className="line" />
            <div className="video-below-container">
              <img
                src={profileImageUrl}
                alt="channel logo"
                className="channel-icon"
              />
              <div className="para-container">
                <p className={videoPara2}>{name}</p>
                <p className={videoPara1}>{subscriberCount} subscribers</p>
                <p className={videoPara2}>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

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
        <br /> Please try again.
      </p>

      <button type="button" className="retry-button" onClick={this.getTheData}>
        Retry
      </button>
    </div>
  )

  renderVideoDetails = () => {
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
      <div className="home-container">
        <SideBar />
        <div className="display-container">
          <Header />
          {this.renderVideoDetails()}
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
