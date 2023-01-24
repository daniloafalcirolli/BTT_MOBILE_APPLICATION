import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        backgroundColor: colors["background_color_1"],
        width: "80%",
        padding: 10,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20
    },
    title: {
        color: colors["color_1"],
        fontSize: 25,
        width: "100%",
        paddingLeft: 10,
        marginBottom:5
    },
    content: {
        color:"white",
        fontSize: 25,
        backgroundColor: colors["background_color_2"],
        padding: 5,
        borderRadius: 10,
        width: "100%",
    }
});

export default style;