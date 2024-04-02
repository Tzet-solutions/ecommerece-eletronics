import { View} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import React from "react";
import { COLORS} from "../constants";

const Coursel = () => {
  const slides = [
    'https://img.freepik.com/free-psd/special-deal-super-offer-upto-60-parcent-off-isolated-3d-render-with-editable-text_47987-15330.jpg?t=st=1691340744~exp=1691341344~hmac=121cdf6682b05cfdc8ab3fbb452d8dfa30ea59cc12f65ffa93a852410eae55e6',
    "https://mdcomputers.in/image/catalog/2024/mar/31-03-24/amd-asus-rx-7000-series-828x250px.jpg",
    "https://pbs.twimg.com/media/FmHcqTjaAAAcZGM.jpg",
  ];
  return (
    <View>
      <SliderBox
        images={slides}
        inactiveDotColor={COLORS.secondary}
        dotColor={COLORS.primary}
        autoplay
        disableOnPress
        circleLoop
        ImageComponentStyle={{ borderRadius: 7, width: "98%" }}
      />
    </View>
  );
};

export default Coursel;
