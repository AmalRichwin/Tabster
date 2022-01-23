import * as React from 'react'
import Tippy from '@tippyjs/react'

import CloseIcon from '../../icons/CloseIcon'
import CopyToClipboard from '../../icons/CopyToClipboard'
import PinIcon from '../../icons/PinIcon'
import UpArrowIcon from '../../icons/UpArrowIcon'

import 'tippy.js/dist/tippy.css'
interface IListItemProps {
  tab: chrome.tabs.Tab
  favIconUrl: string | undefined
  onCloseTab: () => void
  onGotoTab: () => void
  onTabPin: () => void
  onCopyUrl: () => void
}

const ListItem: React.FC<IListItemProps> = ({
  tab,
  favIconUrl,
  onCloseTab,
  onGotoTab,
  onTabPin,
  onCopyUrl,
}) => {
  return (
    <div className="flex justify-between p-2 my-5 border-2 border-gray-300 rounded-sm hover:bg-gray-200">
      <div className="flex gap-2">
        <img
          src={
            favIconUrl?.length
              ? favIconUrl
              : 'https://images.unsplash.com/photo-1642706879731-c671fb881d04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
          }
          alt={tab.title}
          width={40}
          height={30}
        />
        <h2 className="text-sm font-semibold font-opensans">{tab.title}</h2>
      </div>
      <div className="flex items-center justify-center gap-2 ml-2">
        <Tippy content={<span>Pin Tab</span>}>
          <button onClick={onTabPin}>
            <PinIcon
              className={` ${
                tab.pinned ? 'text-red-400' : 'text-gray-400'
              } w-3 h-3  `}
            />
          </button>
        </Tippy>
        <Tippy content={<span>Copy Url</span>}>
          <button onClick={onCopyUrl}>
            <CopyToClipboard className="w-3 h-3 text-gray-400" />
          </button>
        </Tippy>
        <Tippy content={<span>Go to tab</span>}>
          <button
            className={` ${
              tab.active
                ? ' bg-gray-400 shadow-gray-400/50'
                : 'bg-[#271c6e] shadow-[#271c6e]'
            } px-1 py-1 font-opensans font-semibold text-xs group 
          text-white rounded-md shadow-sm`}
            onClick={onGotoTab}
            disabled={tab.active}
          >
            <span className="hidden group-hover:inline-block group-hover:ease-in group-hover:duration-300">
              Goto
            </span>{' '}
            <UpArrowIcon className="inline w-4 h-4 rotate-45" />
          </button>
        </Tippy>
        <Tippy
          content={
            <span className="text-sm font-semibold font-opensans">
              Close tab
            </span>
          }
        >
          <button
            className="px-1 py-1 font-semibold font-opensans text-xs  bg-[#ff1e01] shadow-[#ff2727] text-white rounded-md shadow-sm"
            onClick={onCloseTab}
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </Tippy>
      </div>
    </div>
  )
}

export default ListItem
