export const getSanitizedHeader = (header) => {
  return header.split('_').join(' ');
};

export const getSanitizedData = (data) => {
  if (data === 'unknown') return '???';

  return data;
};
