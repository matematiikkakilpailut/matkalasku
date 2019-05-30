#!/bin/sh
export LC_ALL=C
TMP=`mktemp -t munge.sh`
trap "rm $TMP 2>/dev/null" 0
echo 'Päivölän kansanopisto' > $TMP
sed -e '1d;s/[^;]*;//;s/;.*//' < kuntaluettelo-laajat-tiedot-2018-01-01.csv >> $TMP
ramda -r --slurp -o json < $TMP > kunnat.json
ramda 'pluck \stationName' 'filter((x) -> x is not /(tavara|lajittelu|ratapiha|raiteet|vaihde|[0-9])$|Moskova|Petroskoi|Pietari/)' < asemat.json > $TMP.2
cat kunnat.json $TMP.2 | ramda --slurp 'reduce concat, []' uniq > paikat.json
