## Change Name

Go to: android/app/src/res/values/strings.xml

Edit your app name inside the  > <

```
    <resources>
        <string name="app_name">you_aplication_name</string>
    </resources>

```
## Change Icon

Go to: [Generate icons and splash](https://apetools.webprofusion.com/#/tools/imagegorilla)

Now, inside android/app/src/res, you'll delete all the folders excepting values. And then paste your icons and splash folders.

On AndroidManifest.xml you'll change the content of this lines and leave like this:

```
    android:icon="@drawable/icon"
    android:roundIcon="@drawable/icon"

```

## Change Splash

Go to: android/app/src/res/values/styles.xml

Now, put the follow lines below style tag:

```
    <style name="SplashTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:windowBackground">@drawable/screen</item>
    </style>

```

On AndroidManifest.xml you'll put the follow line above activity tag

```

    android:theme="@style/SplashTheme"

```