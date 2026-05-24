// User Model
export interface User {
  id: string;
  email: string;
  username: string;
  role: string[]; // QUAN TRỌNG: role là ARRAY
  avatarUrl?: string;
}

// Decoded JWT Token
export interface DecodedToken extends User {
  nbf?: number;
  exp?: number;
  iat?: number;
}
