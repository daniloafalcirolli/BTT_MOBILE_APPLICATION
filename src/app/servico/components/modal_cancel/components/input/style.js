import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        width:"80%",
        backgroundColor: colors["background_color_2"],
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 30,
        overflow: "hidden"
    },
    text: {
        width: "100%",
        fontSize: 25,
        color: colors["color_2"],
        padding: 5,
        backgroundColor: colors["color_1"]
    },
    input: {
        textAlignVertical: "top",
        width: "100%",
        maxHeight: 115,
        fontSize: 25,
        padding: 5,
        color: colors["color_2"],
        alignItems: "flex-start"
    }
});

export default style;