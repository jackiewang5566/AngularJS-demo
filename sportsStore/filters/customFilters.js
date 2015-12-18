angular.module("customFilters",[])
.filter("unique",function(){
	return function(data,propertyName){
		if (angular.isArray(data)&&angular.isString(propertyName)) {
			var results=[];
			var keys={};
			for(var i=0;i<data.length;i++){
				var val=data[i][propertyName];
				if (angular.isUndefined(keys[val])) {
					keys[val]=true;
					results.push(val);
				};
			}
			return results;
		}else{
			return data;
		}

	}
})
.filter("range",function($filter){
	return function(data, page, size){
		if (angular.isArray(data)&& angular.isNumber(page)&& angular.isNumber(size)) {
			var start_index=(page-1)*size;
			if (data.length<start_index) {
				return [];
			}else{
				return $filter("limitTo")(data.splice(start_index),size);
				//$filter("limitTo")(input, limit, begin)
				//input: Source Array, string or number to be limited.(in this case data.splice(start_index))
				/*limit: The length of returned array or string. If the limit number is positive, limit the number
				of items from the beginning number of source array/string are copied. If the number is negative,
				limit number of items from the end of source array/string are copied. The limit will be trimmed 
				if it exceeds array.length. If limit is undefined, the input will return unchanged.(in this case
				size)*/
				/*begin(optional): Index at which to begin limitation. As a negative index, begin indicates an 
				offset from the end of input. Defaults to 0.*/
				/*limitTo returns a new sub-array or substring of length limit or less if input array had less 
				than limit elements.*/
			}
		}else{
			return data;
		}
	}
})
.filter("pageCount",function(){
	return function(data,size){
		if (angular.isArray(data)) {
			var result=[];
			for(var i=0; i<Math.ceil(data.length/size);i++){
				result.push(i);
			}
			return result;
		}else{
			return data;
		}
	}
})

	