const Crypto = require("crypto");

class JWT {
    constructor() {}

    // JSON -> String -> Buffer -> base64url encoding
    encode(obj) {
        return Buffer.from(JSON.stringify(obj)).toString("base64url");
    }

    // base64url -> Buffer -> String -> JSON
    decode(base64) {
        return JSON.parse(Buffer.from(base64, "base64url").toString("utf-8"));
    }

    createSignature(base64url, salt) {
        return Crypto.createHmac("sha256", salt)
            .update(base64url)
            .digest("base64url");
    }

    sign(data, salt) {
        const header = this.encode({ typ: "JWT", alg: "HS256" });
        const payload = this.encode(data);
        const base64url = [header, payload].join(".");
        const signature = this.createSignature(base64url, salt);
        const jwt = [base64url, signature].join(".");
        return jwt;
    }

    verify(token, salt) {
        try {
            const [header, payload, signature] = token.split(".");
            const base64url = [header, payload].join(".");
            const newSignature = this.createSignature(base64url, salt);
            if (signature !== newSignature) return null;
            const result = this.decode(payload);
            return result;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = new JWT();
