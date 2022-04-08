import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import { Image, StyleSheet, Text, View, FlatList } from 'react-native'
import Data from './Data';

const Cards = () => {
    return (
        <View style={styles.cards}> 
    <FlatList 
                data={Data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
           <View style={styles.images}>
               <Image source={{ uri: item.img }} style={styles.img}/>
           </View>
           <View style={styles.avatars}>
                            <Image source={{ uri: item.avatar1 }} style={styles.imgAvatar1} />
                            <Image source={{ uri: item.avatar2 }} style={styles.imgAvatar2} />
                            <Image source={{ uri: item.avatar3 }} style={styles.imgAvatar3}/>
                            <Text style={styles.num}>+{item.number}</Text> 
           </View>
           <View style={styles.titlePrice}>
                            <Text style={styles.title}>{ item.title}</Text>
               <Text style={styles.price}>${item.price}.0</Text>
           </View>
           <View style={styles.location}>
               <Entypo name={'location-pin'} size={24} color={"#C8C6C6"} style={styles.locationIcon} />
               <Text style={styles.locationText}>{ item.location}</Text>
           </View>
       </View>
                )}
    />
   </View>
    )
}

export default Cards

const styles = StyleSheet.create({
    img: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius:15
},
card: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    borderColor: '#F9F9F9',
    borderWidth: 2,
    marginBottom:20
},
cards: {
    paddingTop:10
},
imgAvatar1: {
    width: 22,
    height:22,
    borderRadius: 20,
    position: 'absolute',
    left: 10,
    zIndex:1
},
imgAvatar2: {
    width: 22,
    height:22,
    borderRadius: 20,
    position: 'absolute',
    left:28
},
imgAvatar3: {
    width: 22,
    height:22,
    borderRadius: 20,
    position: 'absolute',
    left: 48,
    zIndex:1
},
num: {
    position: 'absolute',
    left: 74,
    color: 'green',
    fontWeight: 'bold',
},
avatars: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
    borderRadius: 100,
    position: 'relative',
    position:'absolute',
    top: "60%",
    left: 35,
},
titlePrice: {
    flexDirection:'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop:25,
},
title: {
    fontWeight: 'bold',
    color: 'black',
    fontSize:17
},
price: {
    fontSize: 17,
    color: 'green',
    fontWeight: 'bold',
},
location: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 15,
    alignItems:'center'
},
locationText: {
    color: "#C8C6C6",
    paddingHorizontal:10
    }
})
