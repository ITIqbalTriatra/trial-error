import { useRef, useEffect } from 'react';
import TopLoadingBar from 'react-top-loading-bar';

const ProgressBar = () => {
  const loadingBar = useRef(null);

  useEffect(() => {
    // Simulate a loading process
    const simulateLoading = () => {
      if (loadingBar.current) {
        (loadingBar.current as any).continuousStart();
        setTimeout(() => {
          if (loadingBar.current) {
            (loadingBar.current as any).complete();
          }
        }, 1000);
      }
    };

    simulateLoading();
  }, []);

  return (
    <div>
      <TopLoadingBar color="#007bff" ref={loadingBar} />
    </div>
  );
};

export default ProgressBar;