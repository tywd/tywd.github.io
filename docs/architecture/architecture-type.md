---
title: 前端架构核心分类维度
date: 2025-11-30
tags: [前端架构, 架构核心分类维度, 代码组织架构, 工程管理架构, 状态管理架构, 渲染/部署架构, 设计驱动架构]
---

# 前端架构分类
本文将记录前端架构的核心分类维度，帮助开发者更好地理解前端架构的分类和选择。

## 一、前端架构的核心分类维度
前端架构的分类围绕「解决的核心问题」划分，避免混乱，核心维度如下：
| 分类维度         | 核心解决问题                          | 典型架构/方案                          |
|------------------|---------------------------------------|----------------------------------------|
| 代码组织架构     | 代码如何拆分、分层、复用（基础层）    | 模块化、组件化、MVVM分层               |
| 工程管理架构     | 多包/多应用如何管理、项目规范如何落地  | Monorepo、微前端、工程化规范体系       |
| 状态管理架构     | 数据如何存储、共享、修改              | 集中式状态管理（Pinia/Redux）、局部状态管理 |
| 渲染/部署架构    | 页面如何渲染、适配多端/优化性能/SEO   | CSR、SSR、SSG、架构（细分三类） |
| 设计驱动架构     | 组件如何设计、极致复用                | 原子化设计架构                         |

## 二、各分类下主流架构（流行常用）
每个架构包含**定义、适用场景、优劣势、完整目录示例、实际项目类型**，目录示例贴近真实企业级项目结构：

### （一）代码组织架构（所有项目的基础）
#### 1. 模块化架构（ESM 标准）
- **定义**：以「模块」为单元拆分代码，通过 `import/export` 隔离作用域，解决全局变量污染、代码冗余问题，是现代前端的底层基础（ES6 ESM 为行业标准）。
- **适用场景**：所有现代前端项目（Vue/React/Angular），无场景限制。
- **优势**：作用域隔离、代码复用性高、可按需加载、便于团队协作拆分任务；
- **劣势**：需遵循模块化规范，新手易出现循环依赖、路径别名配置错误等问题。
- **完整目录示例（Vue3 + Vite + TypeScript）**：
```
vue3-modular-project/
├── .env.development          # 开发环境变量
├── .env.production           # 生产环境变量
├── .gitignore                # Git忽略配置
├── index.html                # 入口HTML模板
├── node_modules/             # 第三方依赖
├── package.json              # 依赖/脚本配置
├── pnpm-lock.yaml            # 依赖锁文件（pnpm）
├── public/                   # 不被Vite处理的静态资源
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── api/                  # 接口模块（按业务维度拆分）
│   │   ├── index.ts          # 接口统一导出
│   │   ├── types/            # 接口参数/返回值类型
│   │   │   ├── user.d.ts
│   │   │   └── goods.d.ts
│   │   ├── user.ts           # 用户业务接口
│   │   └── goods.ts          # 商品业务接口
│   ├── assets/               # 被Vite处理的静态资源
│   │   ├── css/
│   │   │   ├── global.css    # 全局样式
│   │   │   └── reset.css     # 样式重置
│   │   ├── fonts/            # 字体文件
│   │   └── images/           # 图片资源
│   ├── components/           # 通用组件模块
│   │   ├── Button/
│   │   │   ├── index.vue
│   │   │   └── style.scss
│   │   └── Card/index.vue
│   ├── composables/          # Vue3组合式函数（逻辑复用）
│   │   ├── useRequest.ts     # 请求封装逻辑
│   │   └── useUser.ts        # 用户相关逻辑
│   ├── router/               # 路由模块
│   │   ├── index.ts          # 路由配置
│   │   └── guard.ts          # 路由守卫
│   ├── store/                # 状态管理模块（Pinia）
│   │   └── index.ts
│   ├── types/                # 全局类型定义
│   │   └── global.d.ts
│   ├── utils/                # 工具函数模块
│   │   ├── format.ts         # 格式化工具
│   │   ├── request.ts        # Axios封装
│   │   └── storage.ts        # 本地存储封装
│   ├── views/                # 页面视图模块
│   │   ├── Home/
│   │   │   ├── components/   # 页面私有组件
│   │   │   │   └── HomeBanner.vue
│   │   │   ├── index.vue
│   │   │   └── hooks.ts      # 页面私有hooks
│   │   └── User/index.vue
│   ├── App.vue               # 根组件
│   └── main.ts               # 入口文件
├── tsconfig.json             # TypeScript配置
└── vite.config.ts            # Vite配置（路径别名、插件等）
```
- **实际项目类型**：所有现代前端项目（如企业官网、电商H5、后台管理系统、小程序H5版）。

