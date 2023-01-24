import React from "react";
import DatePicker from 'react-native-modern-datepicker';
import { getFormatedDate } from 'react-native-modern-datepicker';

//style
import colors from "../../../../config/colors.json";

const DateP = function({value}){
    return (
        <DatePicker
            options={{
                backgroundColor: colors["background_color_1"],
                textHeaderColor: colors["color_1"],
                textDefaultColor: colors["color_2"],
                selectedTextColor: '#fff',
                mainColor: colors["color_1"],
                textSecondaryColor: colors["color_3"],
                borderColor: 'rgba(0, 0, 0, 0.0)',
            }}
            maximumDate={getFormatedDate(new Date(), "YYYY-MM-DD")}
            mode={"calendar"}
            style={{
                width:"80%",
                alignSelf: "center",
                marginTop: 30,
                borderRadius: 10
            }}
            onSelectedChange={function(data){
                value(data)
            }}
        />
    )
}

export default DateP;