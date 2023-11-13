export const getSanitizedHeader = (header) => {
  return header.split('_').join(' ');
};

export const getSanitizedData = (data) => {
  if (data === 'unknown') return '???';

  return data;
};

export const sortByNumberColumn = (data, sortKey) => {
  return data.sort((a, b) => {
    let itemA = a?.[sortKey];
    let itemB = b?.[sortKey];
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

export const sortByStringColumn = (data, sortKey) => {
  return data.sort((a, b) => {
    const itemA = a?.[sortKey];
    const itemB = b?.[sortKey];
    let result = 0;

    if (itemA > itemB) {
      result = 1;
    } else if (itemA < itemB) {
      result = -1;
    }

    return result;
  });
};

export const isSortableHeader = (header) => {
  const headersWithNumbers = ['rotation_period', 'name'];

  return headersWithNumbers.includes(header);
};
