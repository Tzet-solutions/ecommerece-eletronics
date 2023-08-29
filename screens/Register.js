import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons,Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .required("Required"),
    confirmPassword: Yup.string().when('password', (password, field) =>
    password ? field.required().oneOf([Yup.ref('password')]) : field
  )
});

export default function Login() {
    const navigation = useNavigation();
    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [obsecurePass, setobsecurePass] = useState(true);
    const [obsecureCpass, setobsecureCpass] = useState(true);
    const handleRegister=async(values)=>{
      axios.post("http://192.168.0.106:5000/api/auth/register", values).then((response) => {
        Alert.alert(
          "Registration successful",
          "Please cheack your email for verification",
          [{text:'ok',onPress:navigation.replace('Login')}]
        );
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
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
      <KeyboardAvoidingView>
      <Formik
        initialValues={{name:'', email: "", password: "" ,confirmPassword:""}}
        validationSchema={validationSchema}
        onSubmit={(values) => handleRegister(values)}
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
                touched.name ? COLORS.primary : COLORS.offwhite
              )}>
            {!touched.name &&<FontAwesome name="user" size={15} color={COLORS.primary} style={{top:7}} />}
            <TextInput
              style={{flex:1}}
              placeholder=" Enter name"
              onChangeText={handleChange("name")}
              value={values.name}
              onBlur={() => setFieldTouched("name", "")}
              onFocus={() => setFieldTouched("name")}
            />
            </View>
            <View style={styles.errorContainer}>
                {/* {touched.email && errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>} */}
            </View>


            <View style={styles.label(
                touched.email ? COLORS.primary : COLORS.offwhite
              )}>
            {!touched.email &&<MaterialCommunityIcons name="email" size={15} color={COLORS.primary} style={{top:7}} />}
            <TextInput
              style={{flex:1}}
              placeholder=" Email"
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
              secureTextEntry={obsecurePass}
            />
            <TouchableOpacity onPress={()=>{setobsecurePass(!obsecurePass)}}>
                <MaterialCommunityIcons name={obsecurePass?'eye-outline':'eye-off-outline'} size={20} color={COLORS.gray} style={{top:4}}/>
            </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
            {touched.password && errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
            </View>

            
            <View style={styles.label(
                touched.confirmPassword ? COLORS.primary : COLORS.offwhite
              )}>
            {!touched.confirmPassword && <MaterialCommunityIcons name="form-textbox-password" size={15} color={COLORS.primary} style={{top:7}} />}
            <TextInput
              style={{flex:1}}
              placeholder=" Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              onBlur={() => setFieldTouched("confirmPassword", "")}
              onFocus={() => setFieldTouched("confirmPassword")}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={obsecureCpass}
            />
            <TouchableOpacity onPress={()=>{setobsecureCpass(!obsecureCpass)}}>
                <MaterialCommunityIcons name={obsecureCpass?'eye-outline':'eye-off-outline'} size={20} color={COLORS.gray} style={{top:4}}/>
            </TouchableOpacity>
            </View>
            <View style={styles.errorContainer}>
            {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>}
            </View>


            <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.registerBtn(isValid?COLORS.primary:COLORS.gray2)}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                {loader?<ActivityIndicator/>:'R E G I S T E R'}
              </Text>
            </TouchableOpacity>
            <Text onPress={()=>navigation.goBack()} style={{color:COLORS.primary,marginVertical:SIZES.large,fontFamily:"semiBold",alignSelf:'center'}}>Already have an account?</Text>
          </View>
        )}
      </Formik>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  bar: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  }, 
  form:{
    top:150
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
  registerBtn:(backgroundColor)=>({
    width: "95%",
    height: 50,
    borderRadius: SIZES.xSmall,
    backgroundColor: backgroundColor,
    justifyContent: "center",
    alignItems: "center",
  }),
});