export const getSanitizedHeader = (header) => {
  return header.split('_').join(' ');
};

export const getSanitizedData = (data) => {
  if (data === 'unknown') return '???';

  return data;
};

export const sortTableData = (data, sortKey) => {
  return data.sort((a, b) => {
    let itemA = a?.[sortKey]?.toUpperCase();
    let itemB = b?.[sortKey]?.toUpperCase();
    let sortResult = 0;

    itemA = Number(itemA);
    itemB = Number(itemB);
    
    if (itemA < itemB) {
      sortResult = -1;
    } else if (itemA > itemB) {
      sortResult = 1;
    }

    return sortResult;
  }) 
};

export const isSortableHeader = (header) => {
  const headersWithNumbers = []; //['diameter', 'orbital_period', 'rotation_period'];

  return headersWithNumbers.includes(header);
};
