import axios from 'axios'
import { config } from '../config'
import { getCache } from '../auth'

export async function getCategories() {
  try {
    // get the token
    const { token } = await getCache()

    const url = `${config.server}/category`
    const response = await axios.get(url, { headers: { token } })
    return response.data
  } catch (ex) {
    console.error(`exception: `, ex)
  }

  return null
}
