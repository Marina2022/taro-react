import React from 'react';
import {useLocation} from "react-router-dom";

const MessagesPage = () => {

  const location = useLocation()
  console.log(location.state)
  
  return (
    <div>
      MessagesPage
    </div>
  );
};

export default MessagesPage;