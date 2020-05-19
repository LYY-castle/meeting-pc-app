import { remote } from 'electron'
import isFunction from 'lodash.isfunction'

export function createChildWindow({
  title = '睿云会议',
  url = '',
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  resizable = false,
  movable = true,
  minimizable = false,
  maximizable = false,
  fullscreenable = false,
  modal = false,
  closeCB = () => {} // 关闭窗口回调函数.
}) {
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
    parent: remote.getCurrentWindow(),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  })

  newWin.loadURL(`${window.location.origin}/#${url}`)

  newWin.once('ready-to-show', () => {
    newWin.show()
  })

  newWin.on('closed', () => {
    isFunction(closeCB) && closeCB()
    newWin = null
  })
}
