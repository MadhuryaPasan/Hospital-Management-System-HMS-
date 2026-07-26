# Hospital-Management-System-HMS-


Frontend : Next js
Backend: Nest js




steps I follow

- sould create user befor auth. because auth depend on user.

- fist folder structure (added common,config,database folders)

- add code for uesr entity.

- then create user dto

- now do validation use this to install it (`npm install class-validator class-transformer`)

- then need to change main.ts to enable globla validation

- improve the dto to add this validation

- update user services

- install new auth modules

```bash
nest g module auth
nest g controller auth
nest g service auth
```

- update user.module.ts to add export

- import user module to the auth.module.ts

- inject user service to the auth.service.ts

- now user registration

> dto should belong to controllers. (i will do that later when in refactor time)


install bcrypt
```bash
npm install bcrypt
npm install -D @types/bcrypt
```


> DTOs describe API contracts, not database models

- create the register dto inside the auth/dto

- create register endpoint

> try to create endpoint i mean the controller first and  then the service

- create register() in auth service

- add bycrypt codes on auth.sercice.ts

- refactor the user.service.ts create()

- create login dto
- update controller and service

- install JWT
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

- register jwtmodule on auth.module.ts
- inject jwtservice on auth.service.ts
- create jwt strategy
```bash
nest g class auth/strategies/jwt.strategy --no-spec
```
- add PassportStrategy to new jwt.strategy.ts
