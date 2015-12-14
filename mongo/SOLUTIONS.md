### Mongo playground

The dump of the database contains information about cities and countries.
The data is taken from geonames.org
 
 you can find some details about the fields in http://download.geonames.org/export/dump/readme.txt

 The data has been manually inserted and restructured a bit.

 You can find below some exercises. I "solved" first 2 to get you going with actual queries.

 I tried to pick such that both beginners and advanced find something interesting to try out. Don't worry about doing them all, try, read documentations. We will go through them during the 30mins before next session

1. Restore the provided dump
    * unzip dump.zip
    * mongorestore --db geo dump/geo
2. Find out available collections
    * mongo geo
    * `show collections` or `show tables`
3. explore what fields are available in the collections
    * for any collection you can call `db.collectionName.findOne()` and see a sample of one object. e.g. in this example that would be `db.city.findOne()` and `db.country.findOne()`
    * !NOTE - this does not mean that all objects will have the same structure, as mongo has flexible schema, you might have documents of different size and shape.
    * you can also do db.collectionName.find().limit(10).toArray() to see 10 more objects printed nicely as json
4. Find Germany *(hint: name is your main field)*
    * the exact query will look like this - `db.country.find({name:"Germany"})`
    * you can always add `.toArray()` in the end, to get nicer output
    * However with string fields it is useful to do regex queries, when you are not sure about case. The regex query to get country Germany case insensitive, will be:
        `db.country.find({name:/germany/i})`
    * you can read more about regex in mongo from https://docs.mongodb.org/v3.0/reference/operator/query/regex/
5. Find count of countries
    * `db.country.count()`
    * you can call the `.count()` function after any find query. this returns the count of found elements.
6. Find cities of Germany
    * to solve this exercise you should start from understanding how the country and city collections are connected.
    * as there is no fixed schema, there is also no possibility to look this information somewhere up (no foreign keys like in MySQL)
    * `db.city.findOne()` you can see a country field with a long value `"country" : NumberLong("404593060207398912")`
    * that is the _id field connection to the country collection. You can ensure that, by running the following query and getting the country as the output.
     `db.country.findOne({_id:NumberLong("404593060207398912")})`
    * Having this and previous exercise you should find your way out ;)
7. Find 10 most populated cities
    * By again exlporing the fields in the city collection you can see that there is a field called population.
    * Sorting is achieved by a function called `sort`
    * As an argument to that function you should provide the object, representing the field and the "direction" of the search - asc/desc.
    * In our case, we are interested in finding the most populated cities so we will do 
    `db.city.find().sort({population:-1}).limit(10)`
    * hint: in order to get a better output, you can limit the number of fields shown in the final resutl
    `db.city.find({},{name:true, population:true}).sort({population:-1}).limit(10)`
8. Output their names only
    * see above hint
9. Remove iso_n3 field from country collection
    * Sometimes you want to get rid of a field in a collection. e.g. iso_n3 in country collection doesn't make any sense to you and takes up space
    db.country.update({},{$unset:{iso_n3:true}}, false, true)

    Explanation: The first argument of the update function is the query to use to find the documents that need to be updated. For us it's an empty object, which would mean - any document
    The second argument is an object, containing the operation that needs to be performed on the found documents. In our case that's operator called `$unset`
    You can read more about update operators in : https://docs.mongodb.org/v3.0/reference/operator/update/
10. find Munich *(hint: field name contains canonical name, field s_names contains list of alternative names/hints )*
    * The regex operator works also on array fields, meaning the document will be returned if at least one object in an array will match the regex, so here you can use the s_names and search for munich there
    `db.city.find({s_names:/munich/i})`
11. find cities whose name starts with "Muc"
    * Same regex logic
12. find indexes that are set on city collection
    * the function for this would be:
    `db.city.getIndexes()`
    * read more about mongo indexing: https://docs.mongodb.org/v3.0/indexes/
13. find cities near munich (e.g. 10KM) *hint: https://docs.mongodb.org/manual/tutorial/query-a-2dsphere-index/*
    * first find the coordinates of Munich - 
    `db.city.find({s_names:/munich/}, {location:1})`
    * Then build a near query with maxDistance of 10KM
     `db.city.find({location:{$near: {     $geometry: {        type: "Point" ,        coordinates: [ 11.57549 , 48.13743 ]     },     $maxDistance: 10000 }}}, {name:1} )`
14. write a js mongo shell script which will populate city collection with correct country names 
    * see the solution attached. Please note this is just one example of a solution, yourse can differ.
15. dump the result database
    * mongodump binary is providing this possibility and you can do :
    `mongodump -d geo` (dumps into dump folder of the directory you execute the command from).
