import React, { Component } from 'react'
import { View, Picker, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import FormData from 'form-data'
import { TextInput, Button, RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';


export class Prescription extends Component {
  constructor(props) {
    super(props)

    this.state = {
      yourname: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      menu340: 'Select',
      checkbox221: '',
      isLoading: false,
      upload: '',
      display: ''

    }
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      quality: 0.1,
      base64: true,
    });
    console.log(pickerResult.uri);
    this.setState({ upload: pickerResult.base64 });
    this.setState({ display: pickerResult.uri });

  }

  openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
      base64: true,
    });

    // Explore the result
    this.setState({ upload: result.base64 });
    this.setState({ display: result.uri });

    if (!result.cancelled) {
      console.log(result.uri);
    }
  }


  submit() {
    var data = new FormData();
    data.append('yourname', this.state.yourname);
    data.append('age', this.state.age);
    data.append('email', this.state.email);
    data.append('phone', this.state.phone);
    data.append('address', this.state.address);
    data.append('menu340', this.state.menu340);
    data.append('checkbox281', this.state.checkbox281);
    data.append('checkbox221', this.state.checkbox221);
    data.append('Upload', this.state.upload);
    this.setState({ isLoading: true });



    var self = this;
    axios({
      method: 'post',
      url: 'https://curaplus.co.zw/wp-json/contact-form-7/v1/contact-forms/1609/feedback',
      data: data,
      headers: data.getHeaders,
    })
      .then(function (response) {
        //handle success
        console.log(response);
        self.setState({ isLoading: false });
       
        alert('Sent Successfully');
        self.state;
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });



  }

  render() {
    return (
      <ScrollView>
        <View style={{ margin: 10 }}>

          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Send Prescription</Text>
          </View>

          <TextInput
            label="name"
            onChangeText={(text) => { this.setState({ yourname: text }) }}
          />

          <TextInput
            label="age"
            onChangeText={(text) => { this.setState({ age: text }) }}
            style={{ marginTop: 20 }}
            keyboardType={'numeric'}
          />

          <TextInput
            label="phone"
            onChangeText={(text) => { this.setState({ phone: text }) }}
            style={{ marginTop: 20 }}
            keyboardType={'phone-pad'}
          />

          <TextInput
            label="email"
            onChangeText={(text) => { this.setState({ email: text }) }}
            style={{ marginTop: 20 }}
            keyboardType={'email-address'}
          />

          <TextInput
            label="address"
            onChangeText={(text) => { this.setState({ address: text }) }}
            style={{ marginTop: 20 }}
          />

          <View style={{ marginTop: 30 }}>
            <Text>Sex(Required)</Text>
            <Picker
              selectedValue={this.state.gender}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => { this.setState({ menu340: itemValue }) }}
            >
              <Picker.Item label={this.state.menu340} value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <View style={{ marginTop: 40 }}>
            <RadioButton.Group
              onValueChange={checkbox221 => this.setState({ checkbox221 })}
              value={this.state.checkbox221}
            >
              <View>
                <Text>Pack My Medication</Text>
                <RadioButton value="Pack My Meds" />
              </View>
              <View>
                <Text>Deliver My Medication</Text>
                <RadioButton value="Delivery" />
              </View>
            </RadioButton.Group>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text>
              To share a photo prescription from your phone,press the button below
      </Text>

            <Image
              source={{ uri: this.state.display }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <Button onPress={this.openImagePickerAsync} mode="outlined"> Open gallery</Button>
            <Button style={{ marginTop: 10 }} onPress={this.openCamera} mode="outlined">Open camera</Button>
          </View>



          <Button style={{ marginTop: 20 }} loading={this.state.isLoading ? true : false} mode="contained" onPress={() => { this.submit() }}>
            Submit</Button>


        </View>
      </ScrollView>
    )
  }
}


export default Prescription

