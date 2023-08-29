import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import {React,useEffect,useState,useContext} from 'react'
import { COLORS, SIZES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserType } from '../UserContext'
import jwtDecode from 'jwt-decode'

const Profile = () => {
    const [userLogin, setUserLogin] = useState(false)
    const [userData, setUserData] = useState([])

    const checkUserExist=async()=>{
        const token=await AsyncStorage.getItem('token')
        
      if(token!==null){
        setUserLogin(true)

        try {
            const response = await fetch(`http://192.168.0.106:5000/api/auth/getuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token":token
            }
          });
          const json =await response.json();
          setUserData(json)
        } catch (error) {
            console.log(error)
        }
        
    }
    }
    const logout=()=>{
        Alert.alert(
            'Logout','Are you sure you want to logout',
            [{text:'Cancel',onPress:()=>{}},{text:'Confirm',onPress:async()=>{await AsyncStorage.removeItem('token')
            setUserLogin(false)}}]);
      }
    
    useEffect(() => {
      checkUserExist()
    }, [])
    
    
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.userDetails}>
        <Image style={styles.dp} source={require('../assets/userDefault.png')}/>
        
        <TouchableOpacity style={styles.signup}  onPress={userLogin?()=>{}:() => {
            navigation.navigate('Login');
          }}>
            <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary}}>{userLogin?userData.name:"Sign Up"}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row'}}>
            <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary}}>{userLogin && userData.email}</Text>
            {userData.verified && <MaterialIcons name="verified-user" size={24} color="cyan" />}
        </View>
        
        </View> 
        {userLogin? 
        <View style={styles.menu}>
            <TouchableOpacity onPress={()=>navigation.navigate('Favorities')} style={styles.menuItem}>
                <SimpleLineIcons name='heart'size={30}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Favoraties</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Cart')} style={styles.menuItem}>
                <Ionicons name='ios-cart-outline' size={28}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('OrdersScreen')} style={styles.menuItem}>
                <SimpleLineIcons name='bag'size={30}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} style={styles.menuItem}>
                <MaterialCommunityIcons name='truck-check-outline'size={30}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Shipped</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} style={styles.menuItem}>
                <Ionicons name='return-down-back'size={30}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Returns</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{}} style={styles.menuItem}>
                <SimpleLineIcons name='star'size={30}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   To Review</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={styles.menuItem}>
                <SimpleLineIcons name='logout'size={27}/>
                <Text style={{fontFamily:'semiBold',fontSize:SIZES.medium,color:COLORS.primary,marginBottom:5}}>   Log out</Text>
            </TouchableOpacity>
        </View>:<View></View>}
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical:SIZES.large,
        paddingHorizontal:SIZES.xSmall,
        backgroundColor:COLORS.offwhite,
    },
    userDetails: {
        justifyContent:'center',
        alignItems:'center',
        marginBottom:20
    },
    dp:{
          width:100,
          height:100,
          bottom:10,
          borderRadius:100
    },
    signup:{
            borderColor:COLORS.primary,
            borderWidth:1,
            borderRadius:23,
            borderColor:COLORS.gray2,
            padding:5
    },
    menu:{
       alignItems:'flex-start'
    },
    menuItem: {
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:'100%',
        hieght:20,
        marginBottom:20
    },
})