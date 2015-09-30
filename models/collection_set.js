//collections: {id_col_1: { name: String, monuments: { id_monument_1: {name: String}}},
//							id_col_2: { name: String, monuments: { id_monument_2: {name: String}}}}

module.exports = function(){
	var collectionSet = {
		append: function(oldCollections, newCollection){
			var newCollectionId,
					existsName;

			collectionSet = oldCollections;
			var collectionSetKeys = Object.keys(collectionSet).filter(function(key){
				return typeof collectionSet[key] == 'object';
			});

			if(collectionSetKeys.length === 0){
				newCollectionId = 0;
			} else {
				existsName = collectionSetKeys.some(function(key){
					var collection = collectionSet[key];
					return collection.name === newCollection.name;
				});

				if(existsName)
					throw 'collection already exists';

				newCollectionId = Number(collectionSetKeys.sort()[collectionSetKeys.length-1]) + 1;
			}

			newCollection['id'] = newCollectionId.toString();
			collectionSet[newCollectionId] = newCollection;
			return newCollection;
		}
	};

	return collectionSet;
};