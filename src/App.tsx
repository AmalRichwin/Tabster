import React from 'react'
import ListItem from './components/ListItem'
import SearchSolidIcon from './icons/SearchSolidIcon'
import './styles.css'

function App() {
  const [tabsList, setTabsList] = React.useState<chrome.tabs.Tab[]>([])
  const [filteredtabsList, setFilteredTabsList] = React.useState<
    chrome.tabs.Tab[]
  >([])
  const [searchQuery, setSearchQuery] = React.useState('')

  React.useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query({}, (tabs) => {
        setTabsList(tabs)
      })
  })

  React.useEffect(() => {
    if (tabsList) {
      setFilteredTabsList(tabsList)
    }
  }, [])

  async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true }
    const [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  /**
   * @description close all the tabs except the current tab
   */
  const handleCloseRestTabs = async () => {
    const currentTab = await getCurrentTab()

    if (currentTab) {
      tabsList.forEach((tab, idx) => {
        if (tab.id !== currentTab.id) {
          handleCloseTabByID(tab.id || -1, idx)
        }
      })
    }
  }

  const handleCloseTabByID = (id: number, index: number): void => {
    setTabsList((prevTabs) => prevTabs.splice(index, 1))
    chrome.tabs.remove(id || -1)
  }

  const handleGotoTab = (tab: chrome.tabs.Tab): void => {
    chrome.tabs.update(tab.id || -1, {
      active: true,
      highlighted: true,
    })
  }

  const handleTabSearch: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { value } = evt.target
    setSearchQuery(value)
    if (value.length) {
      const updatedArr = tabsList.filter((tab) => {
        return (
          tab.title?.toLowerCase().includes(value.toLowerCase()) ||
          tab.url?.includes(value.toLowerCase())
        )
      })
      setFilteredTabsList(updatedArr)
    }
  }

  const handleTabPin = (tab: chrome.tabs.Tab): void => {
    chrome.tabs.update(tab.id || -1, {
      pinned: !tab.pinned,
    })
  }

  const handleCopyUrl = (tab: chrome.tabs.Tab) => {
    navigator.clipboard.writeText(tab.url || '')
  }

  return (
    <div className="App">
      <h1 className="text-2xl font-mochiy  text-center text-transparent bg-clip-text bg-gradient-to-br from-[#1d4e83] to-[#1f4b7c] ">
        tabster
      </h1>

      <div className="px-4 pt-5 pb-2 sm:p-6 sm:pb-2">
        <div className="relative flex flex-wrap items-stretch w-full ">
          <span className="absolute z-10 flex items-center justify-center w-8 h-full pl-3 text-base font-normal leading-snug text-center bg-transparent rounded text-slate-400">
            <SearchSolidIcon />
          </span>
          <input
            type="text"
            placeholder="Search by tab name or url"
            onChange={handleTabSearch}
            value={searchQuery}
            className="relative block w-full py-3 pl-10 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
          />
        </div>
      </div>

      <div className="w-auto overflow-y-auto h-96">
        {searchQuery.length ? (
          filteredtabsList.length ? (
            filteredtabsList.map((tab, idx) => (
              <ListItem
                key={tab.id}
                tab={tab}
                favIconUrl={tab.favIconUrl}
                onCloseTab={() => handleCloseTabByID(tab.id || -1, idx)}
                onGotoTab={() => handleGotoTab(tab)}
                onTabPin={() => handleTabPin(tab)}
                onCopyUrl={() => handleCopyUrl(tab)}
              />
            ))
          ) : (
            <p className="text-sm font-semibold text-center text-gray-500/40 font-opensans">
              No tabs found
            </p>
          )
        ) : (
          tabsList.map((tab, idx) => (
            <ListItem
              key={tab.id}
              tab={tab}
              favIconUrl={tab.favIconUrl}
              onCloseTab={() => handleCloseTabByID(tab.id || -1, idx)}
              onGotoTab={() => handleGotoTab(tab)}
              onTabPin={() => handleTabPin(tab)}
              onCopyUrl={() => handleCopyUrl(tab)}
            />
          ))
        )}
      </div>
      <div className="fixed bg-white bottom-2 ">
        <div className="fixed left-[50%]  transform translate-x-[-50%]   bottom-2">
          <button
            onClick={() => handleCloseRestTabs()}
            className="px-4 py-2 font-semibold text-xs bg-[#271c6e] shadow-[#271c6e] text-white rounded-md shadow-sm"
          >
            Close rest tabs
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
