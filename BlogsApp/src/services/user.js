import axios from 'axios'
import { config } from '../config'

export async function login(email, password) {
  try {
    const body = {
      email,
      password,
    }

    const url = `${config.server}/user/signin`
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function register(firstName, lastName, email, password, phone) {
  try {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
    }

    const url = `${config.server}/user/signup`
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}
