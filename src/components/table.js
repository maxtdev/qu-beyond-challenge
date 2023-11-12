import PlusSVG from '../assets/plus.svg';
import Paginator from './paginator';
import AnimateWrapper from './animate';
import { getSanitizedData, getSanitizedHeader } from './utils';
import { useState } from 'react';

const Table = ({ 
  count = 0,
  headers = [], 
  nextPage,
  prevPage,
  page,
  rows = [], 
  setOpenModal,
  setSelectedItem
}) => {
  const tableHeaderClasses = "border border-slate-400 text-left text-orange-500 capitalize px-2";
  const tableEvenRowsClasses = "bg-gray-200 hover:bg-gray-300";
  const [sortedRows, setSortedRows] = useState(rows);

  if (rows.length === 0) return null;
  
  const renderItem = (header, item) => {
    const tableDataClasses = "border border-slate-300 p-2 text-left flex-row";
    const handleMoreInfoClick = (item) => {
      setOpenModal(true);
      setSelectedItem(item)
    };
  
    let content = item[header];
  
    if (header === 'more_info') {
      content = (
        <button className="w-full h-full flex justify-center" onClick={() => handleMoreInfoClick(item)}>
          <img className="w-5 h-6" src={PlusSVG} alt="Add more" />
        </button>
      );
    }
  
    return (
      <td className={tableDataClasses}>
        {getSanitizedData(content)}
      </td>
    )
  };

  const handleSortButtonClick = async (header) => {
    const newRows = sortedRows.sort((a, b) => {
      let itemA = a?.[header]?.toUpperCase();
      let itemB = b?.[header]?.toUpperCase();
      let sortResult = 0;

      itemA = Number(itemA);
      itemB = Number(itemB);
      
      if (itemA < itemB) {
        sortResult = -1;
      } else if (itemA > itemB) {
        sortResult = 1;
      }

      return sortResult;
    });

    await setSortedRows(newRows);
  };

  const isSortableHeader = (header) => {
    const headersWithNumbers = ['diameter', 'orbital_period', 'rotation_period'];

    return headersWithNumbers.includes(header);
  };

  return (
    <AnimateWrapper delay={500}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={`${header}`} className={`${tableHeaderClasses}`}>
                {getSanitizedHeader(header)}
                {isSortableHeader(header) && (
                  <button className="pl-5" onClick={() => handleSortButtonClick(header)}>*</button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((item, index) => (
            <tr key={item.name} className={index % 2 === 0 ? tableEvenRowsClasses : 'hover:bg-gray-300'}>
              {headers.map((header) => renderItem(header, item))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator 
        count={count}
        page={page}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </AnimateWrapper>
  ); 
};

export default Table;
