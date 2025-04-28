import { useState } from "react";
import SkeletonLoader from "../../components/skeleton/SkeletonLoader";

const Test = ()=>{

 const [isPending , setIsPending] = useState(true)

  return(
    <>
    {isPending ? <SkeletonLoader /> : 'no'}
    <button
    
    onClick={()=> setIsPending(!isPending)}

    >click</button>
    </>
  )
}

export default Test;