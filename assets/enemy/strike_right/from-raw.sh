#!/usr/bin/env bash
cd "$(dirname "$0")"

for f in ../raw/walk_right/walk*.png
do
  convert "$f" -scale 182x200 "${f/*walk/000}"
done
