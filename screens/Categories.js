import { StyleSheet, Text, View, FlatList,TouchableOpacity, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const navigation = useNavigation();
  const categories = [
    {title:"electronics",img:'https://aveade.com/images/detailed/1/Telcom-n-electronics-01-1.png'},
    {title:"jewelery",img:'https://sc04.alicdn.com/kf/H355e8a47560a4342a49a9a62de887760I.jpg'},
    {title:"men's clothing",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe7DJ3yUic0QRnzgmVFJNrJlHZtA-zZQ2Ypg&usqp=CAU'},
    {title:"women's clothing",img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd8pRz0pah1f9cv_2CIG1S--lKdtCtFKAR4nVeJa_GwRmaFZ1uPe4YeAAb1pFpspSKY9E&usqp=CAU'}
  ];
 
  return (
    <View style={styles.categoryContainer}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() =>navigation.navigate('CategoryScreen',{item}) }>
            <View style={styles.categoryWrapper}>
            <View style={styles.categoryWrapper}>
              <Image style={styles.imgContainer} source={{uri: item.img}}/>
              </View>
              <Text style={styles.categoryinnertxt}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
        contentContainerStyle={{ rowGap:10}}
        style={{}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    width:SIZES.width,
    top:SIZES.small,
    justifyContent:'space-between',
  },
  categoryWrapper: {
    width: 115,
    height: 115,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal:5
  },
  categoryinnertxt: {
    fontFamily:'semiBold',
    bottom: 2,
    color: COLORS.white,
    position: "absolute",
  },
  imgContainer: {
    width: 115,
    height: 90,
    overflow: "hidden",
    bottom:13,
    borderTopRightRadius: SIZES.medium,
    borderTopLeftRadius: SIZES.medium,
  },
  img: {
    aspectRatio: 1,
    resizeMode: "cover",
  },
});