#### 2. 组件化架构
- **定义**：以「组件」为最小复用单元，按「通用UI组件 → 业务组件 → 页面组件」分层，实现低耦合、高内聚，是中大型应用的核心代码组织方式。
- **适用场景**：中大型单页应用（SPA）、需要高频复用UI/业务逻辑的项目（如后台管理系统、电商、SaaS产品）。
- **优势**：组件复用率高、维护成本低、团队协作高效（可按组件拆分开发任务）、便于单元测试；
- **劣势**：需设计合理的组件分层规范，过度拆分易增加组件通信成本，新手易出现组件职责混乱问题。
- **完整目录示例（React + TypeScript + Vite）**：
```
react-component-project/
├── .eslintrc.js              # ESLint配置
├── .prettierrc               # Prettier配置
├── index.html
├── node_modules/
├── package.json
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/               # 静态资源
│   ├── components/           # 组件分层管理
│   │   ├── UI/               # 通用原子组件（无业务逻辑）
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx  # 单元测试
│   │   │   │   ├── index.ts
│   │   │   │   └── style.module.scss
│   │   │   ├── Input/
│   │   │   └── Modal/
│   │   ├── Business/         # 业务组件（组合原子组件，带业务逻辑）
│   │   │   ├── UserCard/
│   │   │   │   ├── index.tsx
│   │   │   │   └── hooks.ts
│   │   │   └── OrderList/
│   │   └── Page/             # 页面容器组件（组合业务组件，定义布局）
│   │       ├── HomeLayout/
│   │       │   ├── index.tsx
│   │       │   └── style.module.scss
│   │       └── UserLayout/
│   ├── hooks/                # 自定义Hooks（抽离组件逻辑）
│   │   ├── usePagination.ts  # 分页逻辑
│   │   ├── useRequest.ts     # 请求逻辑
│   │   └── useUserInfo.ts    # 用户信息逻辑
│   ├── pages/                # 路由页面（挂载页面组件）
│   │   ├── Home.tsx
│   │   └── UserDetail.tsx
│   ├── router/               # 路由配置
│   │   ├── index.tsx
│   │   └── routes.ts         # 路由规则
│   ├── types/                # 类型定义
│   │   └── index.d.ts
│   ├── utils/                # 工具函数
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
└── vite.config.ts
```
- **实际项目类型**：电商后台管理系统（如淘宝商家后台）、SaaS类产品（如钉钉工作台）、在线教育平台（如网易云课堂）。

