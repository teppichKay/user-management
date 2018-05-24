## Build and run
Run the API server:

```
java -jar user-db.jar
```

Run the commands below in the project root directory.

```
npm install
npm start
```

## Project design

Major components are:

- **UserList** shows all the users and there information;
- **PostUser** is a form for creating new user.
- **UpdateUser** is a form for updating an existing user.
- An extra Modal will pop up on the front page when one clicks the delete button of a user from the user list.

State design for Redux:

To smoothly handle operations on different pages, states are structured as five major parts: addUser, updateUser, fetchUser, fetchUsers, deleteUser. For each parts, the nested states include at least:

- loading: to decide whether to progress bar or the real content.
- updated/fetched/added/deleted: operation is done.
- error: to handle potential error.



