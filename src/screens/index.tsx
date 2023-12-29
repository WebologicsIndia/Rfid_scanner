import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import DrawerNavigation from "./Navigation";
import Login from "./Authentication/Login";

const Stack = createNativeStackNavigator();
const Screens = (props: any) => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false
                }}>
                {
                    props.token === null ?
                        (
                            <>
                                <Stack.Screen name={"login"} component={Login} />
                            </>
                        )
                        :
                        (
                            <>
                                <Stack.Screen name={"drawer"} component={DrawerNavigation} />
                            </>
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>


    );
};

export default Screens;
