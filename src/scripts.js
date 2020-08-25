let currentUser;

const getCurrentUser = userData => {
  currentUser = userData.find(user => user.id === 1);
}



window.onload = getCurrentUser(userData);


// console.log("Hello World");