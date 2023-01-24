import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    text:{
        alignSelf: "center",
        color: colors["color_1"],
        fontSize: 30,
        marginVertical: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    iconContainer:{
        top: 0,
        padding: 5,
        backgroundColor:colors["background_color_1"],
        position:"absolute",
        borderBottomRightRadius: 10,
    },
    icon: {
        fontSize: 50,
        color: colors["color_1"]
    }
});

export default style;