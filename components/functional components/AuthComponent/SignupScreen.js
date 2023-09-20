import * as React from "react";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, assets, CONST, } from "../../../contants";
// import { TextInput } from "@react-native-material/core";
import Toast from 'react-native-toast-message';
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
// import {Input} from "../../ui components";
import Input from "../../ui components/Input";
import { RectButton, GSignInButton } from "../../ui components/Buttons";

const SignUpScreen = ({ navigation, route }) => {


    const [isChecked, setChecked] = useState(false)

    const [passIcon, setPassIcon] = useState(false)
    const [visibility, setVisibility] = useState(false)
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        corpCode: null,
        number: ""
    })


    async function signup() {

        if(!isChecked){
            Toast.show({
                type: 'error',
                text1: 'Agree to Terms&Conditions',
                visibilityTime: 1000
            });
            return;
        }

        if (state.firstName.trim().length === 0 || state.lastName.trim().length === 0 || state.email.trim().length === 0 || state.password.trim().length === 0 || state.number.trim().length === 0) {
            Toast.show({
                type: 'error',
                text1: 'Missing Data',
                visibilityTime: 1000
            });
            return;
        }
        const payload = {
            "first_name": state.firstName,
            "middle_name": null,
            "last_name": state.lastName,
            "email_id": state.email,
            "password": state.password,
            "mobile_number": state.number
        }

        console.log(payload)
        try {
            axios.post(`${CONST.baseUrlAuth}api/registrant/signup`, payload).then(async (response) => {
                console.log(response.data)
                navigation.navigate("OTPScreen",{number: state.number, email: state.email})
            }).catch((err) => {
                console.log(err.response.data)
                Toast.show({
                    type: 'error',
                    text1: err.response.data
                });
            })

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data
            });
            throw error
        }
    }






    return (

        <View style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center' }}>
            <ScrollView contentContainerStyle={{ alignItems: 'center', alignItems: 'center', paddingBottom: 100 }}>



                <StatusBar
                    background={COLORS.white}
                    backgroundColor={COLORS.white}
                    barStyle="dark-content"
                    style={{ backgroundColor: COLORS.white, flex: 1 }}
                ></StatusBar>

                <Image
                    source={assets.authDecor}
                    style={{ width: '35%', resizeMode: 'cover', height: '20%', position: 'absolute', top: 0, right: 0 }}
                />

                <Image
                    source={assets.logo}
                    style={{ width: 280, marginTop: '25%', resizeMode: 'contain', height: 220, marginBottom: 12 }}
                />


                <Text
                    style={{
                        fontSize: SIZES.large,
                        fontFamily: FONTS.extraBold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 8
                    }}
                >
                    Sign Up
                </Text>

                <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', justifyContent: "space-between" }}>
                    <View style={{ alignSelf: 'flex-start', width: '48%' }}>
                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 14
                            }}
                        >
                            First Name
                        </Text>

                        <Input
                            placeholder="Enter Here"
                            onChangeText={(value) => setState(current=>({...current, firstName:value}))}
                            value={state.firstName}
                            placeholderTextColor={COLORS.lightGray}
                            inputprops={{width:"100%", alignSelf:'flex-start'}}

                        />

                    </View>

                    <View style={{ alignSelf: 'flex-start', width: '48%' }}>
                        <Text
                            style={{
                                fontSize: SIZES.medium,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginTop: 14
                            }}
                        >
                           Last Name
                        </Text>

                        <Input
                            placeholder="Enter Here"
                            onChangeText={(value) => setState(current=>({...current, lastName:value}))}
                            value={state.lastName}
                            placeholderTextColor={COLORS.lightGray}
                            inputprops={{width:"100%", alignSelf:'flex-start'}}

                        />

                    </View>

                    
                </View>

           
                <Text
                    style={{
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.bold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 14
                    }}
                >
                    Email
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setState(current=>({...current, email:value}))}
                    value={state.email}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

                />

                <Text
                    style={{
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.bold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 16
                    }}
                >
                    Password
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Input
                        placeholder="Enter Here"
                        onChangeText={(value) => setState(current=>({...current, password:value}))}
                        value={state.password}
                        placeholderTextColor={COLORS.lightGray}
                        inputprops={{ secureTextEntry: !visibility }}
                    />
                    {/* <TextInput value={pass} onChangeText={(text) => { setPass(text) }} secureTextEntry={!visibility} variant="outlined" label="Password" style={{ marginHorizontal: 16, width: '90%' }} color={COLORS.blue} /> */}
                    <TouchableOpacity
                        onPress={() => {
                            setVisibility(!visibility)
                            setPassIcon(!passIcon)
                        }}
                        style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32, position: 'absolute', right: 24, zIndex: 5 }}
                    >
                        <Feather name={passIcon ? 'eye-off' : 'eye'} size={24} color={COLORS.grey} />


                    </TouchableOpacity>
                </View>


                <Text
                    style={{
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.bold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 14
                    }}
                >
                    Corporate code <Text style={{ color: COLORS.grey }}>( optional)</Text>
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setState(current=>({...current, corpCode:value}))}
                    value={state.corpCode}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

                />

                <Text
                    style={{
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.bold,
                        color: COLORS.black,
                        width: '90%',
                        textAlign: 'left',
                        marginTop: 14
                    }}
                >
                    Phone Number
                </Text>

                <Input
                    placeholder="Enter Here"
                    onChangeText={(value) => setState(current=>({...current, number:value}))}
                    value={state.number}
                    placeholderTextColor={COLORS.lightGray}
                    inputStyle={{ marginTop: 8 }}

                />
                <View style={{ flexDirection: 'row', alignSelf: 'center', width: '90%', marginTop: 8, justifyContent: 'space-between' }}>

                    <BouncyCheckbox
                        size={25}
                        fillColor={COLORS.blue}
                        unfillColor={COLORS.grey}
                        iconStyle={{ borderColor: COLORS.grey }}
                        innerIconStyle={{ borderWidth: 2 }}
                        onPress={(isChecked) => { setChecked(isChecked) }}
                    />

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.medium,
                            color: COLORS.grey,
                            width: '90%',
                            textAlign: 'left',
                            marginTop: 14
                        }}
                    >
                        By sign up, you agree to APR marathon {`\n`}
                        <Text style={{ color: COLORS.blue, textDecorationLine: 'underline' }}>Terms and Conditions</Text> & <Text style={{ color: COLORS.blue, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                    </Text>

                </View>







                <RectButton marginTop={24} text="Sign Up" onClick={() => {
                    signup()

                }} />



                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SIZES.medium }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.regular,
                            color: COLORS.greenAccent,

                        }}
                    >
                        Already have an account?</Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: SIZES.medium,
                            fontFamily: FONTS.medium,
                            color: COLORS.blue,
                            marginStart: 8,
                            textDecorationLine: 'underline'

                        }}
                        onPress={() => {
                            navigation.navigate("LoginScreen")
                        }}
                    >
                        Login Now
                    </Text>



                </View>



                <Toast
                    position='bottom'
                    bottomOffset={20}
                />
            </ScrollView>

        </View>
    )
}

export default SignUpScreen;