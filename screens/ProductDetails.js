import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {React, useState} from "react";
import { useRoute } from "@react-navigation/native";
import {
  Ionicons,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import { addTofavorite } from "../redux/FavorateReducer";

const ProductDetails = () => {
  const route = useRoute();
  const { item } = route.params;
  let { title, image, price, description, rating } = item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);
  const cart = useSelector((state) => state.cart.cart);

  const onAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  const onAddToFavorite = (item) => {
    dispatch(addTofavorite(item));
  };
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.bar}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            >
            <Ionicons name="arrow-back" size={40} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign onPress={()=>{onAddToFavorite(item)}} name={favorite.some((value) => value._id == item._id) ?'heart':"hearto"} size={30} style={styles.fav(favorite.some((value) => value._id == item._id) ?'red':COLORS.primary)} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.image} source={{ uri: image }} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.titleRow}>
          <Text
            style={{
              width: SIZES.width - 110,
              fontFamily: "bold",
              fontSize: SIZES.large - 3,
              color: COLORS.primary,
            }}
            >
            {title}
          </Text>
          <Text
            style={{
              width: 70,
              fontFamily: "bold",
              fontSize: SIZES.medium,
              color: "tomato",
            }}
            >
            $ {price}
          </Text>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text
              style={{
                color: COLORS.gray2,
                fontSize: SIZES.small,
                marginHorizontal: 5,
              }}
              >
              ({rating?.rate})
            </Text>
          </View>
          <View style={styles.rating}>
            {2 < 1 ? (
              <TouchableOpacity onPress={() => {}}>
                <EvilIcons name="minus" size={25} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity disabled={true} onPress={() => {}}>
                <EvilIcons name="minus" size={25} color="gray" />
              </TouchableOpacity>
            )}

            <Text style={{ fontSize: SIZES.medium, marginHorizontal: 5 }}>
              1
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <EvilIcons name="plus" size={25} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            fontFamily: "bold",
            fontSize: SIZES.large,
            color: COLORS.primary,
            marginHorizontal: SIZES.medium,
          }}
          >
          Description
        </Text>

        <Text
          style={{
            fontFamily: "regular",
            fontSize: SIZES.medium - 3,
            margin: SIZES.medium,
          }}
          >
          {description}
        </Text>
          

        <View style={styles.locationbar}>
          <TouchableOpacity
            style={{ flexDirection: "row", left: SIZES.xSmall }}
          >
            <Ionicons name={"md-location-sharp"} size={20} />
            <Text style={{ fontFamily: "bold", color: COLORS.primary }}>
              lahore
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", right: SIZES.xSmall }}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={20}
              color="black"
            />
            <Text style={{ fontFamily: "bold", color: COLORS.primary }}>
              Free Delivery
            </Text>
          </View>
        </View>
      </View>
        <View style={styles.buyRow}>
          <TouchableOpacity style={styles.buybtn("40%")}>
            <MaterialCommunityIcons
              style={{ marginLeft: SIZES.small, bottom: 3 }}
              name="shopping"
              size={24}
              color={COLORS.secondary}
            />
            <Text
              style={{
                left:5,
                fontFamily: "bold",
                fontSize: SIZES.medium,
                color: COLORS.secondary,
              }}
            >
              BUY NOW
            </Text>
          </TouchableOpacity>
          {cart.some((value) => value._id == item._id)? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={styles.buybtn("58%")}
            >
              <MaterialCommunityIcons
                style={{ marginLeft: SIZES.small, bottom: 3 }}
                name="cart-check"
                size={24}
                color={COLORS.secondary}
              />
              <Text
                style={{
                  left:5,
                  fontFamily: "bold",
                  fontSize: SIZES.medium,
                  color: COLORS.secondary,
                }}
              >
                ADDED TO CART
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onAddToCart(item)}
              style={styles.buybtn("58%")}
            >
              <Ionicons
                style={{ marginLeft: SIZES.small, bottom: 3 }}
                name="md-cart"
                size={24}
                color={COLORS.secondary}
              />
              <Text
                style={{
                  left:5,
                  fontFamily: "bold",
                  fontSize: SIZES.medium,
                  color: COLORS.secondary,
                }}
              >
                ADD TO CART
              </Text>
            </TouchableOpacity>
          )}
        </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offwhite,
  },
  main: {
    margin: SIZES.xSmall,
    zIndex: 999,
  },
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgContainer: {
    top: -90,
  },
  image: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
  detailsContainer: {
    width: SIZES.width,
    marginTop: -130,
    backgroundColor: COLORS.offwhite,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
  },
  titleRow: {
    marginTop: SIZES.small,
    marginHorizontal: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: {
    marginHorizontal: SIZES.medium,
    paddingBottom: SIZES.small,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  locationbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
    height: SIZES.xLarge + 5,
    margin: SIZES.small,
  },
  buyRow:{
    position:'absolute',
    bottom:10,
    marginTop: SIZES.small,
    marginHorizontal: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buybtn: (Width) => ({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.small,
    height: SIZES.xxLarge,
    width: Width,
  }),
  fav:(color)=>({
    position:'absolute',
    top:10,
    right:10,
    zIndex:999,
    color:color
  }),
});
