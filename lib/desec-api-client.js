const Client = require("./restclient").ApiClient;

exports.Account = function (token) {

    const client = new Client(token);

    this.login = function (email, password, callback) {
        const post = {
            email: email,
            password: password
        };
        client.post("auth/login/", post, callback);
    }

    this.account = function (callback) {
        client.get("auth/account/", callback);
    }

    this.tokens = function (callback) {
        client.get("auth/tokens/", callback);

    }
}

exports.DNS = function (token) {

    const client = new Client(token);

    this.records = function (domain, callback) {
        const pathData = {
            "domain": domain
        };
        client.get("domains/${domain}/rrsets/", callback, pathData);
    }

    this.record = function (domain, subdomain, type, callback) {
        if (subdomain.length === 0)
            subdomain = "@";
        const pathData = {
            "domain": domain,
            "subdomain": subdomain,
            "type": type
        }
        client.get("domains/${domain}/rrsets/${subdomain}/${type}/", callback, pathData);
    }

    this.create = function (domain, data, callback) {
        const pathData = {
            "domain": domain
        }
        client.post("domains/${domain}/rrsets/", data, callback, pathData);
    }

    this.update = function (domain, subdomain, type, data, callback) {
        if (subdomain.length === 0)
            subdomain = "@";
        const pathData = {
            "domain": domain,
            "subdomain": subdomain,
            "type": type
        }
        client.patch("domains/${domain}/rrsets/${subdomain}/${type}/", data, callback, pathData);
    }
}

exports.Domain = function (token) {
    const client = new Client(token);

    this.domains = function (callback) {
        client.get("domains/", callback);
    }

    this.domain = function (domain, callback) {
        const pathData = {
            "domain": domain
        }
        client.get("domains/${domain}/", callback, pathData);
    }

    this.create = function (data, callback) {
        client.post("domains/", data, callback);
    }
}