/**
 * Created by Carlos on 14/08/2014.
 */

"use strict";

function XHR () {

    var statuses = {
        "100": "Continue",
        "101": "Switching Protocols",
        "102": "Processing",
        "200": "OK",
        "201": "Created",
        "202": "Accepted",
        "203": "Non-Authoritative Information",
        "204": "No Content",
        "205": "Reset Content",
        "206": "Partial Content",
        "207": "Multi-Status",
        "208": "Already Reported",
        "226": "IM Used",
        "300": "Multiple Choices",
        "301": "Moved Permanently",
        "302": "Found",
        "303": "See Other",
        "304": "Not Modified",
        "305": "Use Proxy",
        "306": "Switching Proxy",
        "307": "Temporary Redirect",
        "308": "Permanent Redirect",
        "400": "Bad Request",
        "401": "Unauthorized",
        "402": "Payment Required",
        "403": "Forbidden",
        "404": "Not Found",
        "405": "Method Not Allowed",
        "406": "Not Acceptable",
        "407": "Proxy Authentication Required",
        "408": "Request Timeout",
        "409": "Conflict",
        "410": "Gone",
        "411": "Length Required",
        "412": "Precondition Failed",
        "413": "Request Entity too Large",
        "414": "Request-URI too Long",
        "415": "Unsupported Media Type",
        "416": "Requested Range not Satisfiable",
        "417": "Expectation Failed",
        "418": "I'm a Teapot"
    };

    var xmlObject = {};
    var _this = this;

    this.jsonToParams = function (json) {
        var params = "";

        for (var attr in json) {
            if (params === "") {
                params = attr.concat("=".concat(json[attr]));
            } else {
                params = params.concat("&".concat(attr.concat("=".concat(json[attr]))));
            }
        }
        return params;
    };

    this.get = function (url, params, callback) {
        params = typeof params === "string" ? params :
            _this.jsonToParams(params);
        url = url.concat("?".concat(params));
        this.xhr("get", url, params, callback);
    };

    this.post = function (url, params, callback) {
        params = typeof params === "string" ? params :
            _this.jsonToParams(params);
        this.xhr("post", url, params, callback);
    };

    this.put = function (url, params, callback) {
        params = typeof params === "string" ? params :
            _this.jsonToParams(params);
        url = url.concat("?".concat(params));
        this.xhr("put", url, params, callback);
    };

    this.delete = function (url, params, callback) {
        params = typeof params === "string" ? params :
            _this.jsonToParams(params);
        url = url.concat("?".concat(params));
        this.xhr("delete", url, params, callback);
    };   

    this.xhr = function (method, url, params, callback) {
    	url = url[0] === "/" ? location.origin + url : url;
    	
        try {
        	xmlObject = window.XMLHttpRequest ? new XMLHttpRequest() : 
        		new ActiveXObject("Microsoft.XMLHTTP");            

            xmlObject.onreadystatechange = function () {
                try {
                	if (xmlObject.readyState === 4 && xmlObject.status === 200) {
	                    var data = xmlObject.responseText;
	                    callback(null, data);
	                } 
                } catch (err) {
                    var error = {
                        err : err,
                        message: xmlObject.status + "->" + statuses[xmlObject.status]
                    };
                	callback(error, null);
                }
            };

            xmlObject.open(method, url, true);
            xmlObject.setRequestHeader('Content-type','application/x-www-form-urlencoded');

            switch(method) {
            	case "post":            	            	
            		xmlObject.send(params);
            	break;
                default:
            		xmlObject.send();
            	break;
            }
        } catch (err) {
            console.error(err);
        }
    }

}
