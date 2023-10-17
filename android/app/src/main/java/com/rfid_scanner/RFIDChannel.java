package com.rfid_scanner;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.rscja.deviceapi.RFIDWithUHFUART;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class RFIDChannel implements Serializable, ReactPackage, NativeModule {
    private String TAG = "RFIDChannel";
    private RFIDWithUHFUART reader;

    public RFIDChannel() {
    }

    public void free() {
        Log.d("reader", "Reader: "+reader);
        if (reader != null) {
            reader.free();
            reader = null;
        }
    }

    public RFIDWithUHFUART getReader() {
        if (reader == null) {
            try {
                reader = RFIDWithUHFUART.getInstance();
                Log.d("getReader", "Reader: "+reader);
            } catch (Exception e) {
                reader = null;
            }
        }
        return reader;
    }

    public boolean init()
    {
        return reader.init();
    }

    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactApplicationContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RFIDChannel());
        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return null;
    }

    @NonNull
    @Override
    public String getName() {
        return null;
    }

    @Override
    public void initialize() {

    }

    @Override
    public boolean canOverrideExistingModule() {
        return false;
    }

    @Override
    public void onCatalystInstanceDestroy() {

    }

    @Override
    public void invalidate() {

    }
}

