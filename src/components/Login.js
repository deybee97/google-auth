import React,{useEffect, useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import { Link, useNavigate} from 'react-router-dom'

export default function Login() {

    const [err,setErr] = useState('')
    const [loading,setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()

    const {login, currentUser} = useAuth()
    const navigate = useNavigate()



    const handleSubmit =  async (e)=> {
        e.preventDefault()

     
        try {
            setErr('')
            setLoading(true)
           await  login(emailRef.current.value, passwordRef.current.value)
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
            <h2 className='text-center mb-4'>login</h2>
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
                
                <Button disabled={loading} className="w-100" type='submit'>login</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
                 <Link to='/forgot-password'>Forgot password</Link>
            </div>

        </Card.Body>
     </Card>
     <div className='w-100 text-center mt-2'>
        Dont have an account? <Link to='/signup'>Sign up</Link>
     </div>
      
    </>
  )
}
