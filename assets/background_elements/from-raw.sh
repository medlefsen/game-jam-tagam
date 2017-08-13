#!/usr/bin/env bash
cd "$(dirname "$0")"

convert raw/background.png -scale 1024 background.png
convert raw/cloud1.png -flop -scale 210 cloud1.png
convert raw/cloud2.png -flop -scale 212 cloud2.png
convert raw/cloud3.png -scale 288 cloud3.png

