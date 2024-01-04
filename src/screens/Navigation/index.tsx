import React from "react";
import CustomDrawerContent from "../../common/CustomDrawerContent/CustomDrawerContent";
import HomeScreen from "../Home";
import TrackingDrawer from "../Menu";
import InventoryScreens from "../Inventory";
import ClientScreens from "../Clients";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {connect} from "react-redux";
import {login} from "../../store/reducers/userSlice";
import ClientHomeScreen from "../clientScreens/HomeScreen/HomeScreen";
import ClientTrackingDrawer from "../clientScreens/Menu/Index";

const Drawer = createDrawerNavigator();
const DrawerNavigation = (props: any) => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                {
                    props?.user?.isClient ?
                        <>
                            <Drawer.Screen
                                name=" Tag Scanner"
                                component={ClientHomeScreen}
                            />
                            <Drawer.Screen
                                name="Batches"
                                component={ClientTrackingDrawer}
                            />
                        </>
                        :

                        <>
                            <Drawer.Screen
                                name="Tag Scanner"
                                component={HomeScreen}
                            />
                            <Drawer.Screen
                                name="Batches"
                                component={TrackingDrawer}
                            />
                            <Drawer.Screen
                                name="Inventory"
                                component={InventoryScreens}
                            />
                            <Drawer.Screen
                                name="Clients"
                                component={ClientScreens}
                            />
                        </>

                }

            </Drawer.Navigator>

        </>
    );
};
const mapStateToProps = (state: { user: { user: any; }; }) => ({
    user: state.user.user
});

export default connect(mapStateToProps, login)(DrawerNavigation);
