"use client"
import React from 'react'


type ErrorType = {
    error : Error
} 
 
const error = ({error}: ErrorType) => {
  return (
    <div>{error.message}</div>
    // Even this will reach to formData.message 
  )
}

export default error