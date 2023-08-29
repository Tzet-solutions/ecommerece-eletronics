import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES,SHADOWS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Cart() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
    
    const handleCart=async()=>{
      const userId=await AsyncStorage.getItem('userId')
        axios.post("http://192.168.0.106:5000/api/shop/addtocart", {userId:userId,cart:cart}).then((response) => {
          
        })
        .catch((error) => {
          console.log("failed to add item", error);
        });
    }
  const fetchCart=async()=>{
      const userId = await AsyncStorage.getItem("userId");
    await axios
      .get(`http://192.168.0.106:5000/api/shop/cart/${userId}`)
      .then((response) => {
        if ((response.status = 200)) {
          console.log(response.data);
          setProducts(response.data)
   
        }
      })
      .catch((error) => {
        console.log("registration failed", error);
      });
    }
    
  const onRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  const onIncreseQuantity = (item) => {
    dispatch(incrementQuantity(item));
  };
  const ondecreseQuantity = (item) => {
    if (item.quantity == 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };
  
  
  useEffect(() => {
    setProducts(cart)
    handleCart()
  }, [cart]);
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
        <TouchableOpacity>
          <MaterialCommunityIcons name="delete-outline" size={30} />
        </TouchableOpacity>
      </View>
      {cart.length==0 && <Text style={{fontFamily:'regular',alignSelf:'center',fontSize:16,color:COLORS.primary}}>No Items in Cart</Text>}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetails", { item });
            }}
            style={styles.productContainer}
          >
            <View style={{ width: "35%", height: 130 }}>
              <Image
                style={{
                  width: "100%",
                  height: "95%",
                  resizeMode: "contain",
                  borderRadius: 10,
                  marginLeft: 3,
                  marginTop: 3,
                }}
                source={{ uri: item.image }}
              />
            </View>
            <View
              style={{
                justifyContent: "space-around",
                alignContent: "center",
                marginLeft: 20,
              }}
            >
              <View style={{ overFlow: "hidden" }}>
                <Text numberOfLines={1} style={styles.text}>
                  {item.title}
                </Text>
              </View>
              <Text style={styles.text}>Price : $ {item.price}</Text>
              <View style={{ flexDirection: "row", marginVertical: 5 }}>
                {item.quantity !== 1 ? (
                  <TouchableOpacity onPress={() => ondecreseQuantity(item)}>
                    <Feather
                      name="minus"
                      size={23}
                      color="white"
                      style={{
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 5,
                        backgroundColor: COLORS.gray,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => onRemoveFromCart(item)}>
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={23}
                      color="white"
                      style={{
                        backgroundColor: COLORS.gray,
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 3,
                      }}
                    />
                  </TouchableOpacity>
                )}

                <Text
                  style={{
                    fontSize: SIZES.large - 3,
                    borderTopWidth: 0.8,
                    borderColor: COLORS.gray,
                    borderBottomWidth: 0.8,
                    paddingHorizontal: 10,
                  }}
                >
                  {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => onIncreseQuantity(item)}>
                  <Feather
                    name="plus"
                    size={23}
                    color="white"
                    style={{
                      borderTopRightRadius: 3,
                      borderBottomRightRadius: 3,
                      backgroundColor: COLORS.gray,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.titleRow}>
        <Text style={{ fontFamily: "bold", fontSize: 16 }}>SubTotal :</Text>
        <Text style={{ fontFamily: "bold", fontSize: 16 }}>$ {total}</Text>
      </View>
    {total!=0 ?
      <TouchableOpacity onPress={()=>navigation.navigate('ConfirmOrderScreen')} style={styles.buyRow(COLORS.primary)}>
        <MaterialCommunityIcons
          style={{ marginLeft: SIZES.small, bottom: 3 }}
          name="cart-arrow-right"
          size={24}
          color={COLORS.secondary}
        />
        <Text
          style={{
            marginLeft: 10,
            fontFamily: "bold",
            fontSize: SIZES.medium,
            color: COLORS.secondary,
          }}
        >
          C H E A K    O U T 
        </Text>
      </TouchableOpacity>:
      <TouchableOpacity disabled style={styles.buyRow(COLORS.gray2)}>
      <MaterialCommunityIcons
        style={{ marginLeft: SIZES.small, bottom: 3 }}
        name="cart-arrow-right"
        size={24}
        color="white"
      />
      <Text
        style={{
          marginLeft: 10,
          fontFamily: "bold",
          fontSize: SIZES.medium,
          color: "white",
        }}
      >
        C H E A K    O U T 
      </Text>
    </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: COLORS.offwhite,
  },
  bar: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: SIZES.xSmall,
  },
  
  productContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightWhite,
    padding:5,
    marginBottom: 5,
    elevation:5,

  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
  titleRow: {
    marginTop: SIZES.small,
    marginHorizontal: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buyRow:(color)=> ({
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color,
    borderRadius: SIZES.small,
    height: SIZES.xxLarge,
    width: "95%",
    alignSelf: "center",
  }),
});
