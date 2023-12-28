import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ClientDetails from "./screens/ClientDetails";
import AddNewClient from "./screens/AddNewClient";

const Stack = createNativeStackNavigator();
const ClientScreens = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                animation: "slide_from_right"
            }}
        >
            <Stack.Screen name="clientDetails" component={ClientDetails} />
            <Stack.Screen name="addNewClient" component={AddNewClient} />
        </Stack.Navigator>
    );
};

export default ClientScreens;
