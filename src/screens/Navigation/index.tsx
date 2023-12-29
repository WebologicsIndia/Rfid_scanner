import React from "react";
import CustomDrawerContent from "../../common/CustomDrawerContent/CustomDrawerContent";
import HomeScreen from "../Home";
import TrackingDrawer from "../Menu";
import InventoryScreens from "../Inventory";
import ClientScreens from "../Clients";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    return (
        <>
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
        </>
    );
};

export default DrawerNavigation;
