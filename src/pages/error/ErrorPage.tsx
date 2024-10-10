import React from 'react'
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
const navigate = useNavigate();

const goBack = () => {
    navigate("/");
}
  return (
    <>
    <div>404 not found</div>
    <button type="submit" onClick={()=> goBack()}>Go back</button>
    </>
  )
}

export default ErrorPage