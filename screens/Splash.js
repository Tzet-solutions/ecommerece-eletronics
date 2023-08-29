import { View, Text, Image } from 'react-native'
import {React,useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
const Splash = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
          navigation.navigate('Tabs')
        }, 1500);
      }, [])
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Image source={require('../assets/icon.png')} style={{width:180,height:160}}/>
    </View>
  )
}

export default Splash