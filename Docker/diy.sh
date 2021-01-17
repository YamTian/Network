#!/usr/bin/env bash

my_scripts_list="jd_gyec.js jd_mh.js jd_ms.js jd_super_coupon.js jd_live_redrain2.js "  # 你想下载的js文件清单
scripts_base_url=https://raw.fastgit.org/shylocks/Loon/main/   # raw文件的基础网址(国内镜像源)

cd $ScriptsDir   # 在 git_pull.sh 中已经定义 ScriptsDir 此变量，diy.sh 由 git_pull.sh 调用，因此可以直接使用此变量
for js in $my_scripts_list
do
  # 下载my_scripts_list中的每个js文件，重命名增加前缀"shylocks_"，增加后缀".new"
  echo -e "更新 $js ...\n"
  wget -q --no-check-certificate $scripts_base_url$js -O shylocks_$js.new

  # 如果上一步下载没问题，才去掉后缀".new"，如果上一步下载有问题，就保留之前正常下载的版本
  if [ $? -eq 0 ]; then
    mv -f shylocks_$js.new shylocks_$js
    echo -e "更新 $js 完成...\n"
  else
    [ -f shylocks_$js.new ] && rm -f shylocks_$js.new
    echo -e "更新 $js 失败，使用上一次正常的版本..."
  fi
done
