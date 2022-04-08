import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Cards from '../Components/Cards';


const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.menuAvatar}>
            <View style={styles.menu}>
            <FontAwesome5 name={'bars'} size={20} color={"black"} />
            </View>
            <View style={styles.image}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Image source={require('../images/avtar.jpg')} style={styles.img} />
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.hedContains}>
            <Text style={styles.hedName}>Hi Alian!</Text>
            <Text style={styles.contain}>Let's Explore The Big World Around Us!</Text>
        </View>
        <View style={styles.inputs}>
        <FontAwesome5 name={'search'} size={20} color={"#C8C6C6"} style={styles.searchIcon}/>
            <TextInput 
                placeholder='Search'
                placeholderTextColor={"#C8C6C6"}
                    style={styles.textInp}

            />
        </View>
     
           <Cards />
      
    </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 20,
        paddingHorizontal:30
    },
    menuAvatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
  
    img: {
        width: 40,
        height: 40,
        borderRadius:20
    },
    hedContains: {
        paddingTop: 30,
        paddingBottom:35
    },
    hedName: {
        fontSize: 15,
        fontWeight:'bold'
    },
    contain: {
        fontSize: 22,
        width: "80%",
        fontWeight: 'bold',
        color:'black'
    },
    inputs: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        alignItems: 'center',
        paddingBottom:40
    },
    textInp: {
        width: "100%",
        paddingLeft: 50,
        borderRadius: 13,
        backgroundColor: "#F9F9F9",
        paddingVertical: 13,
        borderWidth: 1,
        borderColor: '#EEEEEE',

    },
    searchIcon: {
        position: 'absolute',
        top: 17,
        left: 20,
        alignItems: 'center',
        zIndex:1
        
    }
})
