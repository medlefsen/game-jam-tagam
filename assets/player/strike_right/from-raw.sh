#!/usr/bin/env bash
cd "$(dirname "$0")"

files=( `printf "%s\n" ../raw/transition/*.png | sort` `printf "%s\n" ../raw/*.png | sort | tail -n +2` )
i=1
for f in "${files[@]}"
do
  convert "$f" -scale 182x200 "$(printf "%04d.png" $i)"
  let i++
done
