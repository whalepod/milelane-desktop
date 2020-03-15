import taskAPI from '@/modules/api/task.js'

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
    case 'focus':
      // focus対象の値を呼び出し元で使うため、returnする
      return callFocus(text)
    case 'unfocus':
      // unfocusはAPI呼び出しを伴わないので現時点では処理なし
      break
  }

  return null
}

const callAdd = async (text) => {
  // この正規表現は `/add task name under 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\s(.*?)\sunder\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 4) {
    return false
  }

  const title = matchedObject[2]
  const targetId = matchedObject[3]

  const result = await taskAPI.create(title)
  const task = result.data
  await taskAPI.moveToChild(task.id, targetId)
}

const callMove = async (text) => {
  // この正規表現は `/move 1 to root` のような正規表現にヒットする
  let matchedObject = text.match(/^\/move\s(\d+)\sto\sroot$/)

  // /move \d+ to root に該当する場合のみ、 taskAPI.moveToRoot を呼び出す分岐に入る
  if (matchedObject !== null && matchedObject.length === 2) {
    const targetId = matchedObject[1]

    await taskAPI.moveToRoot(targetId)
    return
  }

  // この正規表現は `/move 2 under 1` のような正規表現にヒットする
  matchedObject = text.match(/^\/move\s(\d+)\sunder\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = matchedObject[1]
  const parentId = matchedObject[2]

  await taskAPI.moveToChild(targetId, parentId)
}

const callLanize = async (text) => {
  // この正規表現は `/lanize 1` のような正規表現にヒットする
  const matchedObject = text.match(/^\/(.*?)\s(\d+)$/)

  // WANTFIX: getCommandNameに成功するが、上記正規表現に合致しなかった場合、
  // 以下の条件式ではエラーになってしまう。
  if (matchedObject.length !== 3) {
    return false
  }

  const targetId = matchedObject[2]

  await taskAPI.lanize(targetId)
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

/**
 * コマンドの種類を取得する
 * @return { String, false } 成功時にはコマンドの名称を、失敗時には false を返却する
 */
const getCommandName = (text) => {
  // コマンドのみで完結するものは完全一致判定をする
  if (text === '/unfocus') {
    return 'unfocus'
  }

  // この正規表現は `/add command body` の `/add ` にヒットする。
  const matchedObject = text.match(/^\/(.*?)\s/)
  if (matchedObject === null || matchedObject.length !== 2) {
    return false
  }

  const commandName = matchedObject[1]

  // 本来存在しないコマンドの場合も false を返す
  const reservedCommandNames = ['add', 'move', 'lanize', 'focus', 'unfocus']
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
  callFocus,
  getCommandName
}
