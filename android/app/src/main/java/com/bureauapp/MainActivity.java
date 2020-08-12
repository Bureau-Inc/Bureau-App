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
import android.widget.Toast;

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
        registerNetworkReceiver();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            attachToCellular(this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        unregisterNetworkChanges();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "BureauApp";
    }

    private void registerNetworkReceiver() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            registerReceiver(mNetworkReceiver, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            registerReceiver(mNetworkReceiver, new IntentFilter(ConnectivityManager.CONNECTIVITY_ACTION));
        }
    }
    protected void unregisterNetworkChanges() {
        try {
            unregisterReceiver(mNetworkReceiver);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
        }
    }


    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void attachToCellular(Context context) {
        ConnectivityManager connectivityManager = (ConnectivityManager) context.getSystemService(CONNECTIVITY_SERVICE);
        connectivityManager.setNetworkPreference(NetworkCapabilities.TRANSPORT_CELLULAR);
        NetworkRequest request = new NetworkRequest.Builder()
                .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET).build();
        connectivityManager.requestNetwork(request, new ConnectivityManager.NetworkCallback() {
            @Override
            public void onAvailable(final Network network) {
                Toast.makeText(MainActivity.this, "Mobile data available", Toast.LENGTH_SHORT).show();
                OkHttpClientProvider.setOkHttpClientFactory(new NetworkClientFactory(network));
            }
            @Override
            public void onLost(Network network) {
                super.onLost(network);
               Toast.makeText(MainActivity.this, "Mobile data lost", Toast.LENGTH_SHORT).show();
                connectToAvailableNetwork();
            }
            @Override
            public void onUnavailable() {
                super.onUnavailable();
                Toast.makeText(MainActivity.this, "Mobile data not available", Toast.LENGTH_SHORT).show();
                connectToAvailableNetwork();
            }
        });
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    public void connectToAvailableNetwork() {
        ConnectivityManager connectivityManager =  (ConnectivityManager)
                this.getSystemService(Context.CONNECTIVITY_SERVICE);
        Network[] networks = connectivityManager.getAllNetworks();
        for (final Network network : networks) {
            final NetworkInfo netInfo = connectivityManager.getNetworkInfo(network);
            if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                Toast.makeText(MainActivity.this, "Connected to Mobile", Toast.LENGTH_SHORT).show();
                OkHttpClientProvider.setOkHttpClientFactory(new NetworkClientFactory(network));
                break;
            } else if (netInfo.getType() == ConnectivityManager.TYPE_WIFI && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                Toast.makeText(MainActivity.this, "Connected to Wifi", Toast.LENGTH_SHORT).show();
                OkHttpClientProvider.setOkHttpClientFactory(new NetworkClientFactory(network));
            }
        }
    }
}
