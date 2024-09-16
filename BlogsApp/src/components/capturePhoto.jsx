import { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native'
import { Appbar } from 'react-native-paper'
import { CameraView, useCameraPermissions } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import { addBlog } from '../services/blogs'

function CapturePhoto({ route, navigation }) {
  const [permission, requestPermission] = useCameraPermissions()
  const ref = useRef(null)

  // read the data sent by previous screen
  const { title, contents, selectedCategory } = route.params

  const onCapture = async () => {
    // capture the image from camera
    const photo = await ref.current.takePictureAsync()

    // convert the photo (image) into Base64 encoded string
    const data = await FileSystem.readAsStringAsync(photo.uri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    // send the data to the server
    const result = await addBlog(title, contents, selectedCategory, data)
    if (result['status'] == 'success') {
      ToastAndroid.show('Successfully added a blog', ToastAndroid.SHORT)
      navigation.navigate('MyBlogs')
    }
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.pop()
            }}
          />
          <Appbar.Content title='Capture Photo' />
        </Appbar.Header>

        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.pop()
          }}
        />
        <Appbar.Content title='Capture Photo' />
        <Appbar.Action onPress={onCapture} icon='camera' />
      </Appbar.Header>

      <CameraView style={styles.camera} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onCapture}>
            <Text style={styles.text}>Capture Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },

  camera: {
    flex: 1,
    backgroundColor: 'red',
  },

  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default CapturePhoto
