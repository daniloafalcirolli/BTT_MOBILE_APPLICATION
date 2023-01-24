import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json"

const style = StyleSheet.create({
    component: {
        width: "100%",
    },
    input: {
        width: "80%",
        fontSize: 30,
        padding: 10,
        color: "white",
        alignSelf: "center",
        backgroundColor: colors["background_color_1"],
        borderWidth: 2,
        borderColor: colors["color_1"],
        borderRadius: 10,
        marginVertical: 20,
    }
});

export default style;