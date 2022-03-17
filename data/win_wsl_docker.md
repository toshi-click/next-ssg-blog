---
title: "Windows10 + WSL(Ubuntu18.04) + Docker Desktopで開発環境構築"
date: "2019-07-09"
tags: 
  - Docker
  - Linux
  - Windows
  - WSL
  - インフラ
  - 開発環境
summary_generated: Windows10 + WSL(Ubuntu18.04) + Docker Desktopで開発環境構築
---
## TL;DR
`WSL2`の発表と`Docker Desktop for WSL 2`の発表によってこの記事の手順は20H1のWindowsUpdate後は陳腐化すると思われます。

https://engineering.docker.com/2019/06/docker-hearts-wsl-2/

## 前作業
* [WSLの導入手順](https://git.infrastructure.jp/cs/knowledge/issues/24)
* [Docker Desktop導入手順](https://git.infrastructure.jp/cs/knowledge/issues/25)

上記が終わっていること前提

### アップデート/アップグレード
```
$ sudo apt -y update
$ sudo apt -y upgrade
```

### 日本語環境
1. 日本語/タイムゾーン設定
    ```
    $ sudo apt -y install language-pack-ja
    $ sudo update-locale LANG=ja_JP.UTF-8
    $ sudo timedatectl set-timezone 'Asia/Tokyo'
    $ sudo apt -y install manpages-ja manpages-ja-dev
    ```
1. Ubuntu Japanese Teamリポジトリを追加する
    ```
    $ wget -q https://www.ubuntulinux.jp/ubuntu-ja-archive-keyring.gpg -O- | sudo apt-key add -
    $ wget -q https://www.ubuntulinux.jp/ubuntu-jp-ppa-keyring.gpg -O- | sudo apt-key add -
    $ sudo wget https://www.ubuntulinux.jp/sources.list.d/$(lsb_release -cs).list -O /etc/apt/sources.list.d/ubuntu-ja.list
    $ sudo apt -y update
    $ sudo apt -y upgrade
    ```

### Docker
Windows10 バージョン201903ではWSLでDocker Daemonを動かすことが環境依存で難しいため

Docker Desktopに接続して操作できるようにする

インストールがうまく出来ない場合は[公式のインストール手順](https://docs.docker.com/install/linux/docker-ce/ubuntu/)を参照してください
1. 開発(基本)パッケージを取得する
    ```
    $ sudo apt update
    $ sudo apt -y install build-essential git apt-transport-https ca-certificates curl gnupg2 software-properties-common
    ```
1. Dockerリポジトリの追加
    ```
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    $ sudo apt-key fingerprint 0EBFCD88
    $ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    $ sudo apt update
    ```
1. Dockerのインストール
    ```
    $ sudo apt -y install docker-ce
    ```
1. Docker Desktopのデーモンに接続するように設定を追加
  1. ~/.bashrcに下記を追加
      ```
      export DOCKER_HOST=tcp://localhost:2375
      alias docker="DOCKER_HOST=${DOCKER_HOST} docker"
      alias docker-compose="docker-compose -H ${DOCKER_HOST}"
      ```
  1. 設定反映
      ```
      $ source ~/.bashrc
      ```
### docker-compose
aptで入るdocker-composeは古いので[公式](https://docs.docker.com/compose/install/)のやり方で入れる
1. 以下のコマンドを実行し、`docker-compose`コマンドを直接`/usr/local/bin`以下に配置します。
    ```
    $ sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```
   ※このコマンドにはバージョン番号が含まれています。[Install Docker Compose](https://docs.docker.com/compose/install/)にて最新のコマンドを確認してください。
1. 実行可能なようにするためにバーミッションを変更します。
    ```
    $ sudo chmod a+rx /usr/local/bin/docker-compose
    ```

### ボリュームマウントの問題について
この状態ではdockerでボリュームマウントオプションを入れてもボリュームマウントができないので対処する
* Docker Desktop側の設定
  1. タスクバーのインジゲータからDockerアイコンを右クリック
  1. 設定を開き、`Shared Drives`タブにてマウントしたいディレクトリがあるディスクを選択
  1. `Apply`で設定を適用し、起動中であれば念のためDockerを再起動
  1. Cドライブをマウントした場合`/c`にマウントされる

* WSLでは/mnt配下にディスクがマウントされます。
  * 上記のためWSLでdockerのマウントオプションを付けて実行してもマウントに失敗します。
  * 原因はDocker DesktopとWSLのマウント位置が違うためであるのでWSLにて下記対応をする
```
ln -s /c /mnt/c
```
