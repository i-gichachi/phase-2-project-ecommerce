const jsonData = {
    "users": [
      {
        "first_name": "K",
        "last_name": "M",
        "email": "km@gmail.com",
        "password": "123456",
        "confirm_password": "123456",
        "agreedToTerms": true,
        "id": 2
      },
      {
        "first_name": "Yakuza",
        "last_name": "Jnr",
        "email": "j@gmail.com",
        "password": "1234",
        "confirm_password": "1234",
        "agreedToTerms": true,
        "id": 3
      }
    ],
    "login": [
      {
        "email": "km@gmail.com",
        "password": "123456",
        "id": 1
      }
    ]
  }

  // Convert the JSON data to a string and store it in local storage
    localStorage.setItem('userData', JSON.stringify(jsonData));

    // dataStorage.js

    export function storeUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  
  export function retrieveUserData() {
    const storedData = localStorage.getItem('userData');
    return JSON.parse(storedData);
  }
  