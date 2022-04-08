import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const GetStarted = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imgage}>
            <Image source = {require('../images/logo.png')} style={styles.img}/>
                </View>
                <View style={styles.hedImage}>
            <Image source = {require('../images/img5.png')} style={styles.hedImg}/>
                </View>
                <View style={styles.contains}>
                    <Text style={styles.para}>Get Started</Text>
                    <Text style={styles.hed}>Millions of people use to turn their ideas into reality.
                    </Text>
            </View>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.skipBtn}>
                <Text style={styles.skipBtnText}>Skip Now</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}  style={styles.nextBtn}>
                <Text style={styles.nextBtnText}>Next</Text>
                </TouchableOpacity>
                </View>
            </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 40,
        paddingHorizontal:30
    },
    img:{
        width: 60,
        height:60,
    },
    hedImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    hedImg: {
        width: '100%',
        height: 400,
        
    },
    para: {
        color: "#C8C6C6",
        fontWeight:"bold"
    },
    hed: {
        color: 'black',
        width: "80%",
        fontSize: 29,
        fontWeight: 'bold',
        paddingTop:20
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop:60
    },
    skipBtnText: {
        color: "#C8C6C6",
        fontWeight:"bold"
    },
    nextBtnText: {
        color: "white",
        fontWeight:"bold"
    },
    nextBtn: {
        paddingVertical: 10,
        paddingHorizontal: 28,
        backgroundColor: '#5AA897',
        borderRadius:10

    }
})
