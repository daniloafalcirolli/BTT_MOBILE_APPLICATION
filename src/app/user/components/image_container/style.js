import {StyleSheet} from "react-native";

const style = StyleSheet.create({
    imageContainer:{
        width: "100%",
        height: 500,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around"
    },
    imageBack: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageBlur: {
        backgroundColor:"rgba(0,0,0,0.4)",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    text: {
        color: "white",
        fontSize: 30,
        maxWidth: "70%",
        textAlign: "center",
    }
});

export default style;