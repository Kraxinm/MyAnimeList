function removeAnimeFromPrevList({animeToRender , item , dupedLists}){
  

 const  keys = []
  Object.values(dupedLists).forEach((currentList)=>{

   if(currentList.key !=='favourites'){
    currentList?.data?.forEach((currentAnime )=>{
       if(currentAnime?.id === animeToRender.id){
        keys.push(currentList.key)
    }
    })}
     if(item.item !=='favourites'){
        keys.forEach((forKey)=>{
 localStorage.setItem(
        forKey,
        JSON.stringify(
          dupedLists[forKey]?.data.filter(
            (filterItem) => filterItem.id !== animeToRender.id,
          ),
        ),
      );

      dupedLists[forKey] = {
        key: item.item,
        data: JSON.parse(localStorage.getItem(forKey)),
      };
        })}
    
 }) 
console.log(keys)
}

export default removeAnimeFromPrevList