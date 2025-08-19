import { utils, writeFile } from 'xlsx'

export const handleDownloadExcel = (data, name) => {
  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, name)

  const fileName = `${name}_${new Date().getFullYear()}.xlsx`
  writeFile(workbook, fileName)
}
