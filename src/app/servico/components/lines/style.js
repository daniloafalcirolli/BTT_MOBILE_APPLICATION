import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";


const style = StyleSheet.create({
    component: {
        alignItems: "center",
        overflow: "hidden",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: colors["background_color_1"],
    },
    label: {
        alignSelf: "flex-start",
        padding: 5,
        width: "100%",
        fontSize: 30,
        backgroundColor: colors["color_1"],
        fontWeight: "bold",
    },
    text: {
        color: "white",
        fontSize: 25,
        width: "100%",
        padding: 7,
    }
});

export default style;