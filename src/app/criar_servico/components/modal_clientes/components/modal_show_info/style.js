import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        backgroundColor: colors["background_color_1"],
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
        overflow: "hidden",
        marginTop: 30,
    },
    principalText: {
        backgroundColor: colors["color_3"],
        fontSize: 25,
        padding: 5,
        color: colors["background_color_1"],
        fontWeight: "bold",
    },
    otherTexts:{
        padding: 10,
    },
    texts: {
        color: colors["color_3"],
        fontSize: 25,
    }
});

export default style;