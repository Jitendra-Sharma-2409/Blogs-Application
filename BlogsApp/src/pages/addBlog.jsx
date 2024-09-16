import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Appbar, TextInput, Button } from 'react-native-paper'
import { getCategories } from '../services/category'
import { Picker } from '@react-native-picker/picker'

// functional component
function AddBlog({ navigation }) {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()

  const loadCategories = async () => {
    const result = await getCategories()
    if (result['status'] == 'success') {
      setSelectedCategory(result['data']['id'])
      setCategories(result['data'])
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const onCapturePhoto = () => {
    if (title.length == 0) {
      ToastAndroid.show('please enter title', ToastAndroid.SHORT)
    } else if (contents.length == 0) {
      ToastAndroid.show('please enter contents', ToastAndroid.SHORT)
    } else {
      // send the values to the camera screen
      navigation.navigate('Camera', {
        title,
        contents,
        selectedCategory,
      })
    }
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.pop()
          }}
        />
        <Appbar.Content title='Add Blog' />
      </Appbar.Header>

      <View style={{ padding: 16, gap: 10 }}>
        <TextInput
          mode='outlined'
          label='Title'
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          mode='outlined'
          label='Contents'
          numberOfLines={10}
          multiline={true}
          onChangeText={(text) => setContents(text)}
        />

        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value)
          }}
        >
          {categories.map((category) => {
            return <Picker.Item value={category.id} label={category.title} />
          })}
        </Picker>

        <Button
          onPress={onCapturePhoto}
          style={{ marginTop: 20 }}
          mode='contained'
        >
          Capture Photo
        </Button>
      </View>
    </View>
  )
}

// define the styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
  },
  camera: {
    height: 300,
  },
})

export default AddBlog
