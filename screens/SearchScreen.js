import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";
import SearchTile from "./SearchTile";
import Categories from "./Categories";

const Search = () => {
  const[searchKey,setSearchKey]=useState()
  const[searchResults,setSearchResults]=useState([])
  const search=async()=>{
    let response=await axios.get(`https://fakestoreapi.com/products/category/${searchKey}`) 
    setSearchResults(response.data)
  }
  useEffect(() => {
   search()
  }, [searchKey])
  
  return (
    <View style={{margin:SIZES.small}}>
      <View style={styles.container}>
        <View style={styles.searchbar}>
          <TextInput
            style={styles.searchInput}
            placeholder="looking for something?"
            value={searchKey}
            onChangeText={setSearchKey}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={search} >
            <EvilIcons  name={"search"} color="white" size={40} />
          </TouchableOpacity>
        </View>
        </View>
        {searchResults.length>0 ?  (
            <FlatList
              data={searchResults}
              keyExtractor={(item)=>item.id}
              renderItem={({item}) => (
                <SearchTile item={item}/>
              )}
              
            />):(
          <Categories/>
        ) 
        }
        </View>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    height: 50,
  },
  searchIcon: {
    backgroundColor: COLORS.gray,
    padding: 5,
    borderRadius:SIZES.small,
    marginRight:4
  },
  searchInput: {
    flex:1,
    marginHorizontal: 15,
  },
});
export default Search;
