### nuber eats with prisma

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## .env example

```
DATABASE_URL="postgresql://<user-name>:<password>@localhost:<port>/<db-name>?schema=public"
```

## User Model :

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

# User CRUD:

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email
