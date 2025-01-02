# Order Management System

A backend application built with **NestJS** and **Prisma**, using **MongoDB** as the database. It allows **regular users** to create orders, each associated with a unique chat room for communication with administrators.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Postgressql](https://www.postgresql.com/)
- [Swagger](https://swagger.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- **Node.js** (v20 or later)
- **npm**
- **Postgresql** instance (local or cloud)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/order-management-system.git
   cd order-management-system

2.Install Dependencies

Using npm:

npm install


3. Environment Variables
Create a .env file at the root of the project and add your Postgresql connection string:

env

postgresql://<username>:<password>@localhost:5432/<DatabaseName>

Replace <username>, <password>, <DatabaseName> and other placeholders with your Postgresql credentials.

Prisma Setup
Ensure schema.prisma is Located Correctly

The Prisma schema should be at ./prisma/schema.prisma. If it's not, move it:


mkdir -p prisma
mv ./src/prisma/schema.prisma ./prisma/schema.prisma
Generate Prisma Client


npx prisma generate
Running the Application
Start the NestJS application in development mode:


npm run start:dev

The server will run at http://localhost:4000.

API Documentation
Access Swagger UI at http://localhost:4000/api to explore and test the API endpoints.

Project Structure

order-management-system/
├── src/   
├── modules
│   ├── chats/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── repository/
│   │   ├── chats.controller.ts
│   │   └── chats.module.ts
│   ├── orders/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── repository/
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   ├── users/
│   │   ├── dtos/
│   │   ├── entities/
│   │   ├── repository/
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts 
│   │   ├── interfaces/
│   │   └── utils/  
│   ├── prisma/
│   │   ├── schema.prisma
│   ├── shared/
│   │   ├── interfaces/
│   │   └── utils/
│   ├── app.module.ts
│   └── main.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json


Ensure schema.prisma is located at ./prisma/schema.prisma. If it's elsewhere, specify the path using the --schema flag:

npx prisma generate --schema=./path/to/schema.prisma

API Property Decorator Errors

Make sure you have the latest version of @nestjs/swagger:


npm install @nestjs/swagger@latest
Foreign Key Constraint Issues

Verify that all referenced records exist before creating or updating related documents.

License
This project is licensed under the MIT License.






