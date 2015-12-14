var countryCursor = db.country.find({},{name:1});

while(countryCursor.hasNext()){
	var country = countryCursor.next();
	var country_id = country["_id"];
	var name = country["name"];
	
	db.city.update({country: country_id}, {$set:{countryName:name}}, false, true);

	var res = db.runCommand({getLastError:1})
	print("Cities of the country " + name +" have been updated");
	printjson(res);
}
