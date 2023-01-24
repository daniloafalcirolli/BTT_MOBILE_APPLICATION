import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: colors["background_color_1"],
        marginTop: 20,
        width: "80%",
        alignSelf: "center",
        padding: 10
    },
    label: {
        fontSize: 25,
        color: colors["color_1"],
        textAlign: "center",
    }
});

export default style;