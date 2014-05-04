var internals = {};

internals.map = {};

internals.process = function(input) {
	var output = {};
	
	for (var i = 0; i < input.length; i++) {
		var obj = input[i];
		
		var primary_code = obj.primary_currency_code;
		
		var working_obj = {};
		if (internals.exists(primary_code)) {
			working_obj = internals.map[primary_code];
		} else {
			working_obj = internals.freshObj(obj);
		}
		
		if (obj.secondary_currency_code == 'LTC') {
			working_obj.secondary_ltc = obj.last_trade;
		}
		if (obj.secondary_currency_code == 'BTC') {
			working_obj.secondary_btc = obj.last_trade;
		}
		
		internals.map[primary_code] = working_obj;
	}

	output = internals.map;
	
	return output;
};

internals.exists = function(input) {
	if (internals.map[input]) {
		return true;
	} else {
		return false;
	}
}

internals.freshObj = function(data) {
	return {'primary_code': data.primary_currency_code, 'primary_name': data.primary_currency_name, 'secondary_btc': '0.00', 'secondary_ltc': '0.00'};
}

module.exports = internals;