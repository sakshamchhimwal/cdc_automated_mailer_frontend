import axios, { Axios, AxiosError } from "axios"
import { APIResponse, FormSchema } from "../utils/types"
import { LOGIN_URL } from "../utils/constants"


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


export {
  userLogin
}
