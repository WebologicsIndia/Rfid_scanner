import React, {useEffect, useState} from "react";
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
import auth from "@react-native-firebase/auth";
import {loginUrl} from "../../config/api";
import {firstLogin} from "../../store/reducers/userSlice";
import {connect} from "react-redux";


const Login = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect (() => {
        setError("");
    }, [user]);

    const handleLoginDb=(token: any) => {
        setLoading(true);
        fetch(loginUrl, {

            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idToken: token,
                email: user.email
            })
        }).then((resp) => {
            if(resp.status === 200) {
                resp.json().then((data) => {
                    props.firstLogin(data);
                });
            } else {
                resp.json().then((data) => {
                    setError(data.message);
                });
            }
        }). finally(() => {
            setLoading(false);
        });
    };

    const handleLogin = () => {
        const emailRegex = /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(user.email)) {
            setError("Please enter a valid email");
            return;
        }
        setLoading(true);
        auth().signInWithEmailAndPassword(user.email, user.password)
            .then(async (loginResp) => {
                const idToken = await loginResp.user.getIdToken();
                handleLoginDb(idToken);
            })
            .catch((error) => {
                console.log(error);
                if (
                    error.code === "auth/user-not-found" ||
                    error.code === "auth/wrong-password"
                ) {
                    setError("Invalid email or password");
                } else {
                    setError("An error occurred during login");
                }
                setLoading(false);
            });
    };
    const sendResetEmail = async () => {
        await auth().sendPasswordResetEmail(user.email);
    };

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
                <H7 style={styles.error}>{error}</H7>
                <Input
                    placeholder={"Username /  Email"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.mb2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                    onChangeText={(value) => setUser({...user, email: value})}
                />
                <Input
                    placeholder={"Password"}
                    placeholderTextColor={theme.TextLight}
                    inputStyle={{...margin.mt2}}
                    borderRadius={borderRadius.br2}
                    textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                    bgColor={theme.White}
                    borderColor={theme.TextLight}
                    secureTextEntry={true}
                    onChangeText={(value) => setUser({...user, password: value})}
                />
                <Pressable onPress={sendResetEmail}>
                    <H7 style={styles.forgotText}>Forgot Password?</H7>
                </Pressable>
                <Button
                    borderRadius={borderRadius.br2}
                    padding={padding.p3}
                    onPress={handleLogin}
                    loading={loading}
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
        ...margin.mt5
    },
    forgotText: {
        ...padding.py5,
        textAlign: "right",
        color: theme.PrimaryDark
    },
    error: {
        color: theme.Accent,
        // ...margin.mt2
    }
});
export default connect(null, {firstLogin})(Login);
