import React, {useState} from "react";
import {theme} from "../../config/theme";
import {Image, StyleSheet, View} from "react-native";
import {
    borderRadius,
    Button,
    Container,
    H2,
    H5,
    Input, Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";

const ForgotPassword = () => {
    const [insets] = useState(Insets.getInsets());
    return (
        <Container
            bottom={insets.bottom}
            backgroundColor={theme.White}
            keyboardAvoiding
            style={styles.container}
        >
            <View style={styles.logoWrapper}>
                <Image
                    style={styles.logoDimensions}
                    source={require("../../assets/dr_company_logo.jpg")}
                />
            </View>
            <View style={{flex: 4}}>
                <H2 style={styles.passwordText}>Set New Password</H2>
                <Input
                    placeholder={"Set Password"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.mb2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                />
                <Input
                    placeholder={"Confirm Password"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.mt2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                    secureTextEntry={true}
                />

                <Button
                    borderRadius={borderRadius.br2}
                    padding={padding.p3}
                >
                    <H5 style={{color: theme.TextLight}}>Submit</H5>
                </Button>
            </View>
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...padding.py5
    },
    logoWrapper: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    logoDimensions: {
        width: "100%",
        height: "90%",
        resizeMode: "contain"
    },
    passwordText: {
        textAlign: "center",
        color: theme.PrimaryDark,
        fontWeight: "600",
        ...margin.mt5
    }
});
export default ForgotPassword;
