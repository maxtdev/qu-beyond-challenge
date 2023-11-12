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
      <div>{`Page ${page + 1} of ${count / itemsPerPage}`}</div>
      <button className={`${prevButtonClasses} p-3 self-end`}>Prev</button>
      <button className={`${nextButtonClasses} p-3 self-end`}>Next</button>
    </div>
  );
};

export default Paginator;
