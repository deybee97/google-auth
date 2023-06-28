import React, { useContext, useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword} from "firebase/auth"
import {auth} from '../firebase'

const AuthContext = React.createContext()


export function  useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser]= useState()
    const [loading, setLoading] = useState(true)

    const  signup =   (email, password) => {
        
        return createUserWithEmailAndPassword(auth,email, password)
    }

    const login = (email, password) => {
         
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = ()=> {
        return signOut(auth)
    }
    
    const resetPassword = (email) => {
         
        return  sendPasswordResetEmail(auth,email)
    }

    const changeEmail = (email) => {

        console.log(currentUser)
        return updateEmail(currentUser, email)
        // return currentUser.updateEmail(email)
    }

    const changePassword = (password) => {
        
        return updatePassword(currentUser, password)
      

    }

    useEffect(()=>{
        
        const unsubscriber = onAuthStateChanged(auth, (user)=>{
            console.log(user)
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscriber

    },[])



    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        changeEmail,
        changePassword

    }
  return (
   <AuthContext.Provider value={value}>
    { !loading && children}
   </AuthContext.Provider>
  )
}
