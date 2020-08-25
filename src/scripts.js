let currentUser;
let userName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userFriends = document.querySelector('.friends');
let userStrideLength = document.querySelector('.stride-length');

const getCurrentUser = userData => {
  const allUsers = new UserRepo(userData);
  currentUser = new User(allUsers.returnUserData(1));
}

const populateUserData = currentUser => {
  userName.innerText = currentUser.userData.name;
  userAddress.innerText = currentUser.userData.address;
  userEmail.innerText = currentUser.userData.email;
  userFriends.innerText = currentUser.userData.friends;
  userStrideLength.innerText = currentUser.userData.strideLength;
}

window.onload = () => {
  getCurrentUser(userData);
  populateUserData(currentUser);
};


// console.log("Hello World");