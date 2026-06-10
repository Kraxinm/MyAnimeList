import { useEffect } from "react";

function useRefetch({currentPage , setIsLoading , setErrMsg , handleFetch}){
    useEffect(() => {
    if (currentPage === 1) return;
    setErrMsg(undefined);

    setIsLoading(true);
    handleFetch(currentPage);
  }, [currentPage]);
}
export default useRefetch