

for name in `ls`
do
    sed -ie "s/.xlsx//g" $name
done;
