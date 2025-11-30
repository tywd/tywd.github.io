# 多端架构
## 一、前端**跨端架构细分**
Taro、Uniapp、React Native、Flutter、Electron 均属于「渲染/部署架构」下的跨端架构，只是适配的终端场景不同，具体细分如下：
| 跨端架构细分     | 适配终端                | 核心技术                          |
|------------------|-------------------------|-----------------------------------|
| 多端适配         | 小程序/H5/原生App       | Uniapp、Taro                      |
| 原生App跨端      | iOS/Android原生App      | React Native（RN）、Flutter       |
| 桌面端跨端       | Windows/Mac/Linux桌面端 | Electron                          |

## 二、跨端架构细分（三类）
### 1. 多端适配（小程序/H5/App）：Uniapp/Taro
- **定义**：一套代码编译为多端应用（H5、小程序、App），基于Vue/React语法封装，适配不同端的API和渲染逻辑，解决多端开发重复工作的问题。
- **适用场景**：需要同时开发多端应用（如电商小程序+H5+App、企业应用多端适配）。
- **优势**：一套代码多端运行（降低开发成本）、迭代效率高（一次修改多端生效）、统一技术栈（无需分别学小程序/APP开发）；
- **劣势**：部分端特有功能需单独适配、性能略低于原生应用、部分UI组件需兼容多端样式。
- **完整目录示例（Uniapp + Vue3）**：
```
uniapp-project/
├── manifest.json             # 多端配置（小程序/App/H5）
├── package.json
├── pages.json                # 页面路由配置（多端共用）
├── static/                   # 静态资源
└── src/
    ├── components/           # 通用组件（多端共用）
    │   ├── Button/
    │   └── Card/
    ├── pages/                # 页面（多端共用）
    │   ├── index/            # 首页
    │   │   ├── index.vue
    │   │   └── index.json    # 页面配置（如导航栏）
    │   └── user/             # 用户页
    ├── utils/                # 工具函数（多端适配）
    │   └── request.ts        # 适配多端的请求封装
    ├── App.vue               # 根组件
    └── main.js               # 入口文件
```
- **实际项目类型**：拼多多小程序+H5+App、美团优选小程序、饿了么商家端多端应用。

### 2. 原生App跨端（iOS/Android）：React Native（RN）
- **定义**：基于React语法，通过JS桥接原生组件，生成iOS/Android原生App，兼顾前端开发效率和原生性能。
- **适用场景**：需要原生体验的跨平台App（如社交、工具类原生App）。
- **优势**：前端开发效率、原生组件体验、热更新（无需应用商店审核）；
- **劣势**：桥接层性能损耗、复杂原生功能需写原生代码、版本迭代需适配原生API。
- **完整目录示例（React Native + TypeScript）**：
```
rn-project/
├── .eslintrc.js              # ESLint配置
├── .gitignore
├── app.json                  # RN应用配置（名称、入口、权限）
├── babel.config.js           # Babel配置
├── index.js                  # RN入口文件
├── package.json
├── tsconfig.json             # TS配置
├── android/                  # Android原生工程（自动生成+自定义）
│   ├── app/
│   │   └── src/main/         # Android原生代码（Java/Kotlin）
│   └── build.gradle          # Android构建配置
├── ios/                      # iOS原生工程（自动生成+自定义）
│   ├── rn-project/
│   │   └── AppDelegate.m     # iOS入口配置
│   └── Podfile               # iOS依赖管理
└── src/
    ├── assets/               # 静态资源（图片、字体）
    ├── components/           # 组件（跨端复用）
    │   ├── Button/
    │   │   ├── index.tsx
    │   │   └── styles.ts     # 样式（StyleSheet）
    │   └── Card/index.tsx
    ├── hooks/                # 自定义Hooks（状态管理）
    │   ├── useUser.ts
    │   └── useTheme.ts
    ├── navigation/           # 路由导航（React Navigation）
    │   ├── index.tsx
    │   └── AppNavigator.tsx
    ├── screens/              # 页面（原生渲染）
    │   ├── Home/
    │   │   ├── index.tsx
    │   │   └── styles.ts
    │   └── User/index.tsx
    ├── services/             # 接口请求（Axios）
    │   └── userApi.ts
    └── utils/                # 工具函数
        ├── format.ts
        └── storage.ts        # 本地存储（AsyncStorage）
```
- **实际项目类型**：Instagram App、Facebook App、微信读书App。

### 3. 原生App跨端（iOS/Android）：Flutter
- **定义**：谷歌推出的跨端框架，基于Dart语言，自绘UI（不依赖原生组件），直接编译为原生机器码，性能接近纯原生。
- **适用场景**：高性能跨平台App（如游戏、金融、地图类应用）。
- **优势**：极致性能（自绘UI）、跨端UI一致性、一套代码覆盖iOS/Android/Web/桌面端；
- **劣势**：Dart学习成本、包体积略大、原生功能集成需写插件。
- **完整目录示例（Flutter 3.x）**：
```
flutter-project/
├── .gitignore
├── analysis_options.yaml     # Dart代码校验配置
├── pubspec.yaml              # 依赖/资源配置
├── ios/                      # iOS原生工程
│   └── Runner/               # iOS入口配置
├── android/                  # Android原生工程
│   └── app/                  # Android入口配置
├── lib/                      # Dart代码核心目录
│   ├── main.dart             # 入口文件
│   ├── assets/               # 静态资源（图片、字体）
│   ├── components/           # 自定义组件
│   │   ├── button.dart
│   │   └── card.dart
│   ├── navigation/           # 路由管理
│   │   └── app_router.dart
│   ├── screens/              # 页面
│   │   ├── home_screen.dart
│   │   └── user_screen.dart
│   ├── services/             # 接口请求（Dio）
│   │   └── user_service.dart
│   ├── state/                # 状态管理（Provider/Bloc）
│   │   ├── user_state.dart
│   │   └── theme_state.dart
│   └── utils/                # 工具函数
│       ├── format.dart
│       └── storage.dart
└── web/                      # Web端编译产物（可选）
```
- **实际项目类型**：闲鱼App、腾讯会议App、字节跳动飞书移动端。

