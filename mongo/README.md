### Mongo playground

The dump of the database contains information about cities and countries.
The data is taken from geonames.org
 
 you can find some details about the fields in http://download.geonames.org/export/dump/readme.txt

 The data has been manually inserted and restructured a bit.

 You can find below some exercises. I "solved" first 2 to get you going with actual queries.

 I tried to pick such that both beginners and advanced find something interesting to try out. Don't worry about doing them all, try, read documentations. We will go through them during the 30mins before next session

 #through mongo client

1.Restore the provided dump
    * unzip dump.zip
    * mongorestore --db geo dump/geo
2. Find out available collections
    * mongo geo
    * show collections
3. explore what fields are available in the collections
4. Find Germany *(hint: name is your main field)*
5. Find count of countries
6. Find cities of Germany
7. Find 10 most populated cities
8. Output their names only
9. Remove iso_n3 field from country collection
10. find Munich *(hint: field name contains canonical name, field s_names contains list of alternative names/hints )*
11. find cities whose name starts with "Muc"
12. find indexes that are set on city collection
13. find cities near munich (e.g. 10KM) *hint: https://docs.mongodb.org/manual/tutorial/query-a-2dsphere-index/*
14. write a js mongo shell script which will populate city collection with correct country names 
15. dump the result database

