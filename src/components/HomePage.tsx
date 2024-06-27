import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()
  const [goToUserLogin, setGoToUserLogin] = React.useState(false);
    if(goToUserLogin){
        return <Navigate to="/UserLogin"/>
    }
  return (  
    <>
      <h1>Homepage</h1>
      <button onClick={() =>{setGoToUserLogin(true)}}>Go to User Login</button>
      <button onClick={()=>{
          navigate('/AdminLogin')
        }}>Admin Login</button>
        <br /><br />
    </>
  );
}

export default HomePage;
