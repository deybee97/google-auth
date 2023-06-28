import React,{useEffect, useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'

export default function SignUp() {

    const [err,setErr] = useState('')
    const [loading,setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfrimRef = useRef()
    const {currentUser, changeEmail, changePassword} = useAuth()
    
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(currentUser)
    })

    const handleSubmit =   (e)=> {
        e.preventDefault()
        setErr('')
        setLoading(true)

        if(passwordConfrimRef.current.value !== passwordRef.current.value){
            setErr('passwords do not match')
            return
        }

        const promise = []

        if(currentUser.email !== emailRef.current.value){

            promise.push(changeEmail(emailRef.current.value))
        }

        if(passwordRef.current.value){

            promise.push(changePassword(passwordRef.current.value))
        }

        Promise.all(promise)
            .then((e)=>
            {
                 navigate('/')   
            })
            .catch((e)=> setErr('error updating profile'))
            .finally((()=>{
                setLoading(false)
            }))
   
    }

  return (
    <>
     <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Update Your Profile</h2>
            {err && <Alert variant='danger'>{err}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} placeholder='leave blank if you want password to remain unchanged' ></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfrimRef} placeholder='leave blank if you want password to remain unchanged' ></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type='submit'>Update Profiles</Button>
            </Form>
        </Card.Body>
     </Card>
     <div className='w-100 text-center mt-2'>
       <Link to='/'>back</Link>
     </div>
      
    </>
  )
}
