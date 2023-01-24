import { StyleSheet } from "react-native";
import colors from "../../../../config/colors.json";

const style = StyleSheet.create({
    component: {
        backgroundColor: colors["background_color_1"],
        padding: 10,
        width: "80%",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 20
    },
    line: {
        flexDirection: "row",
        marginVertical: 10,
        width: "100%",
    },
    icon: {
        color: colors["color_1"],
        marginRight: 10,
    },
    info: {
        flexShrink: 1,
        color:colors["color_2"],
        fontSize: 20,
    }
});

export default style;