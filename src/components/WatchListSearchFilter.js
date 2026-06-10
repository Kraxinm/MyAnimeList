function useWatchListSearch(watchList , watchListQuerry){
   return watchList.filter(
                  (item) =>
                    item.title.romaji
                      ?.toLowerCase()
                      .includes(watchListQuerry.toLocaleLowerCase()) ||
                    item.title?.english
                      ?.toLowerCase()
                      .includes(watchListQuerry.toLocaleLowerCase()),
                )
}
export default useWatchListSearch