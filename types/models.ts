// User Model
export interface User {
  id: string;
  email: string;
  userNname: string; // tên trường tùy backend
  role: string[]; // QUAN TRỌNG: role là ARRAY
  avatarUrl?: string;
}

// Decoded JWT Token
export interface DecodedToken extends User {
  nbf?: number;
  exp?: number;
  iat?: number;
}
