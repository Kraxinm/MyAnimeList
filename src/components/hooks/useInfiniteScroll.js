import { useEffect } from "react";

function useInfiniteScroll({senitalRef, isLoading, hasMore, setCurrentPage}) {
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading && hasMore) {
        setCurrentPage((prev) => prev + 1);
      }
    });
    
    if (senitalRef.current) {
      observer.observe(senitalRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasMore]);
}
export default useInfiniteScroll;
