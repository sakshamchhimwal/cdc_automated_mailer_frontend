"use client"
import axios from "axios"
import { APIResponse } from "../utils/types"
import { SEND_MAIL, USER_MAILING_COMPANIES } from "../utils/urlConstants"

const getMailingList = async (): Promise<APIResponse> => {
  const AUTH_TOKEN = localStorage.getItem("CDC_USER_TOKEN")

  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  }

  try {
    const res = await axios.get(USER_MAILING_COMPANIES, config)
    return res.data
  } catch (err: any) {
    console.log(err.response.data)
    return err.response.data
  }
}

const sendMail = async (companyId: number, templateNumber: number): Promise<APIResponse> => {
  const AUTH_TOKEN = localStorage.getItem("CDC_USER_TOKEN")

  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  }

  const data = {
    CompanyId: companyId,
    TemplateNumber: templateNumber
  }

  try {
    const res = await axios.post(SEND_MAIL, data, config)
    return res.data
  } catch (err: any) {
    console.log(err.response.data)
    return err.response.data
  }
}

export {
  getMailingList,
  sendMail
}
