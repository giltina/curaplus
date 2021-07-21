import React, { Component } from 'react'
import { View, Button, TextInput, Text } from 'react-native'
import axios from 'axios'
import { NavigationContainer } from '@react-navigation/native'

export class Login extends Component {
    render() {
        return (
            <View>
                <Text>Login Page</Text>
                
                <Button title="Switch to Create" onPress={()=>
                this.props.navigation.navigate('Create')}>

                </Button>
            </View>
        )
    }
}

export default Login