#### 3. MVVM 分层架构
- **定义**：Model（数据模型）- View（视图）- ViewModel（视图模型），通过双向绑定/单向数据流解耦视图与业务逻辑（Vue/React Hooks均基于此思想）；Model层负责数据定义/接口请求，View层纯展示，ViewModel层处理逻辑。
- **适用场景**：需要清晰分离「视图展示」和「业务逻辑」的项目（如交互复杂的表单、数据可视化应用、金融类系统）。
- **优势**：逻辑与视图解耦、代码可测试性高、维护成本低（视图/逻辑可单独修改）；
- **劣势**：简单项目使用会增加分层成本，新手理解ViewModel层的职责边界略难。
- **完整目录示例（Vue3 + Pinia）**：
```
vue3-mvvm-project/
├── .env.development
├── .env.production
├── index.html
├── node_modules/
├── package.json
├── src/
│   ├── api/                  # Model层补充：接口请求
│   │   ├── userApi.ts
│   │   └── goodsApi.ts
│   ├── model/                # Model层：数据模型/类型定义
│   │   ├── user.ts           # 用户数据类型+初始值+校验规则
│   │   │   ├── type.ts
│   │   │   └── validator.ts
│   │   └── goods.ts
│   ├── utils/                # Model层工具：数据处理
│   │   └── dataTransform.ts
│   ├── views/                # View层：纯视图组件（无业务逻辑）
│   │   ├── Home/
│   │   │   ├── index.vue
│   │   │   └── components/   # 视图子组件
│   │   └── User/
│   ├── viewModel/            # ViewModel层：逻辑处理（不涉及DOM）
│   │   ├── store/            # 全局ViewModel（Pinia）
│   │   │   ├── user.ts       # 用户全局逻辑
│   │   │   └── goods.ts      # 商品全局逻辑
│   │   ├── useHomeLogic.ts   # 页面级ViewModel（首页逻辑）
│   │   └── useUserLogic.ts   # 页面级ViewModel（用户页逻辑）
│   ├── App.vue
│   └── main.ts
├── tsconfig.json
└── vite.config.ts
```
- **实际项目类型**：金融风控系统（表单密集型）、数据可视化大屏（如阿里云控制台）、医疗管理系统（如医院电子病历系统）。

### （二）工程管理架构（面向团队/大型项目）
#### 1. Monorepo 多包管理架构
- **定义**：单仓库管理多个包/应用（如UI组件库+业务应用、多端应用），共享依赖、统一规范，主流工具：pnpm workspace、Turborepo、NX。
- **适用场景**：多包开发（如UI组件库+业务应用）、多端应用（H5+小程序）、多团队协作的大型项目。
- **优势**：依赖共享（减少重复安装）、版本统一、跨包调试方便、规范易落地、可统一构建/发布；
- **劣势**：仓库体积大、首次克隆耗时久、构建耗时可能增加（可通过Turborepo缓存优化）、需掌握Monorepo工具配置。
- **完整目录示例（pnpm workspace + Turborepo）**：
```
monorepo-project/
├── .eslintrc.js              # 根级ESLint配置（所有包共享）
├── .gitignore
├── package.json              # 根级依赖/脚本（共享工具如eslint、prettier）
├── pnpm-lock.yaml
├── pnpm-workspace.yaml       # pnpm子包配置
├── turbo.json                # Turborepo构建配置（缓存、任务依赖）
├── tsconfig.json             # 根级TS配置（子包继承）
└── packages/                 # 所有子包
    ├── ui-components/        # 通用UI组件库包
    │   ├── package.json
    │   ├── src/
    │   │   ├── components/   # 原子组件
    │   │   ├── index.ts      # 组件库导出
    │   │   └── styles/       # 全局样式
    │   ├── tsconfig.json     # 继承根级配置
    │   └── vite.config.ts    # 组件库打包配置
    ├── shared-utils/         # 通用工具包
    │   ├── package.json
    │   ├── src/
    │   │   ├── format.ts
    │   │   ├── request.ts
    │   │   └── index.ts
    │   └── tsconfig.json
    ├── app-pc/               # PC端业务应用包
    │   ├── package.json
    │   ├── src/              # 同模块化架构的PC端代码
    │   ├── index.html
    │   └── vite.config.ts
    └── app-h5/               # H5端业务应用包
        ├── package.json
        ├── src/              # 同模块化架构的H5代码
        ├── index.html
        └── vite.config.ts
```
- **实际项目类型**：字节跳动飞书前端（包含UI组件库、PC端应用、移动端H5）、蚂蚁金服Ant Design组件库+旗下业务应用、腾讯企微前端体系。

