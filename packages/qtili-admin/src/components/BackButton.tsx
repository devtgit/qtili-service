import React from 'react'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { Button } from 'react-admin'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <Button
      label="Back"
      onClick={() => {
        navigate(-1)
      }}
    >
      <ChevronLeft />
    </Button>
  )
}
