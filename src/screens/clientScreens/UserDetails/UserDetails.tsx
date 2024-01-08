import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {borderRadius, Container, H7, Input, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {connect} from "react-redux";
import {fetchWithToken} from "../../../config/helper";
import {clientUrl} from "../../../config/api";

const UserDetails = (props: any) => {
    const [insets] = useState(Insets.getInsets());
    // useEffect(() => {
    //     fetchWithToken(clientUrl, "GET").then((resp) => {
    //         if (resp.status === 200) {
    //             resp.json().then((data) => {
    //                 console.log("data", data.results);
    //             });
    //         }
    //     });
    // }, []);
    console.log("userDetails", props.userDetails);
    return (
        <Container
            bottom={insets.bottom * 1.5}
            backgroundColor={theme.White}
            header
            headerColor={theme.Primary}
            headerTextStyle={styles.headerText}
            headerText={"User Details"}
            addIcon={<Pressable onPress={() => props.navigation.openDrawer()}><HamburgerSVG /></Pressable>}
            style={styles.container}
        >
            <H7 style={{color: theme.PrimaryDark}}> user Details </H7>
            <Input
                placeholder={"Name"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                // onChangeText={(value) => setUser({...user, email: value})}
                editable={false}
            />
            <Input
                placeholder={"Email"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                // onChangeText={(value) => setUser({...user, email: value})}
                editable={false}
            />
            <Input
                placeholder={"Address"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                // onChangeText={(value) => setUser({...user, email: value})}
                editable={false}
            />
            <Input
                placeholder={"Is Active"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                // onChangeText={(value) => setUser({...user, email: value})}
                editable={false}
            />
        </Container>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...padding.py3
    },
    headerText: {
        fontWeight: "600"
    }
});
const mapStateToProps = (state: any) => {
    return {
        userDetails: state.user.user
    };
};
export default connect(mapStateToProps)(UserDetails);
