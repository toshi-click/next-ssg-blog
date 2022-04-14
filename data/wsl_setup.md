---
title: "WSLの導入手順"
date: "2019-06-04"
coverImage: '/images/cover/pakutaso_cover03.jpg'
tags: 
  - Linux
  - Windows
  - インフラ
  - 開発環境
---

# WSLの導入手順
WSL (Windows Subsystem for Linux) の導入手順について書きます。

## WSLとは？
Windows10（バージョン1709以降）で利用可能になったWindows10からLinuxを利用するための機能です。

## 目次
1. WSLを導入する
1. Linuxディストリビューションをインストールする
1. おわりに

## WSLを導入する
### コマンドの場合
以下のコマンドをPowerShellを管理者権限で起動し実行します。
```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```
### GUIの場合
1. プログラムと機能 → Windowsの機能の有効化または無効化を開きます。

    ![image_alt](/images/wsl_setup/wsl_gui_01.jpg)
1. ダイアログ内の`Windows Subsystem for Linux`の左側のチェックボックスにチェックを付けてOK

    ![image_alt](/images/wsl_setup/wsl_gui_02.jpg)
1. Windowsを再起動します。

## Linuxディストリビューションをインストールする
Windows Storeで、WSL用のLinuxが提供されていますので、そちらからお好みのものを導入します。

今回はUbuntu 18.04 LTSをインストールします。

1. Windows Store内でお好みのLinuxディストリビューションを表示し、`インストール`ボタンを押します。

   ※ 初めてインストールする際には`入手`ボタンを押すことが必要です。

    ![image_alt](/images/wsl_setup/wsl_distro_01.jpg)
1. `起動`をクリックします。

    ![image_alt](/images/wsl_setup/wsl_distro_02.jpg)
1. ユーザー名とパスワードを入力します。

    ![image_alt](/images/wsl_setup/wsl_distro_03.jpg)

   これでUbuntu18.04 LTSを使い始めることができます。
1. 次回以降の起動

   スタートメニューにUbuntu18.04 LTSが追加されていますのでそちらから起動します。

    ![image_alt](/images/wsl_setup/wsl_distro_04.jpg)

## おわりに
WSL (Windows Subsystem for Linux) の導入手順について書きました。

WSLだけではLinuxコマンドをCygwin等を導入しなくても使用できるようになった程度でメリットが見えにくいです。
次回以降Dockerを使用したWEB開発環境の構築について書いていこうと思います。
