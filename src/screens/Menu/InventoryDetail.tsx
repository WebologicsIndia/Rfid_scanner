import React, {useState} from "react";
import {Container, H7, Insets} from "@WebologicsIndia/react-native-components";
import {theme} from "../../config/theme";

const InventoryDetail = (props:any) => {
    const [insets] = useState(Insets.getInsets());
    console.log("props", props.route.params);
    return (
        <Container
            bottom={insets.bottom * 1.6}
            backgroundColor={theme.White}
            header
            headerText={"Inventory Detail"}
            headerColor={theme.Primary}
            back
            navigation={props.navigation}

        >
            <H7 style={{color: theme.PrimaryDark}}>hello</H7>
        </Container>
    );
};

export default InventoryDetail;
