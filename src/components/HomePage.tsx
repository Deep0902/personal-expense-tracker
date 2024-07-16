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
    <div className="background-image">
      <h1>Homepage</h1>
      <button onClick={() =>{setGoToUserLogin(true)}}>Go to User Login</button>
      <button onClick={()=>{
          navigate('/AdminLogin')
        }}>Admin Login</button>
        <br /><br />
      <button onClick={()=>{
          navigate('/DummyData')
        }}>Dummy Data Dsiplay</button>
      <button onClick={()=>{
          navigate('/LandingPage')
        }}>Landing Page</button>
        <br />
    </div>
      
    </>
  );
}

export default HomePage;
