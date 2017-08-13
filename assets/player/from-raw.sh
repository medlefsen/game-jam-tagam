#!/usr/bin/env bash
cd "$(dirname "$0")"

convert raw/transition/player_transition1.png -scale 182x200 stationary.png
convert raw/transition/player_transition1.png -scale 64x64 -extent 64x64 -gravity center -background none favicon.ico
