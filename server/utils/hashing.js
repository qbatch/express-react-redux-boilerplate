import argon2 from 'argon2';

export const encrypt = async (str) => argon2.hash(str);

export const verify = async (encryptedStr, originalStr) => argon2.verify(encryptedStr, originalStr);
