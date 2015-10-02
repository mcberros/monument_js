//collections: {id_col_1: { name: String, monuments: { id_monument_1: {name: String}}},
//							id_col_2: { name: String, monuments: { id_monument_2: {name: String}}}}

module.exports = function(collectionsData){
	var lastId, collectionsKeys;

	function initialize() {
		collectionsData = collectionsData || {};

		collectionsKeys = Object.keys(collectionsData);
		if(collectionsKeys.length === 0){
			lastId = 0;
		} else {
			lastId = Number(collectionsKeys.sort()[collectionsKeys.length-1]);
		}
	}

	initialize();

	var collectionSet = {
		data: function(){
			return collectionsData;
		},
		append: function(name){
			var newCollection = {name: name, monuments:{}};

			var existsName = collectionsKeys.some(function(key){
				var collection = collectionsData[key];
				return collection.name === newCollection.name;
			});

			if(existsName)
				throw 'collection already exists';

			lastId = lastId + 1;

			newCollection['id'] = lastId.toString();

			collectionsData[lastId] = newCollection;
			collectionsKeys.push(newCollection['id']);

			return newCollection;
		},
		update: function(name, collection_id){

			var collection = collectionsData[collection_id];

			if(!collection)
				throw 'collection does not exists';

			collection['name'] = name;
			collectionsData[collection_id] = collection;

			return collection;
		},
		delete: function(collection_id){
			var collection = collectionsData[collection_id];

			if(!collection)
				throw 'collection does not exists';

			delete collectionsData[collection_id];
			collectionsKeys = Object.keys(collectionsData);
			lastId = Number(collectionsKeys.sort()[collectionsKeys.length-1]);

			return collectionsData;
		}
	};

	return collectionSet;
};