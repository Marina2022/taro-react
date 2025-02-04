import React from 'react';
import {useParams} from "react-router-dom";

const CompatibilityResult = () => {
  
  const {id} = useParams()
  
  return (
    <div>
      CompatibilityResult, id = {id}
    </div>
  );
};

export default CompatibilityResult;