import { useEffect, useState } from "react";

const useGetSetDB = (cardlist) => {
    const[state,setState] = useState([]);

    const fetchData = async () => {
        const data = await fetch("https://mtgmongodbserver.herokuapp.com/sets");
        const res = await data.json();        
        return res;
      };
      
      useEffect(()=>{
        fetchData().then(response => {setState(response)})
      },[cardlist])

  return state
}

export default useGetSetDB;