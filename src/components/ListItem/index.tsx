import * as React from 'react'
import CloseIcon from '../../icons/CloseIcon'
import PinIcon from '../../icons/PinIcon'

interface IListItemProps {
  tabName: string | undefined
  favIconUrl: string | undefined
  onCloseTab: () => void
  onGotoTab: () => void
}

const ListItem: React.FC<IListItemProps> = ({
  tabName,
  favIconUrl,
  onCloseTab,
  onGotoTab,
}) => {
  return (
    <div className="flex justify-between p-2 my-5 border-2 border-gray-300 rounded-sm">
      <div className="flex gap-2">
        <img
          src={
            favIconUrl?.length
              ? favIconUrl
              : 'https://images.unsplash.com/photo-1642706879731-c671fb881d04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
          }
          alt={tabName}
          width={40}
          height={30}
        />
        <h2 className="text-sm font-semibold font-opensans">{tabName}</h2>
      </div>
      <div className="flex items-center justify-center gap-2 ml-2">
        <button>
          <PinIcon className="w-5 h-5 text-gray-300 " />
        </button>
        <button
          className="px-4 py-2 font-opensans font-semibold text-xs bg-[#271c6e] shadow-[#271c6e] text-white rounded-md shadow-sm"
          onClick={onGotoTab}
        >
          Goto tab
        </button>
        <button
          className="px-4 py-2 font-semibold font-opensans text-xs  bg-[#ff1e01] shadow-[#ff2727] text-white rounded-md shadow-sm"
          onClick={onCloseTab}
        >
          <CloseIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default ListItem
