#!/usr/bin/env bash
cd "$(dirname "$0")"

files=(../raw/strike/strike*.png)

i=0
for f in "${files[@]}"
do
  new_file="${f/*strike/000}"
  convert "$f" -scale 182x200 -flop "$new_file"
  cp "$new_file" "$(printf '%04d.png' $(( ${#files[@]} - $i + ${#files[@]} )) )"
  let ++i
done
