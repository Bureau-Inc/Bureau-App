package com.bureauapp;

import android.content.Context;
import android.content.IntentFilter;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkInfo;
import android.net.NetworkRequest;
import android.os.Build;
import android.os.Bundle;
import android.os.StrictMode;

import androidx.annotation.RequiresApi;

import com.bureauapp.utils.NetworkClientFactory;
import com.bureauapp.utils.NetworkReceiver;
import com.facebook.react.ReactActivity;
import com.facebook.react.modules.network.OkHttpClientProvider;

public class MainActivity extends ReactActivity {
    private NetworkReceiver mNetworkReceiver;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy); 
        mNetworkReceiver = new NetworkReceiver();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "BureauApp";
    }
}
