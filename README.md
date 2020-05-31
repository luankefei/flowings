# flowings

> libray to frontend image synthesis & 2d canvas renderer

### 代码目录规划，参考 golang-canvas 和 not-snow-mountain

```
src
canvas 绘图主业务逻辑
config 配置文件
libs 字体加载，数据库连接，阿里云等
main 项目入口
middleware web 框架相关中间件
protos protobuf，grpc、grpc-gateway使用
routes api 路由（已废弃）
services api 相关数据逻辑
static 静态资源
test demo
views 页面模板

---

main 种子模块
dom dom 相关
cache 数据缓存、事件、快照
event 事件系统、移动事件扩展
component html组件
frame_timer 帧计时器，游戏时间，fps
sprite 绘制精灵
high_socre 计分板
audio 音频支持
control 游戏控制，start，stop，pause
loader 资源加载

```

### 接口参考 golang-canvas

```

var a = {
  basic: {
    width: 1125,
    height: 1125,
    file_name: "test_mask.png",
    business_name: "checkin_version4_3",
    image_type: 1,
    wechat_openid: "",
    trace_id: "",
    send: false,
    user_id: 83944,
  },
  draw_info: {
    image: [
      {
        name: "background",
        x: 0,
        y: 0,
        z: 0,
        width: 1125,
        height: 1125,
        image_url:
          "https://img.laiye.com/checkinAlbum_20200316083737_htqvLACrln.jpg",
        resize: true,
        expire: 3600,
        clip: {
          x: 30,
          y: 30,
          width: 370,
          height: 370,
        },
      },
    ],
    text: [
      {
        x: 967.5,
        y: 120,
        size: 30,
        lineHeight: 30,
        color: "#ffffff",
        content: "2020.03",
        fontStyle: 700,
        fontFamily: "PingFang",
        align: 1, // right
        limit: 73,
        z: 1,
      },
    ],
    line: [
      {
        color: "#ccc",
        x1: 300,
        y1: 300,
        x2: 500,
        y2: 300,
        lineWidth: 1.0,
        dashed: false,
      },
    ],
    rect: [
      {
        name: "textAreaRect",
        x: 30,
        y: 550,
        width: 690,
        height: 170,
        background: "#FFF",
        opacity: 0.8,
        radius: [30, 30, 30, 30],
      },
    ],
  },
};

```

### 工程化工具

- linter
- prettier
- precommit
- conventional / changelog
- livereload / hotreload
- module bundler / uglify
- jest
- npm

### Format of the commit message

- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, …)
- refactor
- test (when adding missing tests)
- chore (maintain)
