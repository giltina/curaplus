import React, { Component } from 'react'
import { View } from 'react-native'
import axios from 'axios'
import FormData from 'form-data'
import { TextInput, Button } from 'react-native-paper';

export class Create extends Component {

    constructor(props) {
        super(props)

        this.state = {
            yourname: '',
            email: '',
            subject: '',
            message: '',
            isLoading: false

        }
    }

    submit() {
        var data = new FormData();
        data.append('yourname', this.state.yourname);
        data.append('email', this.state.email);
        data.append('subject', this.state.subject);
        data.append('message', this.state.message);
        this.setState({ isLoading: true });
        this.setState({ yourname: '' });
            this.setState({ email: '' });
            this.setState({ subject: '' });
            this.setState({ message: '' });


        var self = this;
        axios({
            method: 'post',
            url: 'https://curaplus.co.zw/wp-json/contact-form-7/v1/contact-forms/108/feedback',
            data: data,
            headers: data.getHeaders,
        })
            .then(function (response) {
                //handle success
                console.log(response);
                self.setState({ isLoading: false });
               
                alert('Sent Successfully');
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

            


    }

    render() {
        return (
            <View style={{ margin: 10 }}>
                <TextInput
                    label="name"
                    onChangeText={(text) => { this.setState({ yourname: text }) }}
                />

                <TextInput
                    label="email"
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    style={{ marginTop: 20 }}
                />

                <TextInput
                    label="subject"
                    onChangeText={(text) => { this.setState({ subject: text }) }}
                    style={{ marginTop: 20 }}
                />

                <TextInput
                    label="enter message"
                    onChangeText={(text) => { this.setState({ message: text }) }}
                    style={{ marginTop: 20 }}
                />



                <Button style={{ marginTop: 20 }} loading={this.state.isLoading ? true : false} mode="contained" onPress={() => { this.submit() }}>
                Submit
  </Button>


            </View>
        )
    }
}


export default Create
