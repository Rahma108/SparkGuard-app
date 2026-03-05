
import crypto from 'crypto'  // built in 

// phone --> encrypt  ..
export const EncryptPhone = async function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the data
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return both the encrypted data and the IV
        return iv.toString("hex") + ":" + encrypted;  // String
}

// Example usage
// Note: In a real application, use a properly generated and securely stored key
export const key = crypto.scryptSync('secretPassword', 'salt', 32); // 32 bytes = 256 bits









