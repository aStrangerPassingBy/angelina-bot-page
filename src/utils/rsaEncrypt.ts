import JSEncrypt from 'jsencrypt';

/**
 * @description 获取rsa加密后的密码
 * @param {String} publicKey 公钥
 * @param {String} password 密码
 * @return string
 */
export function getRsaPassword(publicKey: string, password: string) {
	const encryptor = new JSEncrypt();
	encryptor.setPublicKey(publicKey);
	return encryptor.encrypt(password);
}