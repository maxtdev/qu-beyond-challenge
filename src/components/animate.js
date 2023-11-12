import { useEffect, useState } from "react";

const AnimateWrapper = ({ children, delay = 100 }) => {
  const [loading, setLoading] = useState(true);
  const opacityClasses = loading ? 'opacity-0' : 'opacity-100';
  const transitionClasses = 'transition-all transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)';

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div className={`${transitionClasses} ${opacityClasses}`}>
      {children}
    </div>
  );
};

export default AnimateWrapper;