### 4. 桌面端跨端（Windows/Mac/Linux）：Electron
- **定义**：基于Chromium+Node.js，用HTML/CSS/JS开发跨平台桌面应用，兼顾前端技术栈和桌面端能力。
- **适用场景**：桌面端工具类应用（如编辑器、客户端、管理工具）。
- **优势**：前端技术栈无门槛、跨平台兼容性好、可调用系统API；
- **劣势**：包体积大、内存占用高、性能略差于纯原生桌面应用。
- **完整目录示例（Electron + React + TypeScript）**：
```
electron-project/
├── .eslintrc.js
├── .gitignore
├── package.json
├── tsconfig.json
├── main/                     # 主进程（Node.js环境，控制窗口）
│   ├── index.ts              # 主进程入口
│   ├── ipc.ts                # 主-渲染进程通信
│   └── windowManager.ts      # 窗口管理
├── preload/                  # 预加载脚本（桥接主-渲染进程）
│   └── index.ts
├── renderer/                 # 渲染进程（前端页面，React）
│   ├── index.html            # 渲染进程入口HTML
│   ├── src/
│   │   ├── assets/           # 静态资源
│   │   ├── components/       # React组件
│   │   ├── pages/            # 页面
│   │   ├── hooks/            # 自定义Hooks
│   │   ├── utils/            # 工具函数
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── vite.config.ts        # 渲染进程构建配置
└── build/                    # 打包配置（图标、安装包）
    ├── icon.icns             # Mac图标
    └── icon.ico              # Windows图标
```
- **实际项目类型**：VS Code、Figma桌面端、微信开发者工具、飞书桌面端。

## 三、主流架构组合使用示例（补充完整目录结构）
每个组合示例包含「架构组合、适用场景、核心优势、完整目录结构」：

### 组合1：多端电商应用（RN + 模块化 + 混合状态 + 原子化设计）
- **架构组合**：React Native（原生App） + 模块化 + React Hooks/Redux（混合状态） + 原子化设计（Tamagui） + 工程化规范
- **适用场景**：电商原生App（如拼多多App）
- **核心优势**：
  1. RN实现iOS/Android原生体验；
  2. 模块化拆分业务代码（接口/工具/组件）；
  3. 混合状态管理兼顾轻量与全局共享；
  4. 原子化设计（Tamagui）保证跨端UI统一。
- **完整目录结构**：
```
rn-e-commerce/
├── .eslintrc.js              # 工程化规范
├── .husky/
├── app.json                  # RN配置
├── package.json
├── tsconfig.json
├── android/                  # Android原生工程
├── ios/                      # iOS原生工程
└── src/
    ├── assets/               # 静态资源
    ├── components/           # 原子化组件（Tamagui）
    │   ├── atoms/            # 原子组件（Button/Input）
    │   └── molecules/        # 分子组件（SearchBar）
    ├── navigation/           # RN路由
    │   └── AppNavigator.tsx
    ├── screens/              # 页面（首页/购物车）
    │   ├── Home/
    │   │   ├── index.tsx
    │   │   └── hooks.ts      # 局部状态（列表）
    │   └── Cart/
    │       ├── index.tsx
    │       └── hooks.ts      # 局部状态（勾选）
    ├── services/             # 模块化接口
    │   ├── userApi.ts
    │   └── goodsApi.ts
    ├── store/                # Redux全局状态（购物车/用户）
    │   └── slices/
    ├── styles/               # Tamagui原子化样式配置
    │   └── theme.ts
    └── utils/                # 模块化工具
        ├── format.ts
        └── storage.ts
```

### 组合2：桌面端工具（Electron + 模块化 + 局部状态 + 原子化设计）
- **架构组合**：Electron + 模块化（React） + React Hooks（局部状态） + 原子化设计（Tailwind） + 工程化规范
- **适用场景**：桌面端开发工具（如VS Code插件、接口调试工具）
- **核心优势**：
  1. Electron用前端技术栈开发桌面应用，降低学习成本；
  2. 模块化拆分主/渲染进程代码，职责清晰；
  3. 原子化设计保证UI统一，开发效率高；
  4. 局部状态管理轻量无冗余。
- **完整目录结构**：
```
electron-tool/
├── .eslintrc.js              # 工程化规范
├── .husky/
├── package.json
├── tsconfig.json
├── main/                     # Electron主进程
│   ├── index.ts              # 窗口管理
│   └── ipc.ts                # 主-渲染通信
├── preload/                  # 预加载脚本
│   └── index.ts
└── renderer/                 # 渲染进程（React + Tailwind）
    ├── index.html
    ├── src/
    │   ├── assets/           # 静态资源
    │   ├── components/       # 原子化组件（Button/Form）
    │   ├── pages/            # 工具页面（首页/设置）
    │   ├── hooks/            # 局部状态（表单/列表）
    │   ├── utils/            # 模块化工具（接口请求）
    │   ├── styles/           # Tailwind入口
    │   │   └── globals.css
    │   ├── App.tsx
    │   └── main.tsx
    └── vite.config.ts
```