import React from 'react'
import {useAuth} from '../context/AuthContext'
import { Route, Navigate } from 'react-router-dom'

export default function PrivateRoute({ element: Element, ...rest }) {
    const { currentUser } = useAuth();
  
    return (
      <Route
        {...rest}
        element={props =>
          currentUser ? (
            <Element {...props} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    );
  }
