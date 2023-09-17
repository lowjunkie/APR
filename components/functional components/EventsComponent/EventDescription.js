import { StatusBar } from 'expo-status-bar';
import { assets, SIZES, COLORS, FONTS, CONST } from '../../../contants';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { RectButton } from '../../ui components/Buttons';
import axios from 'axios';

const EventDescription = ({ route, navigation }) => {
    const data = route.params

    async function joinNow(){
        axios.post(`${CONST.baseUrlRegister}api/registration/registration/data`,{
            registrant_id: 3,
            registrant_type_id: data.type_id
        }).then((response)=>{
            console.log(response.data)
            navigation.navigate("AddRegistrant", response.data)

        }).catch((err)=>{
            console.log(err.response.data)
        })
    }

    const monthMap = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const _eventDate = new Date(data.event_info.event_date)
    const eventDate = _eventDate.getDay() + ", " + monthMap[_eventDate.getMonth()] + " " + _eventDate.getDay() + " " + _eventDate.getFullYear() + " | at " + data.event_info.event_time.substring(0, 5)

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
            <StatusBar
                background={COLORS.blue}
                backgroundColor={COLORS.blue}
                barStyle="light-content"
                style={{ backgroundColor: COLORS.blue, flex: 1 }}
            ></StatusBar>
            <View style={{ height: '12%', width: '100%', backgroundColor: COLORS.blue, justifyContent: 'flex-end', alignItems: 'center' }}>
                <Text
                    style={{
                        fontSize: SIZES.large,
                        fontFamily: FONTS.bold,
                        color: COLORS.white,
                        textAlign: 'center',
                        marginBottom: 12
                    }}
                >
                    Event Description
                </Text>
            </View>

            <ScrollView contentContainerStyle={{ minHeight: '100%', paddingBottom: 150 }}>


                <View style={{ width: '95%', padding: 8, borderRadius: 16, borderWidth: 1, borderColor: '#D9D9D9', alignSelf: 'center', marginTop: 16, alignItems: 'center', height: '30%', justifyContent: 'space-evenly' }}>
                    <Image source={{ uri: data.image_url }} style={{ width: '100%', borderRadius: 8, height: '50%', resizeMode: 'cover' }} />
                    <Text
                        style={{
                            fontSize: SIZES.large,
                            fontFamily: FONTS.semiBold,
                            color: COLORS.black,
                            textAlign: 'center',
                            marginTop: 4
                        }}
                    >
                        {data.type_name}
                    </Text>


                    <View style={{ flexDirection: 'row', alignSelf: 'center', width: '95%', marginTop: 4 }}>
                        <AntDesign name="clockcircle" size={18} color="blue" />
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginLeft: 8,
                            }}
                        >
                            {eventDate}
                        </Text>
                    </View>


                    <View style={{ flexDirection: 'row', alignSelf: 'center', width: '96%', marginTop: 6 }}>
                        <Ionicons name="location-sharp" size={24} color="blue" />
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginLeft: 8,
                            }}
                        >
                            {data.event_info.event_location}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center', marginTop: 24, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 0 }} />
                    <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 24, zIndex: 2 }} />
                    <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 48, zIndex: 3 }} />
                    <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 72, zIndex: 4 }} />
                    <Image source={assets.profile} style={{ width: 42, height: 42, resizeMode: 'cover', borderWidth: 3, borderColor: 'white', borderRadius: 32, position: 'absolute', left: 96, zIndex: 5 }} />
                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.semiBold,
                            color: COLORS.black,
                            textAlign: 'right',
                            alignSelf: 'center'
                        }}
                    >
                        {data.registrant_count.registrant_count}+ people are interested
                    </Text>
                </View>

                <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', marginTop: 16 }}>
                    <View>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'left',
                                marginBottom: 4
                            }}
                        >
                            Race
                        </Text>
                        {data.race_timing.map((ele, inx) => {
                            return (
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'left',
                                        marginTop: 6
                                    }}
                                >
                                    {data.raceCategories[ele.race_type_id_ref]} - {data.ageCategories[ele.age_type_id_ref]} Years
                                </Text>
                            )
                        })}
                    </View>

                    <View>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.bold,
                                color: COLORS.black,
                                textAlign: 'right',
                                marginBottom: 4

                            }}
                        >
                            Time
                        </Text>
                        {data.race_timing.map((ele, inx) => {
                            return (
                                <Text
                                    style={{
                                        fontSize: SIZES.font,
                                        fontFamily: FONTS.semiBold,
                                        color: COLORS.black,
                                        textAlign: 'right',
                                        marginTop: 6
                                    }}
                                >
                                    {ele.race_time.substring(0, 5)}
                                </Text>
                            )
                        })}
                    </View>



                </View>
                <View style={{ width: '90%', alignSelf: 'center' }}>
                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.bold,
                            color: COLORS.black,
                            textAlign: 'left',
                            marginTop: 12,

                        }}
                    >
                        Spot Registrations
                    </Text>

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.regular,
                            color: COLORS.black,
                            textAlign: 'left',
                            marginTop: 4,

                        }}
                    >
                        {data.event_info.is_spot_registration_avail ? "Spot Registrations are availablle" : "No Spot Registrations"}
                    </Text>

                    <Text
                        style={{
                            fontSize: SIZES.font,
                            fontFamily: FONTS.bold,
                            color: COLORS.black,
                            textAlign: 'left',
                            marginTop: 12,

                        }}
                    >
                        Race Routes
                    </Text>
                    <View style={{ flexWrap: 'wrap', width: '100%', flexDirection: 'row', marginTop: 8, justifyContent: 'space-between' }}>
                        {
                            data.raceCategory.map((ele) => {
                                return (
                                    <View style={{ height: 45, width: '30%', borderRadius: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCB0B0', marginTop: 6 }}>
                                        <Text
                                            style={{
                                                fontSize: SIZES.medium,
                                                fontFamily: FONTS.semiBold,
                                                color: COLORS.black,
                                                textAlign: 'center',
                                            }}
                                        >
                                            {ele.race_type_name.toUpperCase()} Route
                                        </Text>
                                    </View>
                                )
                            })
                        }




                    </View>
                </View>

                <View style={{ width: '90%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', alignSelf:'center', marginTop:12 }}>
                    <View>
                        <Text
                            style={{
                                fontSize: SIZES.font,
                                fontFamily: FONTS.regular,
                                color: COLORS.black,
                                textAlign: 'center',
                            }}
                        >
                            Starting From
                        </Text>
                        <Text
                            style={{
                                fontSize: SIZES.large,
                                fontFamily: FONTS.semiBold,
                                color: COLORS.black,
                                textAlign: 'center',
                            }}
                        >
                            ₹ {data.min_price}/-
                        </Text>
                    </View>

                    <RectButton onClick={()=>{joinNow()}} text={"Join Now"} width={"45%"} />

                </View>

            </ScrollView>

        </View>
    )
}


export default EventDescription
