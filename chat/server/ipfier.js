/**
 * Simple class that gets local IP, for testing purposes
 */

var os = require('os');

ipfier = exports;

ipfier.getIp = function getIp() { 
	ip = ''	
	Object.keys(os.networkInterfaces()).forEach(function (ifname) {
	var alias = 0;

	os.networkInterfaces()[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			return;
		}
		ip = iface.address;
		++alias;
	});	
});
	return ip;
}