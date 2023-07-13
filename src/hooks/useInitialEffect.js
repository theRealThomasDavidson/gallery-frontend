import { useEffect, useRef } from 'react';

function useInitialEffect(callback, dependencies) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      // Run the effect only on initial mount
      callback();
      isInitialMount.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export default useInitialEffect;
