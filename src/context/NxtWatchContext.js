import React from 'react'

import {AiFillHome} from 'react-icons/ai'
import {MdWhatshot} from 'react-icons/md'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

const NxtWatchContext = React.createContext({
  savedVideos: [],
  lightTheme: '',
  activeId: 'HOME',
  onClickSideBar: () => {},
  onClickTheme: () => {},
  onClickSaveButton: () => {},
})

export default NxtWatchContext
