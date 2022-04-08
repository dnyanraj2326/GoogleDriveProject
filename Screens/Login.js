import React from 'react'
import { StyleSheet, Text, TextInput, View ,TouchableOpacity,Image} from 'react-native'

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.imgage}>
        <Image source = {require('../images/logo.png')} style={styles.img}/>
        </View>
        <View style={styles.header}>
            <Text style={styles.headerText}>Hey,</Text>
            <Text style={styles.headerText}>Login Now.</Text>
        </View>
        <View style={styles.createSignup}>
                <Text style={styles.createSignupText}>If you are new/ </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.createSignupLink}> Create New</Text>
                    </TouchableOpacity>
        </View>
        <View style={styles.input}>
            <TextInput
            style={styles.inputEmail}    
                    placeholder='Email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
            />
            <TextInput 
                style={styles.inputPassword}
                    placeholder='Password'
                    secureTextEntry={true}
            />
        </View>
        <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot Passcode? / </Text>
            <Text style={styles.forgotLink}> Reset</Text>
        </View>
        <View style={styles.btn}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.skip}>
            <Text style={styles.forgotText}>Skip Now</Text>
        </View>
    </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 40,
        paddingHorizontal:30
    },
    header: {
        paddingTop:100
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color:'black'
    },
    createSignup: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    createSignupText: {
        color: "#C8C6C6",
        fontWeight:'bold'
    },
    createSignupLink: {
        color: "black",
        fontWeight:'bold'
    },
    input: {
        paddingTop:60
    },
    inputEmail: {
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical:15,
        marginBottom: 25,
        backgroundColor: '#EEEEEE',
        color: 'black',
        fontWeight:'bold'
    },
    inputPassword: {
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical:15,
        backgroundColor: '#EEEEEE',
        color: 'black',
        fontWeight:'bold',
        
    },
    forgot: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    forgotText: {
        color: "#C8C6C6",
        fontWeight:'bold'
    },
    forgotLink: {
        color: "black",
        fontWeight:'bold'
    },
    btn: {
        paddingTop: 70,
        
    },
    btnText: {
        color: "black",
        fontWeight: 'bold',
        fontSize:17
    },
    button: {
        backgroundColor: '#5AA897',
        paddingVertical: 15,
        paddingHorizontal: 50,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:10
    },
    skip: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:40
    },
    img:{
        width: 60,
        height:60,
    }
})
