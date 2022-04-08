import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Profile = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                <FontAwesome5 name={'arrow-left'} size={20} color={"black"}  />
                </TouchableOpacity>
            </View>
            <View style={styles.imgBackground}>
                    <Image source={require('../images/img2.jpg')} style={styles.personImg} />
            </View>
            <View style={styles.cameraIcon}>
                <TouchableOpacity>
                    <Entypo name={'camera'} size={20} color={"black"} style={styles.cameras} />
                </TouchableOpacity>
            </View>
            <View style={styles.personName}>
                <Text style={styles.perName}>Mr.John Karispa</Text>
            </View>
            <View style={styles.locationAbout}>
                <View style={styles.travel}>
                    <Text style={styles.travelHed}>Travel Done</Text>
                    <Text style={styles.travelCount}>20</Text>
                </View>
                <View style={styles.trip}>
                    <Text style={styles.travelHed}>Trips</Text>
                    <Text style={styles.travelCount}>13</Text>
                </View>
                <View style={styles.plan}>
                <Text style={styles.travelHed}>Planing</Text>
                <Text style={styles.travelCount}>45</Text>
                </View>
            </View>
            <View style={styles.continousTravel}>
                <Text style={styles.continousTravelText}>Complete Profile</Text>
                <View style={styles.cards}>
                <View style={styles.card}>
                    <Entypo name={'graduation-cap'} size={28} color={"#71DFE7"} style={styles.eduIcon}/>
                    <Text style={styles.hedName}>Education</Text>
                    <Text style={styles.steps}>02 Steps</Text>
                    <View style={styles.leftRight}>
                        <View>
                        <Text style={styles.leftText}>Left</Text>
                            <Text style={styles.border}></Text>
                            </View>
                    <FontAwesome5 name={'arrow-right'} size={20} color={"black"} />
                    </View>
                    </View>
                    <View style={styles.card1} >
                    <MaterialIcons name={'business-center'} size={28} color={"orange"} style={styles.eduIcon}/>
                    <Text style={styles.hedName}>Professional</Text>
                    <Text style={styles.steps}>04 Steps</Text>
                    <View style={styles.leftRight}>
                        <View>
                        <Text style={styles.leftText}>Left</Text>
                            <Text style={styles.border}></Text>
                            </View>
                    <FontAwesome5 name={'arrow-right'} size={20} color={"black"} />
                    </View>
                    </View>
                    </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal:30
    },
    backText: {
        color: 'black',
        fontSize:18,
        fontWeight:'bold'
    },
    personImg: {
        width: 130,
        height: 130,
        borderRadius: 40,
        
    },
    imgBackground: {
        marginTop: 70,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
        
    },
    cameras: {
        backgroundColor: '#5AA897',
        width: 40,
        height: 40,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 100,
        
        
    },
    cameraIcon: {
        position: 'absolute',
        top: 106,
        left:'68.40%'
    },
    perName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign:'center'
    },
    personName: {
        paddingTop: 10,
    },
    locationAbout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:50,
    },
    travelHed: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'gray',
    },
    travelCount: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingTop:5
    },
    // --------------------------Card styles------------------------

    continousTravel: {
        paddingTop:70
    },
    continousTravelText: {
        fontSize: 21,
        paddingBottom: 28,
        fontWeight: 'bold',
        color: 'black',
    },
    cards: {
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    card: {
        backgroundColor: '#71DFE7',
        width: 155,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20
    },
    card1: {
        backgroundColor: 'orange',
        width: 155,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 20
    },
    eduIcon: {
        backgroundColor: '#ffffff',
        width: 45,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 15,
    },
    hedName: {
        paddingVertical: 10,
        fontSize: 17,
        fontWeight:'bold'
    },
    steps: {
        fontSize: 22,
        fontWeight: 'bold',
        color:'black',
    },
    leftRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 1,
        alignItems:'center'
    },
    leftText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black',
    },
    border: {
        height: 0,               // height is '0' so that the view will not occupy space
        width: 40,              // as much as you want to 'Stretch' the underline
        borderTopColor: 'black', 
        borderTopWidth: 2,       // 'Thickness' of the underline
        marginTop: 5 
    }
})
