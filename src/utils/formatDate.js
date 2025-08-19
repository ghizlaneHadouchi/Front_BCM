export const FormatDate = (date) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = String(newDate.getMonth() + 1).padStart(2, '0')
  const day = String(newDate.getDate()).padStart(2, '0')
  const isoDate = `${year}-${month}-${day}`
  return isoDate
}

export const formatDate = (input) => {
  if (!input || input === '-') return 'N/A'

  const year = String(input).slice(0, 4)

  return `${year}-T1`
}
