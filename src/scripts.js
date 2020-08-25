let currentUser;
let userName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userFriends = document.querySelector('.friends');
let userStrideLength = document.querySelector('.stride-length');

const getCurrentUser = userData => {
  currentUser = userData.find(user => user.id === 1);
}

const populateUserData = currentUser => {
  console.log(currentUser);
  userName.innerText = currentUser.name;
  userAddress.innerText = currentUser.address;
  userEmail.innerText = currentUser.email;
  userFriends.innerText = currentUser.friends;
  userStrideLength.innerText = currentUser.strideLength;
}

window.onload = () => {
  getCurrentUser(userData);
  populateUserData(currentUser);
};


// console.log("Hello World");