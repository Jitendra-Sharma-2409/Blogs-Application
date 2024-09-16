import AsyncStorage from '@react-native-async-storage/async-storage'

// store the token and basic user info in cache
export async function setCache(token, firstName, lastName, phone) {
  try {
    await AsyncStorage.setItem('token', token)
    await AsyncStorage.setItem('firstName', firstName)
    await AsyncStorage.setItem('lastName', lastName)
    await AsyncStorage.setItem('phone', phone)
  } catch (ex) {
    console.error(ex)
  }
}

// get the cache properties (token etc)
export async function getCache() {
  try {
    const token = await AsyncStorage.getItem('token')
    const firstName = await AsyncStorage.getItem('firstName')
    const lastName = await AsyncStorage.getItem('lastName')
    const phone = await AsyncStorage.getItem('phone')
    return { token, firstName, lastName, phone }
  } catch (ex) {
    console.error(ex)
  }
}
