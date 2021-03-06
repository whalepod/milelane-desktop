import store from '@/store/index.js'

const execute = async (text) => {
  const commandName = getCommandName(text)

  if (commandName === false) {
    return false
  }

  switch (commandName) {
    case 'add':
      await callAdd(text)
      break
    case 'move':
      await callMove(text)
      break
    case 'done':
      break
    case 'lanize':
      await callLanize(text)
      break
    case 'delanize':
      await callDelanize(text)
      break
    case 'schedule':
      callSchedule(text)
      break
    case 'focus':
      // focus対象の値を呼び出し元で使うため、returnする
      return callFocus(text)
    case 'unfocus':
      // unfocusはAPI呼び出しを伴わないので現時点では処理なし
      break
    case 'help':
      callHelp()
      break
  }

  return null
}

const callAdd = async (text) => {
  let title = ''

  // この正規表現は `/add task name under 1` のような正規表現にヒットする
  let matchedObject = text.match(/^\/(.*?)\s(.*?)\sunder\s(\d+)$/)
  if (!matchedObject) {
    // この正規表現は `/add task name` のような正規表現にヒットする
    matchedObject = text.match(/^\/(.*?)\s(.*?)$/)
  }

  // いずれの正規表現にも合致しなければ処理を終了する
  if (!matchedObject) {
    return false
  }

  title = matchedObject[2]
  await store.dispatch('tasks/create', { title })
  const state = store.state.tasks
  if (state.errors.length !== 0) {
    return false
  }

  const task = state.tasks[state.tasks.length - 1]

  // 親が指定されている場合にはその配下への移動を実行する
  if (matchedObject.length === 4) {
    const targetId = parseInt(matchedObject[3])
    await store.dispatch('tasks/moveToChild', { taskId: task.id, parentId: targetId })
  }

  // 「〜した」というtitleの場合には完了にする
  if (title.match(/.*?した$/)) {
    await store.dispatch('tasks/complete', { id: task.id })
  }
}

const callMove = async (text) => {
  // この正規表現は `/move 1 to root` のような正規表現にヒットする
  let matchedObject = text.match(/^\/move\s(\d+)\sto\sroot$/)

  // /move \d+ to root に該当する場合のみ、 taskAPI.moveToRoot を呼び出す分岐に入る
  if (matchedObject !== null && matchedObject.length === 2) {
    const targetId = parseInt(matchedObject[1])

    await store.dispatch('tasks/moveToRoot', { id: targetId })
    return
  }

  // この正規表現は `/move 2 under 1` のような正規表現にヒットする
  matchedObject = text.match(/^\/move\s(\d+)\sunder\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = parseInt(matchedObject[1])
  const parentId = parseInt(matchedObject[2])

  store.dispatch('tasks/moveToChild', { taskId: targetId, parentId })
}

const callSchedule = async (text) => {
  // この正規表現は `/schedule 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = parseInt(matchedObject[2])

  store.dispatch('tasks/schedule', { id: targetId })
}

const callLanize = async (text) => {
  // この正規表現は `/lanize 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = parseInt(matchedObject[2])

  store.dispatch('tasks/lanize', { id: targetId })
}

const callDelanize = async (text) => {
  // この正規表現は `/delanize 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = parseInt(matchedObject[2])

  store.dispatch('tasks/delanize', { id: targetId })
}

const callFocus = (text) => {
  // この正規表現は、 `/focus on 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\son\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = matchedObject[2]

  return targetId
}

const callHelp = () => {
  store.dispatch('modal/openHelp')
}

/**
 * コマンドの種類を取得する
 * @return { String, false } 成功時にはコマンドの名称を、失敗時には false を返却する
 */
const getCommandName = (text) => {
  // コマンドのみで完結するものは完全一致判定をする
  if (text === '/unfocus') {
    return 'unfocus'
  }
  if (text === '/help') {
    return 'help'
  }

  // この正規表現は `/add command body` の `/add ` にヒットする。
  const matchedObject = text.match(/^\/(.*?)\s/)
  if (matchedObject === null || matchedObject.length !== 2) {
    return false
  }

  const commandName = matchedObject[1]

  // 本来存在しないコマンドの場合も false を返す
  const reservedCommandNames = ['add', 'move', 'lanize', 'delanize', 'schedule', 'focus', 'unfocus']
  if (!reservedCommandNames.includes(commandName)) {
    return false
  }

  return commandName
}

export default {
  execute,
  callAdd,
  callMove,
  callLanize,
  callSchedule,
  callFocus,
  getCommandName
}
