// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import { db, auth } from '../firebaseconfig'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import styles from '../styles/Index.module.css'


export default function Home() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')

  const handleClickRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user.uid
        setUserId(user)
        console.log(user);
        // router.push('/notes');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
      });
  }



  const handleSigninClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user.uid
        console.log(user);
        router.push({
          pathname: '/notes',
          query: { uid: user },
        }, '/notes');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }



  return (
    
   
    
      <div>
        <title>Notes Application</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
     
      
      
      <div>
        <label htmlFor="user-email" style={{ paddingTop: "13px", fontFamily: "Raleway", fontSize: '11px' }}> &nbsp; Email</label>
        <input className = {styles.a} type="email" name="email" autoComplete="on" id="user-email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} required />
        <div className="form-border"></div>
        <label htmlFor="user-password" style={{ paddingTop: "22px", fontFamily: "Raleway", fontSize: '11px' }}>&nbsp; Password</label>
        <input id="user-password" className = {styles.a} type="password" name="password" onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
       
        

        {/* <label htmlFor="password">Password</label> <br /> */}
        <br></br>
        <br></br>

        <button onClick={handleSigninClick} className= {styles.b}>Sign in</button>

        <br />
        <br />
      </div>




      <button onClick={handleClickRegister} className={styles.b}>Register</button>
      
      {userId.length > 0 ? <p>Your user Id is {userId}</p> : <p></p>}
    </div>
    
  )
}
