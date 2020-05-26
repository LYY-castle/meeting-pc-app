import { remote } from 'electron'
import isFunction from 'lodash.isfunction'

const isDevelopment = process.env.NODE_ENV === 'development'

export function createChildWindow({
  title = '睿云会议',
  url = '',
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  resizable = true,
  movable = true,
  minimizable = false,
  maximizable = false,
  fullscreenable = false,
  modal = false,
  closeCB = () => {} // 关闭窗口回调函数.
}) {
  const mainWin = remote.getCurrentWindow()
  let newWin = new remote.BrowserWindow({
    title,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    resizable,
    movable,
    minimizable,
    maximizable,
    fullscreenable,
    modal,
    parent: mainWin,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      devTools: isDevelopment ? true : false
    }
  })

  // eslint-disable-next-line no-undef
  newWin.loadURL(isDevelopment ? `${window.location.origin}/#${url}` : `app://./index.html/#${url}`)

  newWin.once('ready-to-show', () => {
    newWin.show()
  })

  newWin.on('closed', () => {
    isFunction(closeCB) && closeCB(mainWin)
    newWin = null
  })

  return newWin
}
