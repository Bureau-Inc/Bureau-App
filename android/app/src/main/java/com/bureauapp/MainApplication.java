package com.bureauapp;

import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.faizal.OtpVerify.RNOtpVerifyPackage;
import org.linusu.RNGetRandomValuesPackage;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.clipboard.ClipboardPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

       @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      //packages.add(new RNGetRandomValuesPackage());
      // packages.add((ReactPackage) new SvgPackage());
      // packages.add(new RNGestureHandlerPackage());
      // packages.add(new ClipboardPackage());
      // packages.add(new RNCWebViewPackage());
      // packages.add(new NetworkModulePackage());
      // packages.add(new RNOtpVerifyPackage());

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
