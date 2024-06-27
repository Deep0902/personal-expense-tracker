import { useNavigate } from "react-router-dom";

function UserLogin() {
  const navigate = useNavigate()

  return (
    <>
      <div>This is user Login</div>
      <button onClick={()=>{
        navigate('/personal-expense-tracker')
      }}>Go to homepage</button>
      <button onClick={()=>{
        navigate('/BasicAPI')
      }}>Go to BasicAPI</button>
    </>
  );
}

export default UserLogin;
