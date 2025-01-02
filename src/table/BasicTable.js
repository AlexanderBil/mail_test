import React from 'react'
import { useTable } from 'react-table';
import { v4 as uuidv4 } from 'uuid';

import './table.css'

export const BasicTable = ({
     data = [],
     columns = [],
}) => {


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns, //memo
    data //memo
  })


  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={uuidv4()} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={uuidv4()} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr key={uuidv4()} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td  {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}