export class User {
    id: string;
    email: string;
    password: string; 
    name: string;
    role: 'ADMIN' | 'REGULAR';
    createdAt: Date;
    updatedAt: Date;
}
  