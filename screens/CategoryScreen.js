import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Product from "./Product";
import axios from "axios";
import { SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";

export default function CategoryScreen() {
  const route = useRoute();
  const { item } = route.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const updateProducts = async () => {
    const url = `https://fakestoreapi.com/products/category/${item.title}`;
    let response = await axios.get(url);
    let parsedData = response.data;
    setProducts(parsedData);
  };

  useEffect(() => {
    // updateProducts();
  }, []);
  const firstCap = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <View style={{ paddingBottom: SIZES.xLarge }}>
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
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
        {firstCap(item.title)}
      </Text>
      </View>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Product item={item} />}
        numColumns={2}
        contentContainerStyle={{
          columnGap: SIZES.medium,
          rowGap: SIZES.xSmall,
        }}
        columnWrapperStyle={{ marginHorizontal: 10 }}
        style={{marginBottom:60}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    margin: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems:'center'
  },
});
