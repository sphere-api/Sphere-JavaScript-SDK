# Sphere Javascript SDK
The official Javascript SDK for integrating Sphere into your webapp or website.

# Getting started
Checkout the latest branch of this repository in your VM:
```bash
git clone https://github.com/sphere-api/sphere-sdk.git
cd sphere-sdk
```

# How to include
In order to use the JavaScript SDK you must include the following script tag in your HTML document
```
<script type="text/javascript" src="src/sphere-sdk.min.js"></script>
```
Once included, your window object will contain a new global Object named **SphereSDK**.

# Authentication Methods
Sphere SDK has a few methods that could help you authenticate user, each one of them may receive a callback function.

### isAuthenticated
Check if user is authenticated in Sphere.

** Example: **
```
SphereSDK.isAuthenticated(function(res) {
    if(res.success) {
        console.log('User is authenticated');
    }
    else {
        console.log('User is not authenticated');
    }
});
```

### login
Opens a login popup for Sphere.

** Example: **
```
SphereSDK.login(function(res) {
    if(res.success) {
        console.log('User logged in!');
    }
});
```

### register
Opens a register popup for Sphere.

** Example: **
```
SphereSDK.register(function(res) {
    if(res.success) {
        console.log('User registered!');
    }
});
```

### logout
Logout a user from Sphere.

** Example: **
```
SphereSDK.logout(function(res) {
    if(res.success) {
        console.log('User logged out');
    }
});
```

---
## Demo
You may find a working example under the "demo" folder.