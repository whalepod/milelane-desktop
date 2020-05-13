import moment from 'moment'

const parse = (text) => {
  return moment(text)
}

const displayTime = (text) => {
  const matchedObject = text.match(/^\d{4}-\d{2}-\d{2}/)
  if (!matchedObject) {
    return 'invalid datetime'
  }
  return matchedObject[0]
}

export default {
  parse,
  displayTime
}
