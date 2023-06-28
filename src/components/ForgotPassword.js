import React,{useEffect, useRef, useState} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import { Link, useNavigate} from 'react-router-dom'

export default function ForgotPassword() {

    const [err,setErr] = useState('')
    const [message, setMessage] = useState('')
    const [loading,setLoading] = useState(false)
    const emailRef = useRef()


    const {resetPassword} = useAuth()
    const navigate = useNavigate()



    const handleSubmit =  async (e)=> {
        e.preventDefault()
        setMessage('')
     
        try {
            setErr('')
            setLoading(true)
            await  resetPassword(emailRef.current.value)

            setMessage('password reset link has been sent to your email')
          
           
        } catch (error) {
            console.log(error)
            setErr('failed reset password')

        }
       
        setLoading(false)
       
    }
  return (
    <>
     <Card>
        <Card.Body>
            <h2 className='text-center mb-4'>Reset Password</h2>
            {err && <Alert variant='danger'>{err}</Alert>}
            {message && <Alert variant='danger'>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required ></Form.Control>
                </Form.Group>
           
                <Button disabled={loading} className="w-100" type='submit'>Reset Password</Button>
            </Form>
            <div className='w-100 text-center mt-3'>
                 <Link to='/login'>login</Link>
            </div>

        </Card.Body>
     </Card>
     <div className='w-100 text-center mt-2'>
        Dont have an account? <Link to='/signup'>Sign up</Link>
     </div>
      
    </>
  )
}
