export type DOMMessage = {
  type: 'GET_CURRENT_TAB'
}

export type DOMMessageResponse = {
  currentTab: chrome.tabs.Tab
}
