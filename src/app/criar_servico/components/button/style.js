import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "80%",
        marginTop: 30,
        backgroundColor: colors["color_1"],
        alignSelf: "center",
        borderRadius: 10,
        alignItems: "center",
        padding: 10,
    },
    text: {
        color: colors["background_color_1"],
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default style;