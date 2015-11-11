#!/bin/bash

echo "Running provision external configuration file"
apt-get update -y > /dev/null

echo "Install git"

apt-get install git -y > /dev/null

echo "Install ohmyz"
apt-get install zsh -y > /dev/null
wget --no-check-certificate http://install.ohmyz.sh -O - | sh

echo "Install Atom editor"

add-apt-repository ppa:webupd8team/atom -y > /dev/null &&
apt-get update -y > /dev/null &&
apt-get install atom -y > /dev/null
