file="./scripts/duration-length.txt"
# duration-length.txt example
# https://github.com/shufangOrg/shufang.org/commit/bb08abed58cb35e530988eb44c2683c6327578e1
if [ -f "$file" ]
then
    for i in $(cat $file); do
        mp3="https://"$(cat "$i" | grep "^mp3 =" | awk -F'"' '{print $2}')
        duration=$(ffprobe -i "$mp3" -show_entries format=duration -v quiet -of csv="p=0" -sexagesimal)
        length=$(ffprobe -i "$mp3" -show_entries format=size -v quiet -of csv="p=0")
        sed -i "s/^duration = .*/duration = \"$duration\"/g" "$i"
        sed -i "s/^length = .*/length = $length/g" "$i"
        cat "$i"
    done
fi
