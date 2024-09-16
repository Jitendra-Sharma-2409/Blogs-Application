import axios from 'axios'
import { config } from '../config'
import { getCache } from '../auth'

export async function getPublicBlogs() {
  try {
    // get the token
    const { token } = await getCache()

    const url = `${config.server}/blog`
    const response = await axios.get(url, { headers: { token } })
    return response.data
  } catch (ex) {
    console.error(`exception: `, ex)
  }

  return null
}

export async function getMyBlogs() {
  try {
    // get the token
    const { token } = await getCache()

    const url = `${config.server}/blog/me`
    const response = await axios.get(url, { headers: { token } })
    return response.data
  } catch (ex) {
    console.error(`exception: `, ex)
  }

  return null
}

export async function toggleBlogPublicStatus(blogId, status) {
  try {
    // get the token
    const { token } = await getCache()

    const url = `${config.server}/blog/public-status/${blogId}/${
      status ? 1 : 0
    }`
    const response = await axios.patch(url, {}, { headers: { token } })
    return response.data
  } catch (ex) {
    console.error(`exception: `, ex)
  }

  return null
}

export async function addBlog(title, contents, categoryId, image) {
  try {
    // get the token
    const { token } = await getCache()

    // create the body
    const body = { title, contents, categoryId, image }

    const url = `${config.server}/blog/add-blog`
    const response = await axios.post(url, body, { headers: { token } })
    return response.data
  } catch (ex) {
    console.error(`exception: `, ex)
  }

  return null
}
