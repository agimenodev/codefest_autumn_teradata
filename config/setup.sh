#!/bin/bash

echo "Running provision external configuration file"
apt-get update -y > /dev/null

echo "Install git"
apt-get install git -y > /dev/null

echo "Install nodeJS"
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - &&
apt-get install -y nodejs

echo "Install zsh"
apt-get install zsh -y > /dev/null
wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh
sudo chsh -s /bin/zsh vagrant
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
zsh

echo "Install Atom editor"

add-apt-repository ppa:webupd8team/atom -y > /dev/null &&
apt-get update -y > /dev/null &&
apt-get install atom -y > /dev/null
