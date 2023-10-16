import React from "react";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {Image, TouchableOpacity, View} from "react-native";
import DrawerIcon from "../../assets/drawerIcon.svg";
import {theme} from "../../config/theme";
import {H7, H8, padding} from "@WebologicsIndia/react-native-components";
import LinearGradient from "react-native-linear-gradient";
import drawerLogo from "../../assets/drawerLogo.png";
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
                    marginTop: 5

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
                style={[padding.p5, {marginTop: -5}]}
                colors={[theme.PrimaryDark, theme.PrimaryLight]}
                start={{x: 0, y: 0.5}} end={{x: 1, y: 0.5}}
            >
                <View>
                    <Image source={drawerLogo} style={[{height: 65, width: 65}]}/>
                    <H8 style={{color: theme.White}}>
                      Bertrack
                    </H8>
                    <H8 style={{color: theme.PrimaryLight}}>
                    Tag Scanner
                    </H8>
                </View>
            </LinearGradient>
            {props.state.routes.map((route: any, index: any) => {
                return(
                    <CustomDrawerItem
                        key={index}
                        label={route.name}
                        icon={() => <DrawerIcon />}
                        focused={route.name === props.state.routes[props.state.index].name}
                        onPress={() => {
                            props.navigation.navigate(route.name);
                        }}
                    />
                );
            })}
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
