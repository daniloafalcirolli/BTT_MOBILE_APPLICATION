import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    zIndex: 999,
    backgroundColor: colors["low_color_background"],
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
})

export default style;