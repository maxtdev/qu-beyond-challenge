interface IPaginatorProps {
  count: number,
  className?: string;
  isTransitioning?: boolean;
  itemsPerPage?: number;
  nextPage: () => void;
  page: number;
  prevPage: () => void;
};

const Paginator: React.FC<IPaginatorProps> = ({
  count,
  isTransitioning,
  itemsPerPage = 10,
  nextPage,
  page,
  prevPage,
}) => {
  const disabledClass = 'bg-opacity-25';
  const buttonClasses = `p-2 self-end bg-indigo-500 rounded ml-3 text-white font-bold ${isTransitioning && 'pointer-events-none bg-opacity-25'}`;
  const prevButtonClass = page > 1 ? '' : disabledClass;
  const nextButtonClass = page < count / itemsPerPage ? '' : disabledClass;

  return (
    <div className="flex items-center w-full justify-end mt-3">
      <div data-testid="paginator-label">{`Page ${page} of ${count / itemsPerPage}`}</div>
      <button 
        className={`${prevButtonClass} ${buttonClasses} `} 
        onClick={() => prevPage()}>
          Previous
      </button>
      <button 
        className={`${nextButtonClass} ${buttonClasses}`} 
        onClick={() => nextPage()}>
          Next
      </button>
    </div>
  );
};

export default Paginator;
