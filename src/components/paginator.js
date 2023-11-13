const Paginator = ({
  count,
  itemsPerPage = 10,
  nextPage,
  page,
  prevPage,
}) => {
  const disabledClass = 'text-gray-400';
  const enableClass = 'text-black font-bold';

  return (
    <div className="flex items-center w-full justify-end">
      <div>{`Page ${page} of ${count / itemsPerPage}`}</div>
      <button 
        className={`p-3 self-end ${page > 1 ? enableClass : disabledClass}`} 
        onClick={() => prevPage()}>
          Prev
      </button>
      <button 
        className={`p-3 self-end ${page < count / itemsPerPage ? enableClass : disabledClass}`} 
        onClick={() => nextPage()}>
          Next
      </button>
    </div>
  );
};

export default Paginator;
