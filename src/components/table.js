import PlusSVG from '../assets/plus.svg';
import Paginator from './paginator';
import AnimateWrapper from './animate';
import { getSanitizedData, getSanitizedHeader } from './utils';

const Table = ({ 
  count = 0,
  headers = [], 
  nextPage,
  page = 0,
  prevPage,
  rows = [], 
  setOpenModal,
  setSelectedItem
}) => {
  const tableHeaderClasses = "border border-slate-400 text-left text-orange-500 capitalize px-2";
  const tableEvenRowsClasses = "bg-gray-200 hover:bg-gray-300";

  if (rows.length === 0) return null;
  
  const renderItem = (header, item) => {
    const tableDataClasses = "border border-slate-300 p-2 text-left flex-row";
    const handleMoreInfoClick = (i) => {
      setOpenModal(true);
      setSelectedItem(i)
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
  
  return (
    <AnimateWrapper delay={500}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={`${header}`} className={`${tableHeaderClasses}`}>
                {getSanitizedHeader(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={item} className={index % 2 === 0 ? tableEvenRowsClasses : 'hover:bg-gray-300'}>
              {headers.map((header) => renderItem(header, item))}
            </tr>
          ))}
        </tbody>
      </table>
      <Paginator 
        page={page}
        count={count}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </AnimateWrapper>
  ); 
};

export default Table;
