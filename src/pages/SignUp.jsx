
import React, { useState } from 'react'
import styled from 'styled-components'
import { firebaseAuth } from '../utils/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { BackgroundImage } from '../components/BackgroundImg';
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const handleSignIn = async () => {
    console.log(formValues)
    try {
      const { email, password } = formValues;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
      NotificationManager.succes("Sign Up succesful !!")
    } catch (error) {
      alert(error);
    }
  }

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/login');
  })

  return (
    <>
      <BackgroundImage />
      <Container>

        <div className="Content">
          <div className="form-container flex column a-center j-center">
            <div className='form flex column a-center j-center'>
            <div className="title">
              <h3>Sign Up</h3>
            </div>
              <div className="container flex column">
                <input type="email" placeholder='Email adress' name="email" value={formValues.email} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
                <input type="password" placeholder='Password' name="password" value={formValues.password} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
                <button onClick={handleSignIn}>Sign Up</button>
              </div>
             
                
             
            </div>
            </div>
          </div>
          <NotificationContainer />
      </Container>
    </>
  )
}


const Container = styled.div`
position:relative;
.Content{
  position:absolute;
  top:0;
  left:0;
  background-color:rgba(0,0,0,0.5);
  height:100vh;
  width:100vw;
  display:grid;
  grid-template-rows:15vh 85vh;
}
.form-container{
  gap:2rem;
  height:85vh;
  .form{
  padding:2rem;
  background-color:#faebd7;
  border-radius:0.5rem;
  width:25vw;
  gap:2rem;
  color:black;
  .container{
  display: flex;
  gap: 2rem; 
  flex-direction: column;
    gap:2rem;
    input{
      padding:0.5rem 1rem;
    }
    input:focus{
      outline:2px solid #1976d2;
      border-radius:0.1rem;
    }
    button{
    padding:0.5rem 1rem;
    background-color:#1976d2;
    border:none;
    cursor:pointer;
    border-radius:0.2rem;
    font-weight:bolder;
    font-size:1.05rem;
    }
  }
  }
}

.form{
  flex-direction: column;
  display: flex;
}
`
