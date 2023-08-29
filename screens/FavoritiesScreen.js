import { View, Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import { React, useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SIZES,COLORS } from '../constants'; 
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { useNavigation } from '@react-navigation/native';

export default FavoratiesScreen = () => {
    const navigation=useNavigation()
    const dispatch=useDispatch();
  const [products, setProducts] = useState([]);
  const favorite = useSelector((state) => state.favorite.favorite);
  useEffect(() => {
    setProducts(favorite)
  }, []);
    return(
      
<View style={{ marginBottom: SIZES.xLarge }}>
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
        {'  '}Favoraties
      </Text>
      </View>
     {favorite.length==0 && <Text style={{fontFamily:'regular',alignSelf:'center',fontSize:16,color:COLORS.primary}}>No Items added in Favoraties</Text>}
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <Product item={item}/>}
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
    alignItems:'center'
  },
});