#### 2. 微前端架构
- **定义**：将超大型应用拆分为多个独立子应用（技术栈可异构），主应用（基座）负责加载/卸载子应用、路由分发、通信，主流框架：qiankun、Webpack Module Federation。
- **适用场景**：超大型应用（如企业中台、电商平台）、多团队维护且技术栈不一致的项目、需要增量迁移的老项目。
- **优势**：技术栈解耦（子应用可独立选Vue/React/Angular）、团队独立开发/部署、子应用可单独迭代、老项目可增量迁移；
- **劣势**：主应用与子应用通信复杂、运维成本高（需管理多应用部署）、首屏加载可能变慢（可通过预加载优化）、存在样式隔离/全局变量冲突风险。
- **完整目录示例（qiankun + Vue3主应用 + React子应用）**：
```
micro-app-project/
├── main-app/                 # 主应用（Vue3 + qiankun）
│   ├── .env.development
│   ├── index.html
│   ├── package.json
│   ├── src/
│   │   ├── assets/
│   │   ├── components/       # 主应用通用组件（如导航栏、页脚）
│   │   ├── micro-app/        # 微前端配置
│   │   │   ├── apps.ts       # 子应用列表配置
│   │   │   ├── index.ts      # qiankun注册
│   │   │   └── actions.ts    # 主-子应用通信
│   │   ├── router/           # 主应用路由（包含子应用激活路由）
│   │   ├── views/            # 主应用自有页面（如登录页）
│   │   ├── App.vue
│   │   └── main.ts
│   └── vite.config.ts
├── app-vue/                  # Vue3子应用
│   ├── package.json
│   ├── src/                  # 标准Vue3项目结构
│   ├── vite.config.ts        # 配置qiankun适配
│   └── public/
└── app-react/                # React子应用
    ├── package.json
    ├── src/                  # 标准React项目结构
    ├── vite.config.ts        # 配置qiankun适配
    └── public/
```
- **实际项目类型**：阿里飞猪平台（多团队维护不同业务模块）、美团外卖商家端、京东零售中台系统。

#### 3. 工程化规范架构
- **定义**：通过 ESLint（代码校验）、Prettier（代码格式化）、husky（Git Hooks）、Commitlint（提交规范）、lint-staged（暂存区代码校验）等工具，统一团队代码风格和提交规范，是团队协作的基础保障。
- **适用场景**：所有团队协作项目（2人及以上），尤其中大型项目、多团队协作项目。
- **优势**：代码风格统一（减少合并冲突）、减少低级Bug（如语法错误）、提交记录清晰（便于追溯）、降低新人融入成本；
- **劣势**：初期配置成本高、新手需适应规范（如提交信息格式）、部分规范可能限制灵活性（可按需调整规则）。
- **完整目录示例**：
```
project-with-spec/
├── .commitlintrc.js          # Commitlint配置（规范提交信息）
├── .eslintignore             # ESLint忽略文件
├── .eslintrc.js              # ESLint规则配置（如React/Vue规则）
├── .husky/                   # Git Hooks脚本
│   ├── commit-msg            # 提交信息校验
│   └── pre-commit            # 提交前校验（lint-staged）
├── .prettierignore           # Prettier忽略文件
├── .prettierrc               # Prettier格式化规则
├── lint-staged.config.js     # 暂存区代码校验配置
├── package.json              # 规范脚本（lint/fix/commitlint）
└── src/                      # 业务代码（同模块化架构）
```
- **实际项目类型**：美团前端团队所有业务项目、腾讯微信开放平台前端项目、字节跳动抖音电商前端。

