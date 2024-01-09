import React, {useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {
    borderRadius,
    Container,
    H3,
    Input,
    Insets,
    margin,
    padding
} from "@WebologicsIndia/react-native-components";
import {theme} from "../../../config/theme";
import HamburgerSVG from "../../../assets/hamburger.svg";
import {connect} from "react-redux";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Icon from "react-native-vector-icons/Ionicons";

const UserClientDetails = (props: any) => {
    console.log(props.userDetails);

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
            <View style={{flexDirection: "row", alignItems: "center", ...margin.mb5}}>
                <Pressable
                    onPress={() => props.navigation.navigate("Tag Scanner")}
                    style={[borderRadius.circle, padding.p1, {
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: theme.PrimaryDark

                    }]}>
                    <Icon name={"chevron-back-outline"} size={20} color={theme.PrimaryDark} />
                </Pressable>
                <View style={{flex: 11}}>
                    <H3 style={{
                        color: theme.PrimaryDark,
                        textAlign: "center",
                        fontWeight: "600",
                        textTransform: "capitalize"
                    }}>
            User Details
                    </H3>
                </View>
            </View>
            <Input
                placeholder={"Client Name"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.client.name.toUpperCase()}
                floatingPlaceholder={true}
            />
            <Input
                placeholder={"Representative"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.user.name.toUpperCase()}
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
                value={props?.userDetails?.user?.phone.toUpperCase()}
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
                value={props?.userDetails?.client.email.toUpperCase()}
                floatingPlaceholder={true}
            />
            <Input
                placeholder={"Address"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.client.address.toUpperCase()}
                floatingPlaceholder={true}
            />
            <Input
                placeholder={"Is Active"}
                placeholderTextColor={theme.TextLight}
                inputStyle={{...margin.mb2}}
                borderRadius={borderRadius.br2}
                textStyle={[padding.px2, {color: theme.PrimaryDark}]}
                bgColor={theme.White}
                borderColor={theme.TextLight}
                editable={false}
                value={props?.userDetails?.client.isActive.toString().toUpperCase()}
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
        userDetails: state.user
    };
};
export default connect(mapStateToProps)(UserClientDetails);
