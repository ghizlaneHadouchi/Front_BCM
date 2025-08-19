import React from 'react'
import PropTypes from 'prop-types'

const Table = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  previousPage,
  canPreviousPage,
  pageIndex,
  pageOptions,
  nextPage,
  canNextPage,
}) => {
  return (
    <>
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th key={columnIndex}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row)
            return (
              <React.Fragment key={row.id || rowIndex}>
                {(() => {
                  const { key, ...rowProps } = row.getRowProps()
                  return (
                    <>
                      <tr key={key} {...rowProps}>
                        {row.cells.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    </>
                  )
                })()}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Précédent
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button onClick={nextPage} disabled={!canNextPage}>
          Suivant
        </button>
      </div>
    </>
  )
}

Table.propTypes = {
  getTableProps: PropTypes.func,
  headerGroups: PropTypes.array,
  getTableBodyProps: PropTypes.func,
  page: PropTypes.array,
  prepareRow: PropTypes.func,
  previousPage: PropTypes.func,
  canPreviousPage: PropTypes.bool,
  pageIndex: PropTypes.number,
  pageOptions: PropTypes.arrayOf(PropTypes.number),
  nextPage: PropTypes.func,
  canNextPage: PropTypes.bool,
}

export default Table
