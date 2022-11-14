import './index.css'
import {Link} from 'react-router-dom'
import NxtWatchContext from '../../context/NxtWatchContext'

const GamingItem = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {lightTheme} = value
      const {each} = props
      const {id, thumbnailUrl, title, viewsCount} = each
      const gameTitle = lightTheme ? 'game-light-heading' : 'game-dark-heading'

      return (
        <Link to={`/videos/${id}`} className="gaming-item">
          <img
            src={thumbnailUrl}
            alt="video thumbnail"
            className="gaming-thumbnail"
          />
          <p className={gameTitle}>{title}</p>
          <p className="game-para">{viewsCount} Watching Worldwide</p>
        </Link>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default GamingItem
