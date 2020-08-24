package com.bureauapp.utils;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.NetworkRequest;
import android.os.Build;

import androidx.annotation.RequiresApi;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import static android.content.Context.CONNECTIVITY_SERVICE;


public class NetworkClientFactory implements OkHttpClientFactory {
    private Network network;

    public NetworkClientFactory(Network network) {
        this.network = network;
    }
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public OkHttpClient createNewNetworkModuleClient() {
        OkHttpClient.Builder builder = OkHttpClientProvider.createClientBuilder();
        return builder.socketFactory(network.getSocketFactory()).build();
    }
}
