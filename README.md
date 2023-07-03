<h1>How to set up project locally </h1>

Run ``npm i``
Run for dev ``npm run start:dev``
or Run for prod ``npm run start:prod``
Run for tests ``npm run test``
Go to http://localhost:5000

**Create new user**

```
curl --location 'http://localhost:5000/api/users' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test",
    "age": 20,
    "hobbies": ["test", "test1"]
}'
```

**Get all users**

```
curl --location 'http://localhost:5000/api/users'
```

**Get a specific user** (use your own user ID)
```
curl --location 'http://localhost:5000/api/users/d906d988-c9e6-41eb-a739-c7925f6aab2e'
```

**Update user** (use your own user ID and data)

```
curl --location --request PUT 'http://localhost:5000/api/users/d906d988-c9e6-41eb-a739-c7925f6aab2e' \
--header 'Content-Type: application/json' \
--data '{
    "username": "test1"
}'
```
**Delete user** (use your own user ID)
```
curl --location --request DELETE 'http://localhost:5000/api/users/3bfc1e4e-a136-42e2-a247-26a49e821454'
```