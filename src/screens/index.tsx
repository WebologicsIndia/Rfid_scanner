import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./Home";
import TrackingDrawer from "./Menu";
import CustomDrawerContent from "../common/CustomDrawerContent/CustomDrawerContent";
import InventoryScreens from "./Inventory";
import ClientScreens from "./Clients";


const Drawer = createDrawerNavigator();
const Screens = () => {

    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen
                    name="Tag Scanner"
                    component={HomeScreen}
                />
                <Drawer.Screen
                    name="Batches"
                    component={TrackingDrawer}
                />
                <Drawer.Screen
                    name="inventory"
                    component={InventoryScreens}
                />
                <Drawer.Screen
                    name="clients"
                    component={ClientScreens}
                />

            </Drawer.Navigator>
        </NavigationContainer>


    );
};

export default Screens;
