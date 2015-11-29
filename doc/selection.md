[toc]

## 工具
### [IDE][1]
* 官方推荐 [AndroidStudio][2]
* 如果开发Hybird客户端,可能会用到 [WebStorm][3]


## 服务
###LeanCloud
* 消息推送，聊天、短信、云存储服务：

### Fabric
* Crash 监控、实时 log 收集、数据统计

### Fir.im
* 测试分发：需要在工程里填写检查更新 URL 提交 App 后请设置访问密码 `DeepPass`

### TBC


## 第三方
该部分包括上述 [服务](##服务)
### Gradle

```
 	//监控内存泄露
    debugCompile 'com.squareup.leakcanary:leakcanary-android:1.3.1'
    releaseCompile 'com.squareup.leakcanary:leakcanary-android-no-op:1.3.1'
	//注解初始化布局
    compile 'com.jakewharton:butterknife:7.0.1'
    //日志
    compile 'com.jakewharton.timber:timber:3.1.0'
    //调试模块 (需配合chrome使用)
    compile 'com.facebook.stetho:stetho:1.2.0'
    compile 'com.facebook.stetho:stetho-okhttp:1.2.0'
    //网络
    compile 'com.squareup.okhttp:okhttp:2.4.0'
    //图片
    compile 'com.squareup.picasso:picasso:2.5.2'
	//事件总线
    compile 'de.greenrobot:eventbus:2.4.0'
```

### 源码
* [Android-PullToRefresh][4] 下拉刷新,上拉加载更多
* [cordova-android-3.5.x][5] Hybird客户端桥接库
* TBC






[1]: http://tools.android.com/download/studio      			"AndroidStudio"
[2]: http://developer.android.com/tools/studio/index.html	"AndroidStudio"
[3]: https://www.jetbrains.com/webstorm/					"WebStorm"
[4]: https://github.com/chrisbanes/Android-PullToRefresh	"Android-PullToRefresh"
[5]: https://github.com/apache/cordova-android/tree/3.5.x	"Cordova"
