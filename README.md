# react-native--firebase

### Memulai project dan menjalankannya
1. Clone project menggunakan git :
```bash
$ git clone https://github.com/openclassprogramming/react-native--firebase.git
```
2. Ikuti tutorial cara menginstall firebase pada react-native,
Saya menggunakan library ini [rnfirebase.io](https://rnfirebase.io/)
3. Jalankan project, dengan buka cmd lalu arahkan path pada project
```bash
$ cd react-native--firebase
$ npm install
$ react-native run-android
```
4. Cara build ke APK
```bash
$ cd android
$ gradlew assembleRelease
```
5. Jika ada update pada folder android
```bash
$ cd android
$ gradlew clean
```

### Download APK
1. [rn-firebase.apk](https://drive.google.com/open?id=1_yJ0237Aw3HuAffvDZNxLRN60ErHjrWs)

### Resource
1. [basic-rn-ocp-key.keystore](https://drive.google.com/open?id=175MIbldTB4CcvnvgWMorslh3Nqy8DmMr)
2. [google-services.json](https://drive.google.com/open?id=1ZEzazFOxwAK0YiiKJSpIoUKQJ6g7d0lQ)

### File Konfigurasi
1. Simpan file `google-services.json` di dalam folder `android/app`
2. Simpan file `basic-rn-ocp-key.keystore` di dalam folder `android/app`
3. Tambahkan code ini di `android/app/build.gradle`
```bash
defaultConfig {
    ........
}
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
splits {
    ........
}
```
4. Tambahkan code ini di `android/app/build.gradle`
```bash
buildTypes {
    release {
        .............
        .............
        signingConfig signingConfigs.release
    }
}
```

### Keystore
1. Tambahkan ini pada file `android/gradle.properties`
```bash
MYAPP_RELEASE_STORE_FILE=basic-rn-ocp-key.keystore
MYAPP_RELEASE_KEY_ALIAS=opc
MYAPP_RELEASE_STORE_PASSWORD=reactnative123
MYAPP_RELEASE_KEY_PASSWORD=reactnative123
```

### Sutrisna 1453
Jika tidak bisa sedekah dengan uang, maka bersedekahlah dengan ilmu pengetahuan