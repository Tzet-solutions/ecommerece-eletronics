import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addTofavorite, removeFromfavorite } from "../redux/FavorateReducer";
import { useEffect } from "react";

const Product = ({item,isFav=false}) => {
  const dispatch=useDispatch();
  const favorite = useSelector((state) => state.favorite.favorite);
  const navigation = useNavigation();
  const [fav, setfav] = useState(isFav)
  let { title, image, price } = item;
  const onAddToFavorite = (item) => {
    dispatch(addTofavorite(item));
  };
  
  return (
    <View style={styles.productContainer}>
        <TouchableOpacity
          style={styles.productContainer}
          onPress={() => {
            navigation.navigate("ProductDetails",{item});    
          }}
        >
        <View style={styles.imgContainer}>  
          <AntDesign onPress={()=>{setfav(!fav);onAddToFavorite(item)}} name={favorite.some((value) => value._id == item._id)?'heart':"hearto"} size={30} style={styles.fav(favorite.some((value) => value._id == item._id)?'red':COLORS.primary)} />
          <Image style={styles.img} source={{ uri: image }} />
        </View>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.title}>
          {title.length > 25 ? title.slice(0, 31) : title}
        </Text>   
    </TouchableOpacity>
      </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  productContainer: {
    width: 182,
    height: 240,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.medium,
    marginRight:5,
    marginBottom: 5,
    elevation:5
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
  fav:(color)=>({
    position:'absolute',
    top:10,
    right:10,
    zIndex:999,
    color:color
  }),
  title: {
    marginLeft: 7,
    fontFamily:'semiBold',
    color:COLORS.primary
  },
  price: {
    marginLeft: 7,
    fontWeight: "bold",
    fontSize: SIZES.medium,
    color: "tomato",
  },
});
