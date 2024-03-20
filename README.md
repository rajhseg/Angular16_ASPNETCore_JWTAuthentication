# Angular16_ASPNETCore_JWTAuthentication
This Repo consists of sample of Angular 16 application with ASPNET Core server based on JWT authentication

Following key **"JwtConfig:key": "CuYM000OLlMQG6VVLp1OH7Xzyw3eHuw1qvUC5dcGt8FLI"** in **appsettings json** should be placed or stored under secured environment like (KeyValut)

Authentication Flow

    -> Login Screen with credentials 

    -> token generate return the encoded token 
    
    -> Angular http interceptor sends token in header 

    -> middleware or onmessagerecevied bind the actual token from db based on encoded token

    -> (Based on JWTConfig in program.cs) Authorize attribute validate the claims**



**Login Page:**

![image](https://github.com/rajhseg/Angular16_ASPNETCore_JWTAuthentication/assets/9523832/da08e158-decf-4caa-bae9-171f3da27e80)

**Home Page:**

![image](https://github.com/rajhseg/Angular16_ASPNETCore_JWTAuthentication/assets/9523832/081ceaad-153e-4111-9092-ab8d0a62ee4b)


Angular App Consists of
1. Loading image
2. HttpToken Interceptor
3. Retry Interceptor
4. CRUD operations for Author and Book Page
5. Login Page
6. Router configuration
7. Angular Material implementation of Table, child table, input, button, card etc.

ASP Net Core Consists of
1. JWT Authentication
2. Repository Pattern
3. Role based controller
4. CRUD operations
5. Entity Framework Core

