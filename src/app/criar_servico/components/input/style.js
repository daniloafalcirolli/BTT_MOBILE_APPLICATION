import {StyleSheet} from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width: "80%",
        borderRadius: 10,
        overflow: "hidden",
        alignSelf: "center",
        marginTop: 30
    },
    label:{
        backgroundColor: colors["color_3"],
        padding: 5,
        fontSize: 25,
        color: colors["background_color_1"],
        fontWeight: "bold",
    },
    input: {
        backgroundColor: colors["background_color_1"],
        color: colors["color_2"],
        fontSize: 30,
        padding: 5,
    }
});

export default style;