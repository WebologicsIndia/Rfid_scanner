import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Home";
import InventoryScreens from "./Menu";
import CustomDrawerContent from "../common/CustomDrawerContent/CustomDrawerContent";
import {theme} from "../config/theme";

const Drawer = createDrawerNavigator();
const Screens = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    headerStatusBarHeight: 0,
                    headerStyle: {
                        backgroundColor: theme.Primary,
                    },
                    headerTintColor: theme.White,
                }}
                drawerContent={(props) => <CustomDrawerContent {...props}/>}
            >
                <Drawer.Screen
                    name="Tag Scanner"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Inventories"
                    component={InventoryScreens}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default Screens;
