const Paginator = ({
  count,
  itemsPerPage = 10,
  nextPage,
  page,
  prevPage,
}) => {
  const disabledClass = 'disabled:opacity-75';
  const prevButtonClasses = prevPage !== '' ? disabledClass : '';
  const nextButtonClasses = nextPage !== '' ? disabledClass : '';

  return (
    <div className="flex items-center w-full justify-end">
      <div>{`Page ${page} of ${count / itemsPerPage}`}</div>
      <button className={`${prevButtonClasses} p-3 self-end`} onClick={() => prevPage()}>Prev</button>
      <button className={`${nextButtonClasses} p-3 self-end`} onClick={() => nextPage()}>Next</button>
    </div>
  );
};

export default Paginator;
