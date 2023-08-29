import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import Coursel from "./Coursel";
import Product from "./Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export default function Home() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAdress] = useState(addresses[0]);
  const { userId} = useContext(UserType);
  const updateProducts = async () => {
    setLoading(true);
    let response = await axios.get(
      `http://192.168.0.106:5000/api/admin/fetchallitems`
    );
    let parsedData = response.data;
    setProducts(parsedData);
    setLoading(false);
  };
  const getAddress = async () => {
    const token = await AsyncStorage.getItem("token");
    const decodedtoken = jwtDecode(token);
    const userId = decodedtoken.user.id;
    AsyncStorage.setItem('userId',userId)
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
  const cart = useSelector((state) => state.cart.cart);
  const categories = [
    {
      title: "electronics",
      img: "https://aveade.com/images/detailed/1/Telcom-n-electronics-01-1.png",
    },
    {
      title: "jewelery",
      img: "https://sc04.alicdn.com/kf/H355e8a47560a4342a49a9a62de887760I.jpg",
    },
    {
      title: "men's clothing",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7DJ3yUic0QRnzgmVFJNrJlHZtA-zZQ2Ypg&usqp=CAU",
    },
    {
      title: "women's clothing",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8pRz0pah1f9cv_2CIG1S--lKdtCtFKAR4nVeJa_GwRmaFZ1uPe4YeAAb1pFpspSKY9E&usqp=CAU",
    },
  ];
  const firstCap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  useEffect(() => {
    updateProducts();
    getAddress();
  }, []);
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.appbarcontainer}>
          <View style={styles.appbar}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Ionicons name={"md-location-sharp"} size={30} />
            </TouchableOpacity>
            <Text style={{ fontSize: SIZES.medium, fontFamily: "bold" }}>
              {selectedAddress &&
                selectedAddress.city + ", " + selectedAddress.country}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <View style={{ alignItems: "flex-end" }}>
                <View style={styles.cartcount}>
                  <Text style={styles.cartno}>{cart.length}</Text>
                </View>

                <Ionicons name={"ios-cart"} size={35} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <Product item={item} />}
            onRefresh={updateProducts}
            refreshing={loading}
            ListHeaderComponent={
              <View>
                <Coursel />
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={categories}
                  keyExtractor={(item) => item.title}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.category}
                      onPress={() => {
                        navigation.navigate("CategoryScreen", { item });
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "semiBold",
                          fontSize: SIZES.medium,
                          color: COLORS.primary,
                        }}
                      >
                        {firstCap(item.title)}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <Text
                  style={styles.categorytxt(COLORS.primary, SIZES.xxLarge - 10)}
                >
                  50%-OFF
                </Text>
                <Text style={styles.categorytxt(COLORS.gray, SIZES.medium)}>
                  Limited time offer <AntDesign name="arrowright" size={15} />
                </Text>
                <View style={{ marginVertical: 5 }}>
                  <FlatList
                    style={{ marginVertical: 5 }}
                    data={products}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <Product item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
                <Text
                  style={styles.categorytxt(COLORS.primary, SIZES.xxLarge - 10)}
                >
                  For you
                </Text>
              </View>
            }
            numColumns={2}
            contentContainerStyle={{
              columnGap: SIZES.medium,
              rowGap: SIZES.xSmall,
            }}
            columnWrapperStyle={{ marginHorizontal: 10 }}
            style={{ marginBottom: 25 }}
          />
        )}
      </View>
      <BottomModal
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
        onTouchOutside={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        onSwipeOut={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 300 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* already added addresses */}
            {addresses.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedAdress(item)}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  borderRadius:10,
                  backgroundColor:
                    selectedAddress === item ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item.streetAddress}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item.city}, {item.country}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                if(!userId){
                  navigation.navigate("addAddress");
                }
                else 
                {navigation.navigate('Login');}
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
                borderRadius:10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </TouchableOpacity>
          </ScrollView>

          
        
        </ModalContent>
      </BottomModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: SIZES.xLarge + 10,
  },
  appbarcontainer: {
    marginHorizontal: 16,
    marginVertical: SIZES.small,
  },
  appbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartcount: {
    bottom: 16,
    width: 18,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "green",
    position: "absolute",
    zIndex: 999,
    justifyContent: "center",
  },
  cartno: {
    color: "white",
  },
  categorytxt: (Color, Size) => ({
    fontFamily: "extraBold",
    fontSize: Size,
    color: Color,
  }),
  category: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 23,
    borderColor: COLORS.gray2,
    padding: 7,
    margin: 5,
    marginVertical: 10,
  },
});
