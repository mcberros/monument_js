module.exports = function(collectionsData){
	var lastId, collectionsIds;

	function initialize() {
		collectionsData = collectionsData || {};

		calculateIds();
	}

	function calculateIds(){
		collectionsIds = Object.keys(collectionsData);
		if(collectionsIds.length === 0){
			lastId = 0;
		} else {
			lastId = Number(collectionsIds.sort()[collectionsIds.length-1]);
		}
	}

	initialize();

	var collectionSet = {
		data: function(){
			return collectionsData;
		},
		append: function(name){
			var newCollection = {name: name, monuments:{}};

			var existsName = collectionsIds.some(function(key){
				var collection = collectionsData[key];
				return collection.name === newCollection.name;
			});

			if(existsName)
				throw 'collection already exists';

			lastId = lastId + 1;

			newCollection['id'] = lastId.toString();

			collectionsData[lastId] = newCollection;
			collectionsIds.push(newCollection['id']);

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
			calculateIds();

			return collectionsData;
		}
	};

	return collectionSet;
};