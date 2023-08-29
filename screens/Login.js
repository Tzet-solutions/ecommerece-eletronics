import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from "react-native-linear-gradient";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Required"),
});

export default function Login() {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecureText, setobsecureText] = useState(true);

    const handleLogin=(values)=>{
      setLoader(true)
      axios.post("http://192.168.0.106:5000/api/auth/login", values).then((response) => {
        setLoader(false);
        if (response.success=true) {
          AsyncStorage.setItem('token', response.data.authtoken);
          navigation.replace('Tabs')
        }
      })
      .catch((error) => {
        setLoader(false);
        Alert.alert(
          'Invalid Credentials',"Please enter correct credentials",
          [{text:'ok',onPress:setLoader(false)}]);
      })
      
        
    }
  return (
    <View style={styles.container}>
    <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          >
          <Ionicons name="arrow-back" size={35} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>

      </View>
      <View style={styles.form}>
        
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleLogin(values)}
        >
        {({
          handleChange,
          handleSubmit,
          values,
          touched,
          setFieldTouched,
          errors,
          isValid
        }) => (
          <View>
            <View style={styles.label(
                touched.email ? COLORS.primary : COLORS.offwhite
              )}>
                {!touched.email &&<MaterialCommunityIcons name="email" size={15} color={COLORS.primary} style={{top:7}} />}
            <TextInput
              style={{flex:1}}
              placeholder=" Enter email"
              onChangeText={handleChange("email")}
              value={values.email}
              onBlur={() => setFieldTouched("email", "")}
              onFocus={() => setFieldTouched("email")}
              autoCapitalize="none"
            />
            
            </View>
            <View style={styles.errorContainer}>
                {touched.email && errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
            </View>
            <View style={styles.label(
                touched.password ? COLORS.primary : COLORS.offwhite
              )}>
            {!touched.password &&<MaterialCommunityIcons name="form-textbox-password" size={15} color={COLORS.primary} style={{top:7}} />}
            <TextInput
              style={{flex:1}}
              placeholder=" Password"
              onChangeText={handleChange("password")}
              value={values.password}
              onBlur={() => setFieldTouched("password", "")}
              onFocus={() => setFieldTouched("password")}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={obsecureText}
            />
            <TouchableOpacity onPress={()=>{setobsecureText(!obsecureText)}}>
                <MaterialCommunityIcons name={obsecureText?'eye-outline':'eye-off-outline'} size={20} color={COLORS.gray} style={{top:4}}/>
            </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
            {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
            </View>
            <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.loginbtn(isValid?COLORS.primary:COLORS.gray2)}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                {loader?<ActivityIndicator/>:'L O G I N'}
              </Text>
            </TouchableOpacity>
            
                <Text onPress={()=>navigation.navigate('Register')} style={{color:COLORS.primary,marginVertical:SIZES.large,fontFamily:"semiBold",alignSelf:'center'}}>Register</Text>
            
          </View>
        )}
      </Formik>
      </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    margin: 15,
  },
  bar: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  form:{
    top:200
  },
  errorContainer: {
    height:15,
    margin:7
  },
  errorMessage: {
    fontSize: SIZES.small,
    color:'red',
    alignItems: "flex-start",
    fontWeight: "bold",
  },
  label: (borderColor) => ({
    width: "95%",
    height: 50,
    padding: 10,
    borderColor: borderColor,
    borderRadius: SIZES.xSmall,
    backgroundColor: COLORS.white,
    
    borderWidth: 1,
    flexDirection:'row',
    justifyContent: "space-between",
  }),
  loginbtn:(backgroundColor)=>({
    width: "95%",
    height: 50,
    borderRadius: SIZES.xSmall,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  }),
});
