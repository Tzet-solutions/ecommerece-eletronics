import React, {  useState } from "react";
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
import { Ionicons, MaterialCommunityIcons,Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  mobileNo: Yup.string().required("Required"),
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
});

export default function AddressScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);


    const handleAddress=async(values)=>{
        const userId=await AsyncStorage.getItem('userId')
        console.log(userId)
        const address=values
      axios.post("http://192.168.0.106:5000/api/shop/addresses", {userId,address}).then((response) => {
        Alert.alert(
            "Address Added","",
            [{text:'ok',onPress:navigation.replace('Tabs')}]
          );
      })
      .catch((error) => {
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
      <KeyboardAvoidingView >
      <Formik
        initialValues={{name:'', mobileNo: "", streetAddress: "" ,city:"", country:"", postalCode:''}}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAddress(values)}
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
            <TextInput
              style={{flex:1}}
              placeholder="Enter Title"
              onChangeText={handleChange("name")}
              value={values.name}
              onBlur={() => setFieldTouched("name", "")}
              onFocus={() => setFieldTouched("name")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.name && errors.name && <Text style={styles.errorMessage}>{errors.name}</Text>}
            </View>


            <View style={styles.label(
                touched.mobileNo ? COLORS.primary : COLORS.offwhite
              )}>
            <TextInput
              style={{flex:1}}
              placeholder="Enter Mobile Number"
              onChangeText={handleChange("mobileNo")}
              value={values.mobileNo}
              keyboardType="numeric"
              onBlur={() => setFieldTouched("mobileNo", "")}
              onFocus={() => setFieldTouched("mobileNo")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.mobileNo && errors.mobileNo && <Text style={styles.errorMessage}>{errors.mobileNo}</Text>}
            </View>

            <View style={styles.label(
                touched.streetAddress ? COLORS.primary : COLORS.offwhite
              )}>
            <TextInput
              style={{flex:1}}
              placeholder="Enter your Street Address"
              onChangeText={handleChange("streetAddress")}
              value={values.streetAddress}
              onBlur={() => setFieldTouched("streetAddress", "")}
              onFocus={() => setFieldTouched("streetAddress")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.streetAddress && errors.streetAddress && <Text style={styles.errorMessage}>{errors.streetAddress}</Text>}
            </View>

            <View style={styles.label(
                touched.city ? COLORS.primary : COLORS.offwhite
              )}>
            <TextInput
              style={{flex:1}}
              placeholder="Enter Your City"
              onChangeText={handleChange("city")}
              value={values.city}
              onBlur={() => setFieldTouched("city", "")}
              onFocus={() => setFieldTouched("city")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.city && errors.city && <Text style={styles.errorMessage}>{errors.city}</Text>}
            </View>

            <View style={styles.label(
                touched.country ? COLORS.primary : COLORS.offwhite
              )}>
            <TextInput
              style={{flex:1}}
              placeholder="Enter Your Country"
              onChangeText={handleChange("country")}
              value={values.country}
              onBlur={() => setFieldTouched("country", "")}
              onFocus={() => setFieldTouched("country")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.country && errors.country && <Text style={styles.errorMessage}>{errors.country}</Text>}
            </View>
            <View style={styles.label(
                touched.postalCode ? COLORS.primary : COLORS.offwhite
              )}>
            <TextInput
              style={{flex:1}}
              placeholder="Enter Your PostalCode"
              onChangeText={handleChange("postalCode")}
              value={values.postalCode}
              keyboardType="numeric"
              onBlur={() => setFieldTouched("postalCode", "")}
              onFocus={() => setFieldTouched("postalCode")}
            />
            </View>
            <View style={styles.errorContainer}>
                {touched.postalCode && errors.postalCode && <Text style={styles.errorMessage}>{errors.postalCode}</Text>}
            </View>
            <TouchableOpacity disabled={!isValid} onPress={handleSubmit} style={styles.registerBtn(isValid?COLORS.primary:COLORS.gray2)}>
              <Text
                style={{
                  fontFamily: "bold",
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                {loading?<ActivityIndicator/>:'Add Address'}
              </Text>
            </TouchableOpacity>
            
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
    top:80
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