# Components
```mermaid
flowchart TD
    app --> |/ or /login| login[[login]]
    app --> |/associations| associations-list[[associations-list]]
    app --> |/users| users-list[[users-list]]
    app --> |/profile| profile[[profile]]
    app --> |any other| pagenotfound[[pagenotfound]]
    
    association-info[[association-info]] --> |userid| uc{{user-card}}
    associations-list[[associations-list]] --> |/:id| association-info[[association-info]]
    users-list[[users-list]] --> |userid| uc{{user-card}}
```

```mermaid
flowchart LR
    subgraph Legend
    app
    1[[page]]
    2{{component}}
    app --> |route| 1
    3[[page]]
    3 --> |component props| 2
    end
```

Arriving at the app you need to log in or register via the login form. Next, you can navigate between the associations list and users list. These list enable access to the detail of a user or an association.

If the page you request is not available, then you will be redirected to the `pagenofound` module.

# External dependencies
- [Tailwind CSS](https://tailwindcss.com/) for nice in-HTML styles with classes
- [DaisyUI](https://daisyui.com/) for nice components, like inputs and modals.

# Inputs
All the inputs are in forms that uses `FormGroup`. In this way, we can get all the values of a form by querying it on only one object that is always up-to-date. 

This allows forms to have the property `(ngSubmit)`, so that the request is sent if either the submit button is pressed, or the enter key is pressed on any of the fields.

# Login
The login module is defined in `interceptors` module. If a backend request failed and return a `404` error, then we have to reconnect the user.

# Lists
Associations and users list uses tables with buttons on each line.
