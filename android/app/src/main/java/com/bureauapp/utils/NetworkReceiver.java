package com.bureauapp.utils;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkInfo;
import android.os.Build;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.bureauapp.MainActivity;
import com.facebook.react.modules.network.OkHttpClientProvider;
public class NetworkReceiver extends BroadcastReceiver {
    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void onReceive(Context context, Intent intent) {
        ConnectivityManager connectivityManager =  (ConnectivityManager)
                context.getSystemService(Context.CONNECTIVITY_SERVICE);
        Network[] networks = connectivityManager.getAllNetworks();
        for (final Network network : networks) {
            final NetworkInfo netInfo = connectivityManager.getNetworkInfo(network);
            if (netInfo.getType() == ConnectivityManager.TYPE_MOBILE && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                //Toast.makeText(this, "Connected to mobile NR", Toast.LENGTH_SHORT).show();
                OkHttpClientProvider.setOkHttpClientFactory(new NetworkClientFactory(network));
                break;
            } else if (netInfo.getType() == ConnectivityManager.TYPE_WIFI && netInfo.getState() == NetworkInfo.State.CONNECTED) {
                //Toast.makeText(this, "cONNECTED TO WIFI nr", Toast.LENGTH_SHORT).show();
                OkHttpClientProvider.setOkHttpClientFactory(new NetworkClientFactory(network));
            }
        }
    }
}