### （三）状态管理架构（解决数据共享问题）
#### 1. 集中式状态管理（Pinia/Redux Toolkit）
- **定义**：将全局状态抽离到单一 `store` 中，统一管理状态的读取/修改（通过Action/Mutation），解决跨组件/跨页面通信问题，Pinia（Vue）、Redux Toolkit（React）为当前主流方案。
- **适用场景**：中大型应用（多组件/多页面共享状态，如购物车、用户信息、全局主题）。
- **优势**：状态可追溯（便于调试）、修改逻辑统一（避免状态混乱）、支持持久化、可结合DevTools调试；
- **劣势**：简单项目使用会增加冗余、配置略复杂（新手需理解核心概念）。
- **完整目录示例（Pinia + Vue3）**：
```
vue3-pinia-project/
├── src/
│   ├── store/
│   │   ├── index.ts          # 导出所有store
│   │   ├── modules/          # 按业务拆分store模块
│   │   │   ├── user.ts       # 用户状态（包含state/actions/getters）
│   │   │   ├── cart.ts       # 购物车状态
│   │   │   └── theme.ts      # 主题状态
│   │   └── types/            # store类型定义
│   │       └── index.d.ts
│   ├── utils/
│   │   └── piniaPersist.ts   # Pinia持久化配置
│   └── views/                # 页面使用store（如购物车页面）
└── package.json
```
- **实际项目类型**：淘宝购物车模块、京东用户中心、抖音商城全局状态管理。

#### 2. 局部状态管理（Vue Setup/React Hooks）
- **定义**：将组件/页面内的状态封装在自身作用域中，通过Vue Setup语法（ref/reactive）/React Hooks（useState/useReducer）管理，不共享到全局。
- **适用场景**：小型应用、状态仅在单个组件/页面内使用的场景（如表单局部状态、列表分页状态）。
- **优势**：轻量无冗余、学习成本低、性能好（无全局状态监听）；
- **劣势**：无法直接跨组件共享，需手动封装通信逻辑（如Props/Event、Context）。
- **完整目录示例（React Hooks）**：
```
react-local-state-project/
├── src/
│   ├── pages/
│   │   └── Home.tsx          # 页面内局部状态
│   │       ├── const [count, setCount] = useState(0); // 局部状态
│   │       ├── const [list, setList] = useState([]);  // 列表状态
│   └── components/
│       └── SearchInput.tsx   # 组件内局部状态（输入框值）
└── package.json
```
- **实际项目类型**：小型个人博客、简单的表单工具（如在线计算器）、单页面营销页。

### （四）渲染/部署架构（面向性能/SEO/）
#### 1. CSR 客户端渲染（SPA）
- **定义**：服务端仅返回空HTML，客户端加载JS后动态渲染页面，是现代SPA的核心渲染方式，依赖客户端路由（如Vue Router/React Router）。
- **适用场景**：后台管理系统、交互复杂的应用（无需SEO）、企业内部应用。
- **优势**：交互流畅（无页面刷新）、前后端解耦、开发效率高、客户端路由切换快；
- **劣势**：首屏加载慢（需加载完整JS）、SEO差（爬虫无法解析动态内容）、白屏时间长（可通过骨架屏优化）。
- **完整目录示例（Vue3 + Vue Router）**：
```
vue3-csr-project/
├── src/
│   ├── router/               # 客户端路由核心
│   │   ├── index.ts          # 路由配置（动态路由）
│   │   ├── guard.ts          # 路由守卫（如登录校验）
│   │   └── routes.ts         # 路由规则
│   ├── views/                # 客户端渲染页面
│   └── main.ts               # 客户端挂载应用
├── index.html                # 空HTML模板（仅挂载节点）
└── package.json
```
- **实际项目类型**：抖音后台管理系统、B站创作中心、企业内部OA系统。

