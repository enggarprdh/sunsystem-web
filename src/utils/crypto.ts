/**
 * Utility functions for encrypting and decrypting data stored in localStorage
 */

// Simple encryption key - in a real app, consider using a more secure approach for managing this key
const ENCRYPTION_KEY = 'your-secure-encryption-key';

/**
 * Encrypts data before storing in localStorage
 * @param data - The data to encrypt
 * @returns Encrypted string
 */
export const encryptData = (data: string): string => {
  try {
    // Simple XOR encryption for demonstration
    // For production, consider using a more robust encryption library like CryptoJS
    const encrypted = Array.from(data)
      .map((char, index) => {
        const keyChar = ENCRYPTION_KEY[index % ENCRYPTION_KEY.length];
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
      })
      .join('');
    
    // Base64 encode for safe storage
    return btoa(encrypted);
  } catch (error) {
    console.error('Encryption error:', error);
    return data; // Fallback to unencrypted data
  }
};

/**
 * Decrypts data retrieved from localStorage
 * @param encryptedData - The encrypted data to decrypt
 * @returns Decrypted string
 */
export const decryptData = (encryptedData: string): string => {
  try {
    // Base64 decode
    const decoded = atob(encryptedData);
    
    // Reverse the XOR encryption
    const decrypted = Array.from(decoded)
      .map((char, index) => {
        const keyChar = ENCRYPTION_KEY[index % ENCRYPTION_KEY.length];
        return String.fromCharCode(char.charCodeAt(0) ^ keyChar.charCodeAt(0));
      })
      .join('');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData; // Return the original data if decryption fails
  }
};

/**
 * Enhanced localStorage methods with automatic encryption/decryption
 */
export const secureStorage = {
  setItem(key: string, value: string): void {
    const encryptedValue = encryptData(value);
    localStorage.setItem(key, encryptedValue);
  },
  
  getItem(key: string): string | null {
    const encryptedValue = localStorage.getItem(key);
    if (!encryptedValue) return null;
    return decryptData(encryptedValue);
  },
  
  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
  
  clear(): void {
    localStorage.clear();
  }
};
