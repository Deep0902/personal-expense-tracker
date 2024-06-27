import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate()
  const [goToUserLogin, setGoToUserLogin] = React.useState(false);
    if(goToUserLogin){
        return <Navigate to="personal-expense-tracker/UserLogin"/>
    }
  return (  
    <>
      <h1>Homepage</h1>
      <button onClick={() =>{setGoToUserLogin(true)}}>Go to User Login</button>
      <button onClick={()=>{
          navigate('personal-expense-tracker/AdminLogin')
        }}>Admin Login</button>
        <br /><br />
    </>
  );
}

export default HomePage;
