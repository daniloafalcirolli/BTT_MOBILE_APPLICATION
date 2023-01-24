import { StyleSheet } from "react-native";
import colors from "../../../../../../config/colors.json";

const style = StyleSheet.create({
    container: {
        backgroundColor: colors["background_color_1"],
        width: "80%",
        borderRadius: 10,
        alignSelf:"center",
        marginTop: 30,
        borderWidth: 3,
        borderColor: colors["color_3"],
        overflow: "hidden",
    },
    label: {
        color: colors["color_3"],
        alignSelf: "center",
        paddingHorizontal: 10,
        fontSize: 25,
        fontWeight: "bold"
    },
    inputValue: {
        color: colors["color_2"],
        padding: 10,
        fontSize: 25,
        backgroundColor: colors["background_color_2"]
    },
    iconContainer: {
        padding: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    labelBase:{
        flexDirection: "row"
    },
    icon: {
        color: colors["color_3"],
    }
});

export default style;