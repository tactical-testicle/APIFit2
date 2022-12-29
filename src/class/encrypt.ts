import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import config from 'config'

export default class EncryptClass {
    private genRandomString(length: number ) {
        return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
    }

    private getStringValue(data: { toString: () => any; }) {
        if (typeof data === 'number' || data instanceof Number) {
            return data.toString();
        }
    
        if (!Buffer.isBuffer(data) && typeof data !== 'string') {
            throw new TypeError('Los datos para generar contraseñas deber ser de tipo String o Buffer');
        }
    
        return data;
    }

    private sha512(password: string, salt: string) {
        const hash = crypto.createHmac('sha512', this.getStringValue(salt))
        hash.update(this.getStringValue(password))
        const passwordHash = hash.digest('hex')
    
        return {
            salt,
            passwordHash
        }
    }

    public genPassword(password: String) {
        const salt = this.genRandomString(16)
        return this.sha512(String(password), salt)
    }

    public genResetPasswordToken(userId: any) {
        const text = JSON.stringify({ userId, valid: new Date().getTime() + `${config.get("crypto.auth_ttl")}` });
    
        const cipher = crypto.createCipher(config.get("crypto.auth_algorithm"), config.get("crypto.auth_secret"));
        let ciphered = cipher.update(text, config.get("crypto.auth_inputEncoding"), config.get("crypto.auth_outputEncoding"));
        ciphered += cipher.final(config.get("crypto.auth_outputEncoding"));
    
        return ciphered;
    }
    
    public genToken(usuario: any, callback: Function) {

        const payload = {
            usuario
        }
    
        jwt.sign(payload, config.get("jwt.accessTokenSecret"), {
            expiresIn: config.get("jwt.accessTokenLife")
        }, (err, token) => {
            if (err) {
                return callback(err);
            } else {
                return callback(token);
            }
        });
    }

    public tokenEmail(usuario: any, callback: Function) {
        const payload = {
            usuario
        }
    
        jwt.sign(payload, config.get("jwt.accessTokenSecret"), {
            expiresIn: '30m'
        }, (err, token) => {
            if (err) {
                return callback(err);
            } else {
                return callback(token);
            }
        });
    }

    public saltHashPassword(password: String) {
        const salt = this.genRandomString(16);
        return this.sha512(String(password), salt);
    }
}