import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Home";
import TrackingDrawer from "./Menu";
import CustomDrawerContent from "../common/CustomDrawerContent/CustomDrawerContent";

const Drawer = createDrawerNavigator();
const Screens = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}
                drawerContent={(props) => <CustomDrawerContent {...props}/>}
            >
                <Drawer.Screen
                    name="Tag Scanner"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Inventories"
                    component={TrackingDrawer}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};
export default Screens;
