import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import CompatibilityBar from "@/components/CompatibilityPage/CompatibilitySelect/CompatibilityBar/CompatibilityBar.jsx";

const CompatibilitySelect = () => {

  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  let getData
  
  useEffect(() => {
    getData = async () => {
      try {
        setIsLoading(true)
        const result = await axiosInstance(`api/compatibility/select/`)
        setData(result.data)

        console.log(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }

    getData()

  }, []);

  if (isLoading) return <Spinner/>
  
  const testData = [...data, {...data[0], status: 'in_progress', seconds_left: 1000}]
    
  return (
    <div>            
      <ul>
        {
          // data.map((item, i)=> <CompatibilityBar key={i} data={item} />)          
          testData.map((item, i)=> <CompatibilityBar key={i} data={item} />)          
        }        
      </ul>
    </div>
  );
};

export default React.memo(CompatibilitySelect);