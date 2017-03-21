#!/bin/sh
for i in $(ls -d */)
do
	echo "${i%%/}"
done