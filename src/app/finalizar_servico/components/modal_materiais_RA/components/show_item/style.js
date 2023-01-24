import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        backgroundColor: colors["background_color_1"],
        alignSelf: "center",
        width: "80%",
        borderRadius: 10,
        marginTop: 10,
    },
    label: {
        fontSize: 25,
        fontWeight: "bold",
        color: colors["color_3"],
        textAlign: "center",
        padding: 5
    }
});

export default style;