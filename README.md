# flowings

libray to frontend image synthesis & 2d canvas renderer

### install

| OS   | Command                                                                            |
| ---- | ---------------------------------------------------------------------------------- |
| OS X | `brew install pkg-config cairo pango libpng jpeg giflib librsvg & npm i -g canvas` |

### TODO

接下来会先做功能模块划分和 API 设计，目前已知至少会支持以下特性

- 绘图元素合成、导出
- 不同速率的动画队列
- 滤镜
- 碰撞检测
- WebGL

### API

1. `createImage`

> 通用绘图接口，用于自定义绘图、成就绘图、打卡图等。支持使用 z 进行绘制分层，会按照 z 进行排序。默认先画图片，其次矩形 > 线条 > 文字

#### Basic

| 字段          | 类型    | 描述                | 可选 |
| ------------- | ------- | ------------------- | ---- |
| width         | float64 | 画布的宽度          |
| height        | float64 | 画布的高度          |
| file_name     | string  | 上传到 oss 的文件名 | ✅   |
| business_name | string  | ...                 | ✅   |
| image_type    | int     | 图片类型            | ✅   |
| wechat_openid | string  | 用户 id             | ✅   |
| trace_id      | string  | ...                 | ✅   |
| send          | bool    | 是否发送            | ✅   |

#### Image

| 字段          | 类型    | 描述                                   | 可选 |
| ------------- | ------- | -------------------------------------- | ---- |
| name          | string  | 用于标注图片的作用                     | ✅   |
| x             | float64 | x 坐标，相对于左上角                   |
| y             | float64 | y 坐标                                 |
| z             | int32   | z 轴，数值大在上层，与 zindex 保持一致 | ✅   |
| width         | int32   | 实际绘制宽度                           |
| height        | int32   | 实际绘制高度                           |
| image_url     | string  | 图片的源地址                           |
| resize        | bool    | 是否使用 oss 缩放                      | ✅   |
| expire        | int32   | 缓存过期时间，如果为 0 则不缓存        | ✅   |
| border_radius | int32   | 图片圆角，width / 2 即为圆             | ✅   |
| clip          | Clip    | 见下一张表                             | ✅   |

#### Clip

| 字段   | 类型  | 描述                         | 可选 |
| ------ | ----- | ---------------------------- | ---- |
| x      | int32 | 切图起始坐标，相对图片左上角 |
| y      | int32 | 切图起始坐标，相对图片左上角 |
| width  | int32 | 裁剪尺寸                     |
| height | int32 | 裁剪尺寸                     |

#### Text

| 字段        | 类型    | 描述                                     | 可选 |
| ----------- | ------- | ---------------------------------------- | ---- |
| x           | float64 | x 坐标，相对于左上                       |
| y           | float64 | y 坐标                                   |
| z           | int32   | z 轴，数值大在上                         |
| size        | int32   | 字号                                     |
| color       | string  | 颜色，仅支持 rgba 和 hex                 |
| content     | string  | 用于绘制的文本                           |
| line_height | int32   | 行高                                     | ✅   |
| font_style  | int32   | 文字的粗度                               | ✅   |
| font_family | string  | 字体                                     | ✅   |
| align       | int32   | 默认左对齐, 1-右对齐, 2-居中, 3-两端对齐 | ✅   |
| limit       | float64 | 文字框最大宽度，用于折行                 |

#### Line

| 字段       | 类型    | 描述                | 可选 |
| ---------- | ------- | ------------------- | ---- |
| color      | string  | 线条的颜色，同 text |
| x1         | float64 | 线条起点            |
| y1         | float64 | 线条起点            |
| x2         | float64 | 线条终点            |
| y2         | float64 | 线条终点            |
| line_width | float64 | 笔画粗度            |
| dashed     | bool    | 是否是虚线          | ✅   |

#### Rect

| 字段       | 类型    | 描述                          | 可选 |
| ---------- | ------- | ----------------------------- | ---- |
| name       | string  | 用于标注                      | ✅   |
| x          | float64 | 绘制的起点，x                 |
| y          | float64 | 绘制的起点，y                 |
| width      | float64 | 矩形的宽度                    |
| height     | float64 | 矩形高度                      |
| background | string  | 背景色，如果需要透明使用 rgba | ✅   |
| radius     | []int32 | 与图片不同，支持不同的圆角    | ✅   |

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
