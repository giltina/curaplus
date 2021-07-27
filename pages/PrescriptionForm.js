import React, { useState } from 'react'
import { View, Picker, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Formik } from 'formik';
import { TextInput, Button, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import * as Yup from 'yup';



export default function PrescriptionForm() {

  const [upload, setUpload] = useState('');
  const [display, setDisplay] = useState('');
  const [isLoading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({

    name: Yup.string()
 
      .min(2, 'Too Short!')
 
      .max(50, 'Too Long!')
 
      .required('This field is required'),

      age: Yup.string()
 
      .required('This field is required'),

      phone: Yup.string()
 
      .required('This field is required'),

      address: Yup.string()
 
      .required('This field is required'),

      gender: Yup.string()
 
      .required('This field is required'),
 
    email: Yup.string().email('Invalid email').required('Required'),
 
  });

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.05,
      base64: true,
    });
    console.log(pickerResult.uri);
    setUpload(pickerResult.base64);
    setDisplay(pickerResult.uri);

  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.05,
      base64: true,
    });

    // Explore the result
    setUpload(result.base64);
    setDisplay(result.uri);

    if (!result.cancelled) {
      console.log(result.uri);
    }
  }

  return (


    <Formik

      initialValues={
        {
          name: '',
          address: '',
          age: '',
          phone: '',
          email: '',
          gender: '',
          checkbox221: '',
        }}

        validationSchema={SignupSchema}

      onSubmit={(values, onSubmitProps) => {
        console.log(values);

        var data = new FormData();
        data.append('yourname', values.name);
        data.append('age', values.age);
        data.append('email', values.email);
        data.append('phone', values.phone);
        data.append('address', values.address);
        data.append('menu340', values.gender);
        data.append('checkbox221', values.checkbox221);
        data.append('Upload', upload);
        setLoading(true);

        axios({
          method: 'post',
          url: 'https://curaplus.co.zw/wp-json/contact-form-7/v1/contact-forms/1609/feedback',
          data: data,
          headers: data.getHeaders,
        })
          .then(function (response) {
            //handle success
            console.log(response);
            setLoading(false);

            alert('Sent Successfully');
            self.state;
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });

        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
      }}

    >

      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <ScrollView>
        <View style={{ margin: 15 }}>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Send Prescription</Text>
          </View>


          <TextInput
            label="name"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            style={{ marginTop: 20 }}
            value={values.name}

          />
          <Text style={{color: 'red'}}>{touched.name && errors.name}</Text>

          <TextInput
            label="age"
            onChangeText={handleChange('age')}
            onBlur={handleBlur('age')}
            style={{ marginTop: 20 }}
            value={values.age}
            keyboardType={'numeric'}
          />
          <Text style={{color: 'red'}}>{touched.age && errors.age}</Text>

          <TextInput
            label="phone"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            style={{ marginTop: 20 }}
            value={values.phone}
            keyboardType={'phone-pad'}
          />
          <Text style={{color: 'red'}}>{touched.phone && errors.phone}</Text>

          <TextInput
            label="email"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            style={{ marginTop: 20 }}
            value={values.email}
            keyboardType={'email-address'}
          />
          <Text style={{color: 'red'}}>{touched.email && errors.email}</Text>

          <TextInput
            label="address"
            onChangeText={handleChange('address')}
            onBlur={handleBlur('addresss')}
            style={{ marginTop: 20 }}
            value={values.address}
          />
          <Text style={{color: 'red'}}>{touched.address && errors.address}</Text>

          <View style={{ marginTop: 30 }}>
            <Picker
              selectedValue={values.gender}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setFieldValue('gender', itemValue)} 
            >
              <Picker.Item label="Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
            <Text style={{color: 'red'}}>{touched.gender && errors.gender}</Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <RadioButton.Group
              onValueChange={handleChange('checkbox221')}
              value={values.checkbox221}

            >
              <View>
                <Text>Pack My Medication</Text>
                <RadioButton value='Pack My Meds'></RadioButton>
              </View>
              <View>
                <Text>Deliver My Medication</Text>
                <RadioButton value='Delivery'></RadioButton>
              </View>
            </RadioButton.Group>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>
              To share a photo prescription from your phone,select options below
      </Text>

            <Image
              source={{ uri: display }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <Button onPress={openImagePickerAsync} mode="outlined"> Open gallery</Button>
            <Button style={{ marginTop: 10 }} onPress={openCamera} mode="outlined">Open camera</Button>

          </View>





          <Button onPress={handleSubmit} title="Submit" />

          <Button style={{ marginTop: 20 }} loading={isLoading ? true : false} mode="contained" onPress={handleSubmit} >
            Submit</Button>




        </View>
        </ScrollView>

      )}

    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    flex: 1,
  },

  square: {
    backgroundColor: "#7cb48f",
    width: 100,
    height: 100,
  },

  redbox: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  bluebox: {
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  blackbox: {
    width: 100,
    height: 100,
    backgroundColor: 'black'
  },

});

