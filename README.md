# 星盘 - Astrolabe

这是一个前端监控平台项目，适配原生JS以及Vue、React（正在适配中）

项目主体包括两部分

- 监控SDK
- 数据平台（正在开发中）

项目计划收集信息包括

- 性能数据
  - 全阶段数据 通过 PerformanceNavigationTiming 收集
  - 用户体验关键指标 通过 PerformanceObserver API 进行收集

- 异常监控
  - 原生错误
    - window.onerror
    - window.onunhandledrejection
  - vue
    - vue.config.errorHandler
  - react
    - ErrorBoundary 本质是 componentDidCatch 生命周期

- 应用数据分析（计划中）
  - 页面访问数（PV）
  - 用户访问数（UV）
  - 页面平均停留时间
  - 地区分析
  - 设备机型分析

更多内容参考飞书文档 https://y9jjxxn0yg.feishu.cn/wiki/space/7542377571254698003
