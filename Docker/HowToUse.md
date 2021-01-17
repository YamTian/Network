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

```
docker run -dit \
-v /你想存放的路径/jd/scripts:/jd/scripts \
-v /你想存放的路径/jd/config:/jd/config \
-v /你想存放的路径/jd/log:/jd/log \
-p 5678:5678 \
--name jd \
--hostname jd \
--restart always \
evinedeng/jd:github
```

## 第三步: 查看创建日志

`docker logs -f jd`

> 直到出现容器启动成功...字样才代表启动成功, 按 Ctrl+C 退出查看日志