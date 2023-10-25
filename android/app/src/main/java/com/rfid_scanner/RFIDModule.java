package com.rfid_scanner;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.rscja.deviceapi.RFIDWithUHFUART;
import com.facebook.react.bridge.Callback;
import com.rscja.deviceapi.entity.UHFTAGInfo;
import com.rscja.deviceapi.exception.ConfigurationException;
//import com.rscja.deviceapi.entity


public class RFIDModule  extends ReactContextBaseJavaModule {

    private RFIDWithUHFUART reader;

    public RFIDModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RFIDModule";
    }

    @ReactMethod
    public void init() {
        try {
//            reader = RFIDWithUHFUART.getInstance();
            reader.init();
            reader.setPower(5);
            reader.isPowerOn();
        } catch (Exception e) {
            reader = null;
        }

    }

    @ReactMethod
    public void free() {
        if (reader != null) {
            reader.free();
            reader = null;
        }
    }
@ReactMethod
    public void readTag(Callback callback) {
    Log.d("Tag", "Uperwalatag: " + reader);
    if (reader != null) {
        Log.d("Tag", "tag: " + reader);
        UHFTAGInfo tagInfo = reader.readTagFromBuffer();
        Log.d("tagData", "tagInfo: " + tagInfo);
        if (tagInfo != null) {
            String tagData = tagInfo.getEPC();
            Log.d("tagData", "tagData: " + tagData);
            callback.invoke(tagData);
        } else {
            reader.free();
            reader = null;
            init();
            callback.invoke();
        }
    } else {
        callback.invoke();

    }
}

    @ReactMethod
    public void writeTag(String epcData, Callback successCallback, Callback errorCallback) {
        if (reader != null) {

            boolean result = reader.writeDataToEpc(epcData, "NewDataToWrite");
            if (result) {
                successCallback.invoke("Write successful");
            } else {
                errorCallback.invoke("Write failed");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }

@ReactMethod
    public void startInventory() {
    try {
        reader = RFIDWithUHFUART.getInstance();
//        reader.init();
//        reader.setPower(10);
//        reader.isPowerOn();
        Log.d("Tag", "tagInventory: " + reader);
        if (reader != null) {
            reader.startInventoryTag();
        } else {
            Log.d("InventoryTag", "Tag Not initialized");
        }
    } catch (ConfigurationException ex) {
        throw new RuntimeException(ex);
    }
};

@ReactMethod
    public void stopInventory(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            boolean result = reader.stopInventory();
            if (result) {
                successCallback.invoke("Inventory stopped");
            } else {
                errorCallback.invoke("Failed to stop inventory");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }
@ReactMethod
    public void readTagFromBuffer(Callback successCallback, Callback errorCallback) {
        if (reader != null) {
            UHFTAGInfo tagInfo = reader.readTagFromBuffer();
            if (tagInfo != null) {
                // You can access tag information from the UHFTAGInfo object.
                String epc = tagInfo.getEPC(); // EPC code of the tag
                String tid = tagInfo.getTid(); // TID code of the tag
                // You can access more information such as RSSI, frequency, etc.

                successCallback.invoke(tagInfo);
            } else {
                errorCallback.invoke("No tag data available in the buffer");
            }
        } else {
            errorCallback.invoke("RFID scanner not initialized");
        }
    }

}
