#!/usr/bin/env bash
cd "$(dirname "$0")"

for f in ../raw/strike/strike*.png
do
  convert "$f" -scale 182x200 -flop "${f/*strike/000}"
done
