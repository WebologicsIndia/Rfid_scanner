import React, {useState} from "react";
import {theme} from "../../config/theme";
import {Pressable, StyleSheet} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";
import {borderRadius, Container, H3, Input, Insets, margin, padding} from "@WebologicsIndia/react-native-components";
import {connect} from "react-redux";

const UserDetails = (props: any) => {
    const [insets] = useState(Insets.getInsets());
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
            <H3 style={{
                color: theme.PrimaryDark,
                textAlign: "center", ...margin.mb5,
                fontWeight: "600",
                textTransform: "capitalize"
            }}>
        user Details
            </H3>
            <Input
                placeholder={"Name"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.name.toUpperCase()}
                floatingPlaceholder={true}
            />
            <Input
                placeholder={"Email"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.email.toUpperCase()}
                floatingPlaceholder={true}
            />
            <Input
                placeholder={"Phone"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.phone.toUpperCase()}
                floatingPlaceholder={true}
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
