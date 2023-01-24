import { StyleSheet } from "react-native";

import colors from "../../config/colors.json"

const pageStyle = StyleSheet.create({
    "normal-spaced": {
        flex: 1,
        backgroundColor: colors["background_color_2"],
        justifyContent: "space-around",
    },
    normal: {
        flex: 1,
        backgroundColor: colors["background_color_2"],
    }
});

export default pageStyle;