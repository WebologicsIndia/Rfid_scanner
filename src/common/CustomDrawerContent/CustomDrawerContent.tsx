import React from "react";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {TouchableOpacity, View} from "react-native";
import HamburgerSVG from "../../assets/hamburger.svg";
import {theme} from "../../config/theme";
import {H7, height, padding} from "@WebologicsIndia/react-native-components";
import LinearGradient from "react-native-linear-gradient";


const CustomDrawerItem = (props: { focused: any, label: any, icon: any, onPress: any }) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 16,
                    backgroundColor: props.focused ? theme.PrimaryDark + 80 : theme.PrimaryDark + 10,
                    gap: 10,
                    marginTop: 10

                }}
            >
                {props.icon()}
                <H7 style={{
                    color: theme.PrimaryDark,
                    fontWeight: props.focused ? "500" : "400"
                }}>
                    {props.label}
                </H7>
            </View>
        </TouchableOpacity>
    );
};
const CustomDrawerContent = (props: any) => {
    return (
        <DrawerContentScrollView {...props}>
            <LinearGradient
                style={[height.h4, padding.py5, {backgroundColor: theme.PrimaryDark}]}
                colors={[theme.PrimaryDark, theme.PrimaryLight]}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
            >
                <View style={padding.p3}>
                    <H7>Logo</H7>
                    <H7 style={{fontWeight: "500", color: "white"}}>
                      App Name
                    </H7>
                </View>
            </LinearGradient>
            {props.state.routes.map((route: any, index: any) => (
                <CustomDrawerItem
                    key={index}
                    label={route.name}
                    icon={() => <HamburgerSVG />}
                    focused={route.name === props.state.routes[props.state.index].name}
                    onPress={() => {
                        props.navigation.navigate(route.name);
                    }}
                />
            ))}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
