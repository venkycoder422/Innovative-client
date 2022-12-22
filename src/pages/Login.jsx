import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BackgroundImage } from '../components/BackgroundImg';
export default function Login() {

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleLogIn = async () => {
    // console.log(formValues)
    try {
      const { email, password } = formValues;

      await signInWithEmailAndPassword(firebaseAuth, email, password);
      NotificationManager.success("Login succesful!");
    } catch (error) {
      console.log(error);
      NotificationManager.error("Check credentials!");
    }
  }


  onAuthStateChanged(firebaseAuth, (currentUser) => {

    if (currentUser) {
      navigate('/');
    }

  })


  
  return (
    <Container>
      <BackgroundImage />
      <div className="Content">
        <div className='form-container flex column a-center j-center'>
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Log In</h3>
            </div>
            <div className="container flex column">
              <input type="email" placeholder='Email adress' name="email" value={formValues.email} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
              <input type="password" placeholder='Password' name="password" value={formValues.password} onChange={(e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })} />
              <button onClick={handleLogIn}>Login</button>
            </div>

          </div>

        </div>

      </div>

    </Container>
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
    border-radius:0.5rem;
    background-color:#faebd7;
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