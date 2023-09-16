import React from 'react'
import axios from 'axios'
import { login } from './apis/user'

async function doLogin(tableNo){
    let loginRes = await login(tableNo);
    console.log(loginRes)
}

async function Login() {
    const searchParams = new URLSearchParams(document.location.search)
    const tableNo = searchParams.get('tableNo');

    doLogin(tableNo);
    // doLogin(tableNo);

  return (
    <div>{searchParams.get('tableNo')}</div>
  )
}

export default Login