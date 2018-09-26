# KUN-UI

## todo

### 全局部分todo
* ts的注释优化、ts深入使用、代码lint
* 数据库操作的操作者和时间记录、代理接口的log

### todo

* autoComplete
* 线上调通
* log

## 命令

### 开发

```
npm run dev
```
·
### 打包

```
npm run dist
```

### Docker本地调试

```sh
# 使用默认的mongo，调试syslog路径
docker run -v ~\\docker\\kun-ui-log:/var/log/pangu-kun/ --rm -d -p 514:514 dockerhub.nie.netease.com/pangu-kun/log-manager:2.0.0
```

### 编译与发布

```sh
# 编译代码并打包成docker镜像
npm run docker:build
# 9000端口本地测试docker镜像
npm run docker:dev
# 发布docker镜像，下面两个命令都可使用
npm run docker:publish
docker push dockerhub.nie.netease.com/pangu-kun/webui
```

### 部署

* 数据库配置
    1. 申请对应环境的数据库，见https://g.hz.netease.com/pangu_tech/pangu-kun-configs/blob/master/RESOURCES.md
    2. 添加数据库信息到pangu-kun-configs中的配置，到https://g.hz.netease.com/pangu_tech/pangu-kun-configs/blob/master/RESOURCES.md中做记录
    3. pangu-kun-configs提交配置，提交merge request到master，merge之后，配置1min之后生效，配置完成
* [Symphony管理系统](https://sym.nie.netease.com/)对应应用分组新建服务`webui`
    * 选择`镜像仓库`
    * 选择`东冠集群`，cpu：`2`，内存默认，端口对应 `80:9000`
    * `同步宿主时区(UTC+8)`
    * 配置挂载数据卷`configurations`:`/usr/share/pangu-kun/config/`
    
* 推镜像，打tag，重建服务完成
* console连接数据库，并添加admin
* 访问地址，接入openid登录站点
