import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";

const SearchTile = ({ item }) => {
    const navigation =useNavigation()
  return (
    <TouchableOpacity onPress={() => {
        navigation.navigate("ProductDetails",{item});
        
      }} style={styles.main}>
      <View style={styles.productMain}>
        <View style={{ width: "15%", height: 60 }}>
          <Image
            style={{
              width: "100%",
              height: "95%",
              resizeMode: "contain",
              borderRadius: 10,
              marginLeft: 5,
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchTile;

const styles = StyleSheet.create({
  productMain: {
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: SIZES.small,
    backgroundColor: COLORS.white,
    marginVertical: 5,
  },
  text: {
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
    overflow: "hidden",
    width: "90%",
  },
});
