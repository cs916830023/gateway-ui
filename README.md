# flying-fish-manage

#### 介绍
此项目为 [**flying-fish-gateway**](https://gitee.com/omsgit/flying-fish-gateway) 分布式飞鱼网关管理项目的配套前端管理界面，采用vue2 + element-ui 2.3.x开发；

#### 软件架构
软件架构说明：node 6+、vue2.x 、 element-ui 2.3.x

#### 安装依赖

1.  cnpm install
2.  cnpm install vue-router
3.  cnpm install axios -S
4.  cnpm install echarts
5.  cnpm install echarts-gl
6.  cnpm install --save babel-polyfill
7.  cnpm install mavon-editor --save

> 详细安装文档：**[flying-fish-gateway-说明文档.docx](https://gitee.com/omsgit/flying-fish-gateway/tree/snapshot.v.1.0/doc)**

#### 使用说明

1.  通过IDE加载项目工程
2.  提前安装好nodejs,配置
3.  编译：cnpm run build
3.  运行：cnpm run dev

#### 更新记录

 ++++++++ **snapshot-nacos.v.3.0** 
1. 升级springcloud Hoxton.SR10\springboot 2.3.9.RELEASE版本
2. 去除eureka注册发现中心，改为nacos（2.0.3版本）实现动态服务注册与发现、配置管理
3. 此版本基于snapshot.v.3.0改造，核心代码一致
4. 增加示例子模块

注：前端需要同步更新到nacos.v.3.0

 ++++++++ **snapshot.v.3.0** 
1. 升级springcloud Hoxton.SR10\springboot 2.3.9.RELEASE版本
2. 扩展功能：新增接口心跳监控、邮件告警功能
3. 代码优化，已知问题题修复

注：前端需要同步更新到v.3.0

 ++++++++ **snapshot.v.2.0** 
1. 代码优化，已知问题题修复
2. 扩展功能：新增接口访问统计功能
3. 优化：客户端名称可修改。

注：前端需要同步更新到v.2.0

 ++++++++ **snapshot.v.1.0** 
1. 代码优化，已知问题题修复
2. 扩展功能：接口文档，提供API接口文档描述功能
3. 添加限流拦截之后的通用规范json格式输出

 ++++++++ **master** 
1. 初始版本
2. 建立基础功能：负载管理、服务管理、客户端管理、IP名单管理
3. 其它底层开发


#### 参与贡献

1.  由于本人非全职前端，因此前端VUE使用根据个人习惯编写，有可能不符合您的项目使用规范，欢迎有兴趣的朋友下载、使用、交流
2.  本项目完全免费开源，可自行修改、编辑、另行发版与使用，不受任何商业限制（保不保留原作者信息，无所谓了）

