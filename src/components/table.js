import { useState } from 'react';
import AnimateWrapper from './animate';
import Paginator from './paginator';
import PlusSVG from '../assets/plus.svg';
import { 
  getSanitizedData, 
  getSanitizedHeader, 
  isSortableHeader, 
  sortByNumberColumn, 
  sortByStringColumn,
} from './utils';

const Table = ({ 
  count,
  results = [],
  headers = [], 
  isLoading,
  nextPage,
  page,
  prevPage,
  setOpenModal,
  setSelectedItem,
}) => {
  const tableHeaderClasses = "border border-slate-400 text-left text-orange-500 capitalize px-2";
  const tableEvenRowsClasses = "bg-gray-200 hover:bg-gray-300";
  const [sortedData, setSortedData] = useState(results);
  const [isSorting, setIsSorting] = useState(false)
  const [random, setRandom] = useState(Math.random());

  if (results.length === 0) return null;
  
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

  const handleSortButtonClick = (header) => {
    let newData;

    setIsSorting(true);

    if (header === 'rotation_period') {
      newData = sortByNumberColumn(sortedData, header);
    } else if (header === 'name') {
      newData = sortByStringColumn(sortedData, header);
    }

    setSortedData(newData);
    setRandom(Math.random());
    setIsSorting(false);
  };

  return (
    <AnimateWrapper delay={200}>
      <table className={`${(isLoading || isSorting) ? 'animate-pulse' : ''}`}>
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
          {sortedData.map((item, index) => (
            <tr key={`${item.name}${random}`} className={index % 2 === 0 ? tableEvenRowsClasses : 'hover:bg-gray-300'}>
              {headers.map((header) => renderItem(header, item))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator 
        count={count}
        isTransitioning={isLoading}
        nextPage={nextPage}
        page={page}
        prevPage={prevPage}
      />
    </AnimateWrapper>
  ); 
};

export default Table;
