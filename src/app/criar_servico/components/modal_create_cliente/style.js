import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "80%",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 30
    },
    text:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: colors["color_3"],
        padding: 5,
        fontSize: 25,
        color: colors["background_color_1"],
        fontWeight: "bold",
    }
});

export default style;
