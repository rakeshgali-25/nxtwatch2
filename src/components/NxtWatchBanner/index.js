import './index.css'
import {BsX} from 'react-icons/bs'

const NxtWatchBanner = props => {
  const {onClickInto} = props

  const onClickClose = () => {
    onClickInto()
  }

  return (
    <div className="banner-container" data-testid="banner">
      <div className="banner-container-left">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="company-name"
        />
        <p className="para-banner">
          Buy Nxt Watch Premium prepaid plans with <br />
          UPI
        </p>
        <div>
          <button type="button" className="get-it-now">
            GET IT NOW
          </button>
        </div>
      </div>
      <button type="button" data-testid="close" className="close-icon">
        <BsX onClick={onClickClose} />
      </button>
    </div>
  )
}

export default NxtWatchBanner
