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
    const {signup, currentUser} = useAuth()
    
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(currentUser)
    })

    const handleSubmit =  async (e)=> {
        e.preventDefault()

        if(passwordConfrimRef.current.value !== passwordRef.current.value){
            setErr('passwords do not match')
            return
        }
        try {
            setErr('')
            setLoading(true)
           await  signup(emailRef.current.value, passwordRef.current.value)

           navigate('/')
           
        } catch (error) {
            setErr('failed to create an account')
        }
       
        setLoading(false)
       
    }
  return (
    <>
     <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>SignUp</h2>
            {err && <Alert variant='danger'>{err}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required ></Form.Control>
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required></Form.Control>
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfrimRef} required></Form.Control>
                </Form.Group>
                <Button disabled={loading} className="w-100" type='submit'>SignUp</Button>
            </Form>
        </Card.Body>
     </Card>
     <div className='w-100 text-center mt-2'>
        Already have an account, <Link to='/login'>Login</Link>
     </div>
      
    </>
  )
}
