import {StyleSheet} from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        backgroundColor: colors["color_1"],
        borderRadius: 20,
        width: 250,
        height: 200,
        justifyContent: "center",
        padding: 10,
        alignSelf: "center",
        marginHorizontal: 20
    },
    icon: {
        alignSelf: "center",
        fontSize: 60,
        color: colors["background_color_2"],
        marginBottom: 10,
    },
    text: {
        color: colors["background_color_2"],
        alignSelf: "center",
        textAlign: "center",
        fontSize: 30,
        width: "80%",
        fontWeight: "bold"
    }
});

export default style;