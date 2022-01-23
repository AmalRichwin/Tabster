import { DOMMessage, DOMMessageResponse } from '../types'

const messagesFromReactAppListener = async (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  const currentTab = await chrome.tabs.getCurrent()
  const response: DOMMessageResponse = {
    currentTab,
  }

  sendResponse(response)
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener)
