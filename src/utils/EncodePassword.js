import { encode } from 'js-base64'; // You can use any base64 encoding library

const secretKey = '00112233445566778899AABBCCDDEEFF';
const encodePassword = (password) => {
  const encodedPassword = encode(password + secretKey);
  return encodedPassword;
};

export default encodePassword;
