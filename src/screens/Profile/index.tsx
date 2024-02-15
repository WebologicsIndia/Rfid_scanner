import React from "react";
import {View} from "react-native";
import {borderRadius, Button, H5, H7, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {connect} from "react-redux";
import {logout} from "../../store/reducers/userSlice";

const Index = (props: {
  logout: any
}) => {
    return (
        <View>
            <H7 style={{color: theme.PrimaryDark}}>Profile screen</H7>
            <Button
                borderRadius={borderRadius.br3}
                padding={padding.p3}
                margin={margin.m1}
                onPress={() => props.logout()}
            >
                <H5 style={{color: theme.TextLight}}>Logout</H5>

            </Button>
        </View>
    );
};
export default connect(null, {logout})(Index);