#### 2. SSR 服务端渲染
- **定义**：服务端先渲染出完整HTML返回给客户端，客户端激活后转为SPA，主流框架：Nuxt3（Vue）、Next.js（React），兼顾首屏性能和交互体验。
- **适用场景**：需要SEO、首屏加载快的应用（官网、电商详情页、资讯类网站）。
- **优势**：首屏加载快（无需等待JS加载）、SEO友好（爬虫可解析完整HTML）、白屏时间短；
- **劣势**：服务端压力大（需渲染HTML）、开发成本高（需考虑服务端/客户端兼容）、部分浏览器API无法在服务端使用。
- **完整目录示例（Nuxt3）**：
```
nuxt3-ssr-project/
├── .nuxt/                    # 构建产物（自动生成）
├── nuxt.config.ts            # Nuxt配置（开启SSR、路由、插件）
├── package.json
├── public/
└── src/
    ├── app.vue               # 根组件
    ├── pages/                # 自动生成路由（服务端渲染）
    │   ├── index.vue         # 首页（SSR）
    │   └── goods/[id].vue    # 商品详情页（动态路由SSR）
    ├── server/               # 服务端逻辑
    │   ├── api/              # 服务端API（避免跨域）
    │   │   └── goods.ts
    │   └── middleware/       # 服务端中间件（如请求拦截）
    ├── composables/          # 组合式函数（兼容服务端/客户端）
    └── assets/
```
- **实际项目类型**：京东商品详情页、知乎问答页面、小红书笔记详情页。

#### 3. SSG 静态站点生成
- **定义**：构建阶段预渲染所有页面为静态HTML，部署后直接返回静态文件，无需服务端实时渲染，主流框架：Nuxt3（静态模式）、Next.js（SSG）、VitePress、Astro。
- **适用场景**：内容固定/更新频率低的站点（文档站、博客、营销页、官网）。
- **优势**：极致的首屏性能（静态文件加载快）、部署成本低（可部署到CDN）、SEO友好、服务端无压力；
- **劣势**：内容更新需重新构建部署、无法处理动态实时数据（可结合SWR/React Query动态加载）。
- **完整目录示例（Next.js 14 + SSG）**：
```
nextjs-ssg-project/
├── next.config.js            # 配置SSG、路由等
├── package.json
├── public/
└── src/
    ├── app/                  # App Router（Next.js 14）
    │   ├── page.tsx          # 首页（SSG）
    │   ├── about/
    │   │   └── page.tsx      # 关于页（SSG）
    │   └── layout.tsx        # 全局布局
    ├── components/           # 通用组件
    └── styles/               # 样式文件
```
- **实际项目类型**：VitePress官方文档站、Vue.js官网、小米商城营销页。

#### 4. 跨端架构
- [多端架构](./architecture-multi-end.md)

### （五）设计驱动架构
#### 原子化设计架构
- **定义**：按「原子→分子→有机体→模板→页面」分层设计组件，结合原子化CSS（Tailwind CSS），实现组件极致复用，UI风格统一。
- **适用场景**：需要快速迭代、UI体系统一的项目（如电商、ToB产品、组件库）。
- **优势**：组件复用率极高、UI风格统一（减少设计还原偏差）、开发速度快（原子化CSS无需写自定义样式）、便于维护；
- **劣势**：初期需搭建完整的原子组件体系、新手需适应原子化CSS语法（如类名组合）、部分场景需自定义样式扩展。
- **完整目录示例（React + Tailwind CSS + Vite）**：
```
react-atomic-project/
├── postcss.config.js         # Tailwind配置依赖
├── src/
│   ├── components/
│   │   ├── atoms/            # 原子组件（最小单元，如Button/Input）
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   ├── molecules/        # 分子组件（原子组合，如SearchBar/FormItem）
│   │   │   └── SearchBar.tsx
│   │   ├── organisms/        # 有机体组件（分子组合，如Navbar/Footer）
│   │   │   └── Navbar.tsx
│   │   ├── templates/        # 模板组件（页面布局，如MainLayout）
│   │   │   └── MainLayout.tsx
│   │   └── pages/            # 页面组件（模板+数据，如Home/About）
│   │       └── Home.tsx
│   ├── styles/
│   │   └── tailwind.css      # Tailwind入口
│   └── App.tsx
├── tailwind.config.js        # Tailwind配置（主题、扩展）
└── vite.config.ts
```
- **实际项目类型**：小红书前端UI体系、抖音电商店铺装修组件、飞书审批组件库。

## 三、主流架构组合使用示例（结合核心优势）
实际项目中极少单独使用某一种架构，通常是「多架构组合」以适配复杂场景，以下是4类典型组合及核心优势：

