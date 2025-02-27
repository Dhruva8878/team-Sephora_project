import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import './login.css'
export const Login = () => {
  const [user, setUser] = useState([]);
  const [form123, setForm123] = useState("");
  const [emailer,setEmailer ] = useState("");
  const [pwd, setPwd] = useState("");
 
  const handleChange = (e) => {
  
    localStorage.setItem("user", JSON.stringify(e.target.value));
  };
  
  

  const handleSubmit = (e) => {
     if(emailer=="" ||pwd==""){
      alert("please fill required details")
      return
     }
     const users = JSON.parse(localStorage.getItem("allusers")) || [];
     const user = users.find((ele) => {
       if(ele.Email==emailer || ele.Num === emailer && ele.Password === pwd){
         return ele
        } 
      })
      if(user){
       alert("your otp is 12345")
       localStorage.setItem("emailverify", JSON.stringify(emailer));
        navigate('/otp')
     }
     else{
      alert("Wrong email id / mobile no or password")
     }

  };

  const navigate = useNavigate();

  const responseSuccessGoogle = (response) => {
    // console.log(response.profileObj.name);
    localStorage.setItem("user", JSON.stringify(response.profileObj.name));
    navigate("/");
  };

  const responseErrorGoogle = (response) => {
    // console.log(response);
  };
  const componentClicked = (response) => {
    // console.log(response);
  };

  const responseFacebook = (response) => {
    // console.log(response.name, response.email, response.picture.data.url);
    setUser(response.name, response.email, response.picture.data.url);
    localStorage.setItem("user", JSON.stringify(response.name));

    // localStorage.setItem("user", JSON.stringify(response.name));
    navigate("/");
  };
  useEffect(() => {
    // console.log("useState", user);
  }, [responseSuccessGoogle,responseFacebook]);

  const signup = () => {
    navigate('/signup')
  }
  return (
    <>
      <div className="forapper">
        
    <div className="adorm">
      <p style={{border:"0px",margin:"0px",padding:"5px",color:"rgb(255,51,153)",textAlign:"left"}}> <Link to={`/home`}>Back to Home</Link></p>
    <p className="trncs">LOGIN</p>
    <br />
    <p className="trncs">Enter your Phone / Email</p>
    <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
          <br />

          <input
            type="email"
            name="email"  
            value={emailer}         
            placeholder="Email or Phone Number"
            required
            onInput={(e)=>setEmailer(e.target.value)}
            
          />
          <input
            type="password"
            name="password"  
            value={pwd}         
            placeholder="Enter Password"
            required
            onInput={(e)=>setPwd(e.target.value)}
            style={{marginTop:'5px'}}
            
          />      
          <br />
          <div style={{
            display:'flex',
            textAlign:'center',
            justifyContent:'space-around',
            marginTop:'10px'

          }}><Button
            style={{
              backgroundColor: "rgb(255,51,153)",
              border: "none",
              width: "40%",
            }}
            color="primary"
            variant="contained"
            value="Submit"
            onClick={()=>{handleSubmit()}}
          >
            {" "}
            Continue{" "}
          </Button >
          <Button
            style={{
              backgroundColor: "rgb(255,51,153)",
              border: "none",
              width: "40%",
            }}
            color="primary"
            variant="contained"
            value="Submit"
            onClick={()=>{signup()}}
          >
            {" "}
            SignUp{" "}
          </Button ></div>
        </form>
        <p>-------- OR --------</p>
        <br></br>
        <p style={{ backgroundColor: "rgb(66,133,244)",margin:"auto", width:"80%", }}
><GoogleLogin 
                  
          clientId="783084545362-nbv5flob7ak19200jqvmr33fb3og95ri.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseErrorGoogle}
          expectcssClass="google-button"
          cookiePolicy={"single_host_origin"}
        /></p>
        <br></br>
        <FacebookLogin
          appId="397198822046839"
          autoLoad={false}
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          expectcssClass="facebook-button"
          icon="fa-facebook"
          textButton="Login with Facebook"
          style={{ backgroundColor: "rgb(25,118,210)" }}
        />
        <p>By proceeding, you agree to Privacy Policy, <span style={{ color: "rgb(255,51,153)" }} >Terms & Conditions</span></p>
    </div>
      </div>
    </>
  );
};
