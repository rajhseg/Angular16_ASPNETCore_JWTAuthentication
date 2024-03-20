using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;

namespace WebApp.Server
{
     public static class EncDecHelper
    {
        private const int Keysize = 128;
        
        private const int DerivationIterations = 1000;

        public static string EncryptedData(string plainText, string passPhrase)
        {              
            var saltString = Generate128Bit();
            var ivString = Generate128Bit();
            var plainTextObj = Encoding.UTF8.GetBytes(plainText);
            using (var password = new Rfc2898DeriveBytes(passPhrase, saltString, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 128;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var encryptor = symmetricKey.CreateEncryptor(keyBytes, ivString))
                    {
                        using (var mStream = new MemoryStream())
                        {
                            using (var cStream = new CryptoStream(mStream, encryptor, CryptoStreamMode.Write))
                            {
                                cStream.Write(plainTextObj, 0, plainTextObj.Length);
                                cStream.FlushFinalBlock();                               
                                var cipherText = saltString;
                                cipherText = cipherText.Concat(ivString).ToArray();
                                cipherText = cipherText.Concat(mStream.ToArray()).ToArray();
                                mStream.Close();
                                cStream.Close();
                                return Convert.ToBase64String(cipherText);
                            }
                        }
                    }
                }
            }
        }

        public static string DecryptData(string cipherText, string passPhrase)
        {         
            var cipherTextSaltAndIv = Convert.FromBase64String(cipherText);           
            var saltString = cipherTextSaltAndIv.Take(Keysize / 8).ToArray();           
            var ivString = cipherTextSaltAndIv.Skip(Keysize / 8).Take(Keysize / 8).ToArray();            
            var cipherTextObj = cipherTextSaltAndIv.Skip((Keysize / 8) * 2).Take(cipherTextSaltAndIv.Length - ((Keysize / 8) * 2)).ToArray();

            using (var password = new Rfc2898DeriveBytes(passPhrase, saltString, DerivationIterations))
            {
                var keyBytes = password.GetBytes(Keysize / 8);
                using (var symmetricKey = new RijndaelManaged())
                {
                    symmetricKey.BlockSize = 128;
                    symmetricKey.Mode = CipherMode.CBC;
                    symmetricKey.Padding = PaddingMode.PKCS7;
                    using (var decryptor = symmetricKey.CreateDecryptor(keyBytes, ivString))
                    {
                        using (var mStream = new MemoryStream(cipherTextObj))
                        {
                            using (var cStream = new CryptoStream(mStream, decryptor, CryptoStreamMode.Read))
                            using (var Reader = new StreamReader(cStream, Encoding.UTF8))
                            {
                                return Reader.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }

        private static byte[] Generate128Bit()
        {
            var rbytes = new byte[16]; 
            using (var csp = new RNGCryptoServiceProvider())
            {                
                csp.GetBytes(rbytes);
            }
            return rbytes;
        }
    }

}
