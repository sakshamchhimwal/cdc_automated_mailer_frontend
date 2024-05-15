"use client"

import axios from "axios"
import { APIResponse, FormSchema } from "../utils/types"
import { LOGIN_URL, PASSWORD_RESET_URL } from "../utils/urlConstants"


const userLogin = async (userData: FormSchema): Promise<APIResponse> => {
  const data = {
    EmailAddress: userData.emailId,
    Password: userData.password
  }

  try {
    const res = await axios.post(LOGIN_URL, data)
    return res.data
  } catch (err: any) {
    console.log(err.response.data);
    return err.response.data
  }

}

const resetPassword = async (newPassword: string): Promise<APIResponse> => {
  const data = {
    "NewPassword": newPassword
  }

  const AUTH_TOKEN = localStorage.getItem("CDC_USER_TOKEN")

  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  }

  try {
    const res = await axios.post(PASSWORD_RESET_URL, data, config)
    return res.data
  } catch (err: any) {
    console.log(err.response.data)
    return err.response.data
  }

}


export {
  userLogin,
  resetPassword
}
