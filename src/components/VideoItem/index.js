import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

class VideoItem extends Component {
  getDiff = publishedAt => {
    const diff = formatDistanceToNow(new Date(publishedAt))
    return diff
  }

  render() {
    return (
      <NxtWatchContext.Consumer>
        {value => {
          const {each} = this.props
          const {
            channel,
            id,
            publishedAt,
            viewsCount,
            title,
            thumbnailUrl,
          } = each
          const {name, profileImageUrl} = channel
          const difference = this.getDiff(publishedAt)
          const {lightTheme} = value
          const itemHeading = lightTheme
            ? 'light-item-heading'
            : 'dark-item-heading'
          const itemPara = lightTheme ? 'light-item-para' : 'dark-item-para'
          return (
            <Link to={`/videos/${id}`} className="link">
              <li className="list-item">
                <img
                  src={thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnail-image"
                />
                <div className="channel-container">
                  <img
                    src={profileImageUrl}
                    alt="channel logo"
                    className="channel-image"
                  />
                  <div className="description-container">
                    <p className={itemHeading}>{title}</p>
                    <p className={itemPara}>{name}</p>

                    <p className={itemPara}>{viewsCount}</p>
                    <p>views . {difference}</p>
                  </div>
                </div>
              </li>
            </Link>
          )
        }}
      </NxtWatchContext.Consumer>
    )
  }
}

export default VideoItem
