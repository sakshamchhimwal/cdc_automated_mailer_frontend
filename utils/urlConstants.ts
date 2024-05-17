const BASE_URL = process.env.NEXT_PUBLIC_GO_SERVER_URL
const LOGIN_URL = BASE_URL + "/auth/login"
const PASSWORD_RESET_URL = BASE_URL + "/user/updatePassword"
const USER_MAILING_COMPANIES = BASE_URL + "/user/companies"
const USER_UPDATE_TEMPLATE = BASE_URL + "/user/updateTemplate"
const SEND_MAIL = BASE_URL + "/user/mail"

export {
  BASE_URL,
  LOGIN_URL,
  PASSWORD_RESET_URL,
  USER_MAILING_COMPANIES,
  USER_UPDATE_TEMPLATE,
  SEND_MAIL
}