### 组合1：电商平台（SSR + 微前端 + 原子化设计 + 集中式状态管理）
- **组合架构**：SSR（服务端渲染） + 微前端 + 原子化设计 + Pinia/Redux（集中式状态管理） + 工程化规范
- **适用场景**：大型电商平台（如淘宝、京东）
- **核心优势**：
  1. 结合SSR的「首屏快、SEO友好」（商品详情页/首页）；
  2. 结合微前端的「多团队独立维护」（购物车、支付、商品模块由不同团队负责）；
  3. 结合原子化设计的「UI风格统一、开发效率高」（全平台按钮/卡片等组件复用）；
  4. 结合集中式状态管理的「全局状态统一」（购物车、用户信息跨模块共享）；
  5. 结合工程化规范的「代码风格统一、提交规范」（多团队协作无冲突）。

### 组合2：企业中台（CSR + Monorepo + 组件化 + 工程化规范）
- **组合架构**：CSR（客户端渲染） + Monorepo + 组件化 + 局部/集中式状态管理 + 工程化规范
- **适用场景**：企业级中台系统（如阿里中台、美团商家中台）
- **核心优势**：
  1. 结合CSR的「交互流畅」（中台操作复杂，客户端渲染无页面刷新）；
  2. 结合Monorepo的「多包共享」（中台包含UI组件库、工具包、多端应用，统一管理）；
  3. 结合组件化的「高复用性」（中台通用组件如表单、表格复用率超80%）；
  4. 结合混合状态管理的「灵活适配」（页面内状态用局部管理，全局状态用集中式管理）；
  5. 结合工程化规范的「多团队协作高效」（统一代码风格和提交规范）。

### 组合3：多端电商应用（跨端架构 + 模块化 + 局部/集中式状态管理）
- **组合架构**：Uniapp/Taro（跨端） + 模块化 + Pinia/React Hooks（混合状态管理） + 原子化设计
- **适用场景**：多端电商应用（如拼多多小程序+H5+App）
- **核心优势**：
  1. 结合跨端架构的「一套代码多端运行」（减少小程序/H5/App重复开发）；
  2. 结合模块化的「代码拆分清晰」（按业务拆分接口/工具/组件模块）；
  3. 结合混合状态管理的「轻量高效」（页面内状态用局部管理，全局购物车用集中式管理）；
  4. 结合原子化设计的「UI多端统一」（按钮/卡片等组件多端样式一致）。

### 组合4：文档/营销站（SSG + 原子化设计 + 工程化规范）
- **组合架构**：SSG（静态站点生成） + 原子化设计 + 工程化规范
- **适用场景**：官方文档站、品牌营销站（如Vue官网、小米营销页）
- **核心优势**：
  1. 结合SSG的「极致性能+SEO友好」（静态文件部署到CDN，加载速度快，爬虫易解析）；
  2. 结合原子化设计的「UI统一、开发快」（营销页组件复用率高，无需重复写样式）；
  3. 结合工程化规范的「代码可维护」（文档站迭代时代码风格统一，便于多人协作）。

## 四、关键总结
1. **架构无优劣，仅适配场景**：小型项目优先「模块化+局部状态管理+基础工程化规范」，大型项目按需叠加「Monorepo/微前端/SSR」；
2. **组合核心是“扬长避短”**：比如SSR解决SEO/首屏问题，微前端解决团队解耦问题，原子化设计解决复用问题；
3. **工程化规范是基础**：无论何种组合，工程化规范（ESLint/Prettier/husky）都是团队协作的前提，需优先落地。
4. **架构的本质是解决问题**：没有「最好的架构」，只有「最适配当前场景的架构」，创业期项目用微前端就是过度设计；
5. **演进的核心是渐进式**：从极简到复杂的升级，每一步都对应「新的核心问题」，而非提前预判所有需求；
6. **架构师的核心是权衡**：选择架构时，始终要对比「收益」和「成本」（开发/维护/运维），而非追求技术堆砌。