"use client"
import axios from "axios"
import { APIResponse } from "../utils/types"
import { USER_MAILING_COMPANIES, USER_UPDATE_TEMPLATE } from "../utils/urlConstants"


const getCompanyDetails = async (id: number): Promise<APIResponse> => {
  const AUTH_TOKEN = localStorage.getItem("CDC_USER_TOKEN")

  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  }

  try {
    const res = await axios.get(`${USER_MAILING_COMPANIES}/${id}`, config)
    return res.data
  } catch (err: any) {
    console.log(err.response.data)
    return err.response.data
  }
}

const updateTemplate = async (companyId: number, templateNumber: number, content: string) : Promise<APIResponse> => {
  const AUTH_TOKEN = localStorage.getItem("CDC_USER_TOKEN")

  const config = {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`
    }
  }

  const data = {
    CompanyId: companyId,
    TemplateNumber: templateNumber,
    TemplateContent: content
  }

  try {
    const res = await axios.patch(USER_UPDATE_TEMPLATE, data, config)
    return res.data
  } catch (err: any) {
    console.log(err.response.data)
    return err.response.data
  }

}

export {
  getCompanyDetails,
  updateTemplate
}
