import AnimateWrapper from './animate';

const Title = ({ children }) => {
  const titleClasses = "transition-opacity delay-500 text-xl mb-6 text-red-500 font-bold";

  return (
    <AnimateWrapper>
      <div className={titleClasses}>{children}</div>
    </AnimateWrapper>
  );
};

export default Title;
