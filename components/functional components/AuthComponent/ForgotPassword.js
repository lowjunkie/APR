import * as React from "react";
import { useState, useEffect, useRef } from "react";

import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Dimensions,
    Linking
} from "react-native";
import { StackActions } from '@react-navigation/native';
import Lottie from 'lottie-react-native';

import { StatusBar } from "react-native";
import { COLORS, SIZES, FONTS, assets, CONST } from "../../../contants";
import { TextInput } from "@react-native-material/core";
import { RectButton, GSignInButton } from "../../ui components/Buttons";
import Toast from 'react-native-toast-message';
import axios from "axios";

const ForgotPassword = ({ navigation }) => {

    const [animSpeed, setAnimSpeed] = useState(false)
    const animRef = useRef()

    function playAnimation() {
        setAnimSpeed(true)
    }



    useEffect(() => {
        setTimeout(() => {
            animRef.current?.play();
        }, 100)
    }, [animSpeed])


    function pauseAnimation() {
        setAnimSpeed(false)
    }



    const [email, setEmail] = useState("")

    async function resetPassword(email) {

        const payload = {
            email_id: email,
        }

        console.log(payload);
        playAnimation()


        axios.post(`${CONST.baseUrlAuth}api/registrant/forgot/password`, payload).then((response) => {
            console.log(response.data)
            Toast.show({
                type: 'success',
                text1: 'Success'
            });
            pauseAnimation()
        }).catch((error) => {
            Toast.show({
                type: 'error',
                text1: error
            });
            pauseAnimation()
        })
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, alignItems: 'center', padding: 4 }}>
            <StatusBar
                background={COLORS.white}
                backgroundColor={COLORS.white}
                barStyle="dark-content"
                style={{ backgroundColor: COLORS.white, flex: 1 }}
            ></StatusBar>

            <View style={{
                width: '100%',
                height: 64,
                shadowColor: COLORS.homeCard,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2,
                backgroundColor: COLORS.white,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 16,

            }}>


                <TouchableOpacity
                    onPress={() => {

                        navigation.dispatch(StackActions.pop(1))
                    }}
                    style={{ position: 'absolute', left: 24, width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        style={{ width: 18, height: 18, alignSelf: 'flex-start', resizeMode: 'contain' }}
                        source={assets.leftArrow}
                    />

                </TouchableOpacity>

                <Text
                    style={{
                        textAlign: 'center',
                        alignSelf: 'center',
                        fontSize: SIZES.medium,
                        fontFamily: FONTS.semiBold,
                        color: COLORS.black,
                    }}
                >
                    Reset Password
                </Text>


            </View>



            <Text
                style={{
                    alignSelf: 'flex-start',
                    marginHorizontal: 24,
                    width: '90%',
                    marginTop: 28,
                    fontSize: SIZES.smallFont,
                    fontFamily: FONTS.regular,
                    color: COLORS.bankAccent,
                }}
            >
                Enter your email address to get the reset link
            </Text>


            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 18 }}>
                <TextInput value={email} onChangeText={(text) => { setEmail(text) }} variant="outlined" label="Email" style={{ marginHorizontal: 16, width: '90%' }} color={COLORS.blue} />
            </View>


            <RectButton text="Send Reset Link" position='absolute' bottom={60} onClick={() => { resetPassword(email) }} />

            <Toast
                position='bottom'
                bottomOffset={20}
            />

            {animSpeed &&
                <View style={{
                    shadowColor: COLORS.homeCard,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    elevation: 8,
                    zIndex: 5,
                    borderRadius: 16,
                    position: 'absolute', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.0)', alignSelf: 'center', padding: 24, top: '0'
                }}>

                    <Lottie source={require('../../../assets/loading.json')} autoPlay style={{ height: 100, width: 100, alignSelf: 'center' }} loop ref={animRef} speed={1} />
                </View>
            }

        </SafeAreaView>

    )
}

export default ForgotPassword;