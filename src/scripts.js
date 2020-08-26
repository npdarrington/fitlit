let userTitle = document.querySelector('.user-title');
let userName = document.querySelector('.name');
let userAddress = document.querySelector('.address');
let userEmail = document.querySelector('.email');
let userFriends = document.querySelector('.friends');
let userStrideLength = document.querySelector('.stride-length');
let userStepGoal = document.querySelector('.user-step-count');
let allUsersStepGoal = document.querySelector('.all-users-step-count');
let currentUser;
const allUsers = new UserRepo(userData);

const getCurrentUser = userData => {
  currentUser = new User(allUsers.returnUserData(1));
}

const populateUserData = currentUser => {
  userTitle.innerText = currentUser.getUserName();
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