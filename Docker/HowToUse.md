## 第一步: 安装 Docker

1. 如果之前安装过 Docker 需要先卸载

`sudo yum remove docker docker-common docker-selinux docker-engine`

2. 安装依赖

`sudo yum install -y yum-utils device-mapper-persistent-data lvm2`

3. 下载 repo 文件(CentOS)

`wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/centos/docker-ce.repo`

4. 把软件仓库地址替换为 TUNA

`sudo sed -i 's+download.docker.com+mirrors.bfsu.edu.cn/docker-ce+' /etc/yum.repos.d/docker-ce.repo`

5. 最后安装

```
sudo yum makecache fast
sudo yum install docker-ce
```

## 第二步: 创建容器

以下代码中 Docker 安装位置为 /usr/docker/ 

```
docker run -dit \
-v /usr/docker/jd/scripts:/jd/scripts \
-v /usr/docker/jd/config:/jd/config \
-v /usr/docker/jd/log:/jd/log \
-p 5678:5678 \
--name jd \
--hostname jd \
--restart always \
evinedeng/jd:github
```

## 第三步: 查看创建日志

`docker logs -f jd`

> 直到出现容器启动成功...字样才代表启动成功, 按 Ctrl+C 退出查看日志

## 第四步: 编辑文件

```
cd /你想存放的路径/jd/config
ls
```

> auth.json 文件是用户账号和密码, 自行修改即可
> config.sh 文件是脚本变量设置, 按文件内说明即可
> crontab.list 文件是脚本运行时间, 按文件内格式编写

### 重置控制面板用户名和密码

`docker exec -it jd bash jd resetpwd`

### 添加除 lxk 以外的脚本

此 js 可以在 node.js 上执行, 脚本(.js)放在 /usr/docker/jd/scripts 下即可. 

比如文件名为 test.js, 编辑 crontab.list 文件添加定时任务：

```
15 10 * * * bash jd test     # 如果不需要准时运行或RandemDelay未设置
15 10 * * * bash jd test now # 如果设置了RandemDelay但又需要它准时运行
```

*注意：额外添加的脚本不能以 “jd_”、“jr_”、“jx_” 开头，以 “jd_”、“jr_”、“jx_” 开头的任务如果不在 lxk0301 仓库中会被删除！*

> 如果此脚本需要使用 LXK 仓库中的 sendNotify.js 来发送通知，或者用到 jdCookie.js 来处理Cookie
>> 将此脚本上传至 /usr/docker/jd/script/ 文件夹下, 然后执行以下代码 `docker cp /usr/docker/test.js jd:/jd/scripts`