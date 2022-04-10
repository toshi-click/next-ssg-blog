---
title: "サーバへのSSHログイン契機でメール通知"
date: "2017-11-25"
tags: 
  - Linux
  - インフラ
  - セキュリティ
summary_generated: サーバへのSSHログイン契機でメール通知
---
# 目的
複数のIPからSSHアクセスされるサーバーで信頼していないIPから接続されたら通知する。

## 参考
[SSHでログインしたらメールで通知する](https://bacchi.me/linux/ssh-login-alert/)

# バージョン情報
- CentOS Linux release 7.3.1611 (Core)

## 設定内容
参考にした内容ではシェルを作成していましたが、不要なので/etc/ssh/sshrcに纏めました。
また、1IPのみの信頼となっていたので複数IPを評価するようにしました。

```
SOURCE_IP=${SSH_CLIENT%% *}
# 信頼するIPを指定
TRUST_IP_LIST="192.168.0.100 192.168.0.101"

# リストと比較して信頼していないIPからならメール送付
for HOST in $TRUST_IP_LIST
do
    if [ $HOST == $SOURCE_IP ]; then
        exit 0
    fi
done
echo "\"$USER\" has logged in from $SSH_CLIENT at `date +"%Y/%m/%d %p %I:%M:%S"` to $HOSTNAME " | mail -s "$HOSTNAME sshd login alert" -r root@your.domain root
```

## おわりに
下記のようなメールが来ます。

```
タイトル：[ホスト名] sshd login alert
本文：
"[ユーザ名]" has logged in from 192.168.200.1 37857 22 at 2017/07/05 PM 12:33:56 to [ホスト名]
```
