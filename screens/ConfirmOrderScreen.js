import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,Alert } from "react-native";
import { SIZES, COLORS } from "../constants";
import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Entypo,FontAwesome5,MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../redux/CartReducer"; 
const ConfirmOrderScreen = () => {
  const navigation=useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState(addresses[0]);
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const cart = useSelector((state) => state.cart.cart);
  const dispatch=useDispatch();
  const totalPrice = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const handlePlaceOrder=async()=>{
    const userId=await AsyncStorage.getItem('userId')
      axios.post("http://192.168.0.106:5000/api/shop/order", {userId:userId,cart:cart,totalPrice:totalPrice,shippingAddress:selectedAddress,paymentMethod:selectedOption}).then((response) => {
        dispatch(clearCart())
        navigation.navigate('OrdersScreen')
      })
      .catch((error) => {
        console.log("failed to place order", error);
      });
    
  }

  const getAddress = async () => {
      const userId = await AsyncStorage.getItem("userId");
      await axios
        .get(`http://192.168.0.106:5000/api/shop/addresses/${userId}`)
        .then((response) => {
          if ((response.status = 200)) {
            setAddresses(response.data);
          }
        })
        .catch((error) => {
          console.log("registration failed", error);
        });
    };
    useEffect(() => {
      getAddress()
    }, [])
    
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  return (
    <ScrollView>
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 20,
          justifyContent: "space-between",
        }}
      >
        {steps?.map((step, index) => (
          <View key={index} style={{ justifyContent: "center", alignItems: "center" }}>
            {index > 0 && (
              <View
                style={[
                  { flex: 1, height: 2, backgroundColor: "green" },
                  index <= currentStep && { backgroundColor: "green" },
                ]}
              />
            )}
            <TouchableOpacity onPress={()=>setCurrentStep(index+1)}>
            <View
              style={[
                {
                  width: 40,
                  height: 40,
                  borderRadius: 150,
                  backgroundColor: "#ccc",
                  justifyContent: "center",
                  alignItems: "center",
                },
                index < currentStep && { backgroundColor: "green" },
              ]}
            >
              {index < currentStep ? (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  &#10003;
                </Text>
              ) : (
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                >
                  {index + 1}
                </Text>
              )}
            </View>
            </TouchableOpacity>
            <Text style={{ textAlign: "center", marginTop: 8 }}>
              {step.title}
            </Text>
          </View>
        ))}
      </View>
    </View>

    {currentStep == 0 && (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Select Delivery Address
        </Text>

        <Pressable>
          {addresses.map((item, index) => (
            <Pressable
            key={item._id}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingBottom: 17,
                marginVertical: 7,
                borderRadius: 6,
              }}
            >
              {selectedAddress && selectedAddress._id === item._id ? (
                <FontAwesome5 name="dot-circle" size={20} color={COLORS.primary} />
              ) : (
                <Entypo
                  onPress={() => setSelectedAdress(item)}
                  name="circle"
                  size={20}
                  color="gray"
                />
              )}

              <View style={{ marginLeft: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item.streetAddress}
                </Text>
                <Text style={{ fontSize: 15, color: "#181818" }}>
                  {item.city}, {item.country}
                </Text>


                <Text style={{ fontSize: 15, color: "#181818" }}>
                  Contact : {item.mobileNo}
                </Text>
                

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 7,
                  }}
                >
                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Remove</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 0.9,
                      borderColor: "#D0D0D0",
                    }}
                  >
                    <Text>Set as Default</Text>
                  </Pressable>
                </View>

                <View>
                  {selectedAddress && selectedAddress._id === item._id && (
                    <Pressable
                      onPress={() => setCurrentStep(1)}
                      style={{
                        backgroundColor: COLORS.primary,
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Deliver to this Address
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </Pressable>
          ))}
        </Pressable>
      </View>
    )}

    {currentStep == 1 && (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Choose your delivery options
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 8,
            gap: 7,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
        >
          {option ? (
            <FontAwesome5 name="dot-circle" size={20} color={COLORS.primary} />
          ) : (
            <Entypo
              onPress={() => setOption(!option)}
              name="circle"
              size={20}
              color="gray"
            />
          )}

          <Text style={{ flex: 1 }}>
            <Text style={{ color: "green", fontWeight: "500" }}>
              Tomorrow by 10pm
            </Text>{" "}
            - FREE delivery 
          </Text>
        </View>

        <Pressable
          onPress={() => setCurrentStep(2)}
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{color:'white'}}>Continue</Text>
        </Pressable>
      </View>
    )}

    {currentStep == 2 && (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Select your payment Method
        </Text>

        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginTop: 12,
          }}
        >
          {selectedOption === "cash on delivery" ? (
            <FontAwesome5 name="dot-circle" size={20} color={COLORS.primary} />
          ) : (
            <Entypo
              onPress={() => setSelectedOption("cash on delivery")}
              name="circle"
              size={20}
              color="gray"
            />
          )}

          <Text>Cash on Delivery</Text>
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
            marginTop: 12,
          }}
        >
          {selectedOption === "card" ? (
            <FontAwesome5 name="dot-circle" size={20} color={COLORS.primary} />
          ) : (
            <Entypo
              onPress={() => {
                setSelectedOption("card payment");
                Alert.alert("Credit/Debit card", "Pay Online", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel is pressed"),
                  },
                  {
                    text: "OK",
                    onPress: () => pay(),
                  },
                ]);
              }}
              name="circle"
              size={20}
              color="gray"
            />
          )}

          <Text>Credit or debit card</Text>
        </View>
        <Pressable
          onPress={() => setCurrentStep(3)}
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{color:'white'}}>Continue</Text>
        </Pressable>
      </View>
    )}

    {currentStep === 3 && selectedOption === "cash on delivery" && (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            backgroundColor: "white",
            padding: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
        >
          <View>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Save 5% and never run out
            </Text>
            <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
              Turn on auto deliveries
            </Text>
          </View>

          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="black"
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
        >
          <Text>Shipping to {selectedAddress.name}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
              Items
            </Text>

            <Text style={{ color: "gray", fontSize: 16 }}>₹{totalPrice}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", color: "gray" }}>
              Delivery
            </Text>

            <Text style={{ color: "gray", fontSize: 16 }}>₹0</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Order Total
            </Text>

            <Text
              style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
            >
              ₹{totalPrice}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
            Pay on delivery (Cash)
          </Text>
        </View>

        <Pressable
          onPress={handlePlaceOrder}
          style={{
            backgroundColor: COLORS.primary,
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{color:'white'}}>Place your order</Text>
        </Pressable>
      </View>
    )}
  </ScrollView>
  );
};

export default ConfirmOrderScreen;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  bar: {
    margin: SIZES.large-4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bartxt: {
    height:55,
    width:55,
    borderRadius:100,
    backgroundColor:COLORS.primary,
    justifyContent: "center",
    alignItems:"center"
  },
});
