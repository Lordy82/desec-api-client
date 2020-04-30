const Client = require('node-rest-client').Client;

const client = new Client();
const baseUrl = "https://desec.io/api/v1/";

exports.ApiClient = function (token) {

    const defaultHeader = {
        "Content-Type": "application/json"
    }
    const header = {
        "Content-Type": "application/json",
        "Authorization": "Token " + token
    }

    this.get = function (path, callback, pathData = null) {
        const args = {
            headers: header
        };
        if (pathData != null)
            args.path = pathData;
        client.get(baseUrl + path, args, function (data, response) {
            callback(data);
        });
    }

    this.post = function (path, post, callback, pathData = null) {
        const args = {
            headers: defaultHeader,
            data: post
        };
        if (token != null) {
            args.headers = header
        }
        if (pathData != null)
            args.path = pathData;
        client.post(baseUrl + path, args, function (data, response) {
            callback(data);
        });
    }

    this.patch = function (path, post, callback, pathData = null) {
        const args = {
            headers: header,
            data: post
        };
        if (pathData != null)
            args.path = pathData;
        client.patch(baseUrl + path, args, function (data, response) {
            callback(data);
        });
    }
};