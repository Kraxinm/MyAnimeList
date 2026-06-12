function removeAnimeFromPrevList({animeToRender , item , dupedLists}){
  

 let  keys = ''
  Object.values(dupedLists).forEach((currentList)=>{

    currentList?.data?.some((currentAnime )=>{
       if(currentAnime?.id === animeToRender.id){
   if(currentList.key !=='favourites' ){

        keys = currentList?.key }
    }
    })
     if(item.item !=='favourites' && keys){
        
 localStorage.setItem(
        keys,
        JSON.stringify(
          dupedLists[keys]?.data.filter(
            (filterItem) => filterItem.id !== animeToRender.id,
          ),
        ),
      );

      dupedLists[keys] = {
        key: item.item,
        data: JSON.parse(localStorage.getItem(keys)),
      };
        }
    
 }) 
console.log(keys)
keys = ''
}

export default removeAnimeFromPrevList