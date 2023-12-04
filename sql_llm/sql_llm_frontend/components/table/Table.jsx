import React, { useState } from 'react';
import clsx from 'clsx';

const Table = ({ mode }) => {
  const data = {
    headers: [
      'Category',
      'Expense',
      'Date',
    ],
    rows: [
      ['Entertainment', '50', '2023-07-01'],
      ['Travel', '120', '2023-07-02'],
      ['Dining', '80', '2023-07-03'],
      ['Misc', '30', '2023-07-04'],
      ['Investment', '200', '2023-07-05'],
      ['Insurance', '150', '2023-07-06'],
    ],
  };

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const tableColor = clsx({
    'min-w-1/5': true,
    'w-3/5': true,
    'bg-gray-500': mode,
    'bg-gray-300': !mode,
    'rounded-lg': true,
  });

  const sortTable = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedRows = [...data.rows].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[data.headers.indexOf(sortConfig.key)] > b[data.headers.indexOf(sortConfig.key)] ? 1 : -1;
    } else if (sortConfig.direction === 'desc') {
      return a[data.headers.indexOf(sortConfig.key)] < b[data.headers.indexOf(sortConfig.key)] ? 1 : -1;
    }
    return 0;
  });

  return (
    <table className={tableColor}>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th
            key={index}
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer bg-gray-700 text-white"
            onClick={() => sortTable(header)}
          >
            {header}
            {sortConfig.key === header && (
              <span className="ml-1">
                {sortConfig.direction === 'asc' ? '▲' : '▼'}
              </span>
            )}
          </th>
          ))}
        </tr>
      </thead>
      <tbody className=" ">
        {sortedRows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-6 py-2 whitespace-nowrap text-sm"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
