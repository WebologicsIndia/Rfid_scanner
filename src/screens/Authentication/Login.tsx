import React, {useState} from "react";
import {
    borderRadius,
    Button,
    Container, H2, H5,
    H7,
    Input,
    Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";
import {Image, Pressable, StyleSheet, View} from "react-native";

const Login = (props: any) => {
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
                <H2 style={styles.loginText}>Login</H2>
                <Input
                    placeholder={"Username /  Email"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.my2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                />
                <Input
                    placeholder={"Password"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.mt2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                />
                <Pressable onPress={() => props.navigation.navigate("forgot_password")}>
                    <H7 style={styles.forgotText}>Forgot Password?</H7>
                </Pressable>
                <Button
                    borderRadius={borderRadius.br2}
                    padding={padding.p3}
                >
                    <H5 style={{color: theme.TextLight}}>Login</H5>
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
    loginText: {
        textAlign: "center",
        color: theme.PrimaryDark,
        fontWeight: "600",
        ...margin.my5
    },
    forgotText: {
        ...padding.py5,
        textAlign: "right",
        color: theme.PrimaryDark
    }
});
export default Login;
