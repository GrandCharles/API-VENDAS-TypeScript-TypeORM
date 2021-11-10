import * as CryptoJS from 'crypto-js';

const keys = '123456$#@$^@1ERF';

export default class Utils {

    public encryp(value: string): string {

        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

        return encrypted.toString();
    }


    public decrypt(value: string): string {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var decrypted = CryptoJS.AES.decrypt(value, key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
 



//import Edge from 'edge-js';
//let Edge = require('edge-js');
//import Saib from '../Utils/SAIB_CRIPT.DLL';

// gerar senha com salts = 8
//123456 - vNcox3s/MmE= / ZPuh9N7Dkvc= 
// SAIB_CRIPT


/*
function geraSenha(senha) {

    var soma = Edge.func({
        source: function () {
            async (dynamic, input) =>
            {
                var crypt = new SAIB_CRIPT.Encrypt(input);
                return crypt;
            }
        },
        references: ['saib_cript.dll']
    });

    geraSenha({ a: senha }, function (error, result) {
        if (error) throw error;

        console.log(result);
    });
};
*/
