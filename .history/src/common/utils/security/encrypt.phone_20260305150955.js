
import crypto from 'crypto'  // built in 
// phone --> encrypt  ..
export const EncryptPhone = async function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
        return iv.toString("hex") + ":" + encrypted;  // String
}

export const key = crypto.scryptSync('secretPassword', 'salt', 32);









