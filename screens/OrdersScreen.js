import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { React, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setloading] = useState(false)
  const getOrders = async () => {
    setloading(true)
    let userId = await AsyncStorage.getItem("userId");
    let url = `http://192.168.0.106:5000/api/shop/order/${userId}`;
    try {
      const response = await axios.get(url);
      let orders = response.data.orders;
      setOrders(orders);
    } catch (error) {
      console.log("error", error);
    }finally{
      setloading(false)
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <View style={{marginBottom:80}}>
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
          }}
        >
          <Ionicons name="arrow-back" size={35} color={COLORS.primary} />
        </TouchableOpacity>
        <Text
          style={{
            margin: 10,
            fontFamily: "bold",
            fontSize: SIZES.xLarge,
            color: COLORS.primary,
          }}
        >
          {"  "}Orders
        </Text>
      </View>
      {loading && <ActivityIndicator size={'large'}/>}
      {!loading && orders.length==0 && <Text style={{ fontFamily: "regular",padding:10,fontSize:18 ,color:'white' }}>No Orders Found</Text>
      }
      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View >
            <View style={styles.orderdetails}>
              <Text style={{ fontFamily: "regular" }}>
                Deliver to {item.shippingAddress?.name} at{" "}
                {item.shippingAddress?.streetAddress},
                {item.shippingAddress?.city},{item.shippingAddress?.country}
              </Text>
              <Text style={{ fontFamily: "regular" }}>
                Phone NO. : ********
                {(item.shippingAddress?.mobileNo).slice(7, 10)}
              </Text>
              <Text style={{ fontFamily: "regular" }}>
                Total amount : {item.totalPrice}$
              </Text>
              <Text style={{ fontFamily: "regular" }}>
                Payment Method : {item.paymentMethod}
              </Text>
            </View>
            <FlatList
              data={item.products}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View>
                  <View style={styles.productContainer}>
                    <TouchableOpacity
                      style={styles.productContainer}
                      onPress={() => {
                        navigation.navigate("ProductDetails", { item });
                      }}
                    >
                      <View style={styles.imgContainer}>
                        <Image
                          style={styles.img}
                          source={{ uri: item.image }}
                        />
                      </View>
                      <Text style={styles.price}>${item.price}</Text>
                      <Text style={styles.title}>
                        {item.title.length > 25
                          ? item.title.slice(0, 31)
                          : item.title}
                      </Text>
                      <View style={styles.cartcount}>
                        <Text style={{color:'white'}}>{item.quantity}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              numColumns={2}
              contentContainerStyle={{
                columnGap: SIZES.medium,
                rowGap: SIZES.xSmall,
              }}
              columnWrapperStyle={{ marginHorizontal: 10 }}
              
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    alignItems: "center",
  },
  productContainer: {
    width: 182,
    height: 240,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    marginRight: 5,
    marginBottom: 5,
    elevation: 5,
  },
  imgContainer: {
    flex: 1,
    width: 170,
    height: 200,
    overflow: "hidden",
    marginLeft: 5,
    marginTop: 5,
    borderRadius: SIZES.medium,
  },
  img: {
    aspectRatio: 1,
    resizeMode: "contain",
  },
  fav: (color) => ({
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 999,
    color: color,
  }),
  title: {
    marginLeft: 7,
    fontFamily: "semiBold",
    color: COLORS.primary,
  },
  price: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: SIZES.medium,
    color: "tomato",
  },
  orderdetails: {
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
    backgroundColor: "rgba(48, 48, 48,0.1)",
  },
  cartcount: {
    bottom: 10,
    right:10,
    width: 20,
    borderRadius: 50,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: 999,
    justifyContent: "center",
  },
});
export default OrdersScreen;
