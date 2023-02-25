'use strict';

// the data
const url = 'https://jsonplaceholder.typicode.com/todos/1'
const url2 = 'https://jsonplaceholder.typicode.com/todos'

// create event listener
document.querySelector("#btn-1").addEventListener('click', getUser)
document.querySelector("#btn-2").addEventListener('click', getUsers)

function getUser() {
  // Create XHR Object -- (XHR) objects are used to interact with servers without having to do a full page refresh
  let xhr = new XMLHttpRequest();

  // OPEN - type, url/file, async
  xhr.open("GET", url, true)
  
  // xhr.onprogress = function() {
  //   document.querySelector(".user").innerHTML = "Loading..."
  // }
  
  // Load the data into the page
  xhr.onload = function() {
    if(this.status == 200) {
      const user = JSON.parse(this.responseText)

      let outputTemplate = ``;
      outputTemplate += 
      `
        <li class="list-group-item" >User ID: ${user.id} </li>
        <li class="list-group-item" >User Title: ${user.title} </li>
        <li class="list-group-item" >User Completed: ${user.completed} </li>
      `
      document.querySelector(".user").innerHTML = outputTemplate

    }
  }

  // Sends the request
  xhr.send()
}

let count = 5;
function getUsers() {
  // first you have to create XHR Object
  let xhr = new XMLHttpRequest();

  // then you have to open
  xhr.open("GET", url2, true)

  xhr.onprogress = function () {
    document.querySelector(".users-title").innerHTML = "Loading..."
  }
  // then load it
  xhr.onload = function () {
    if (this.status == 200) {
      const users = JSON.parse(this.responseText)
      let templateUsers = ``;

      // itterate over all data
      for (let i = 0; i <= count; i++) {
        templateUsers +=
        `
          <li class="list-group-item active" >User #${i}</li>
          <li class="list-group-item" >User ID: ${users[i].id} </li>
          <li class="list-group-item" >User Title: ${users[i].title} </li>
          <li class="list-group-item" >User Completed: ${users[i].completed} </li>
        `
      }

      let counter = 5;
      if (count <= users.length) {
        count += counter;
      } else {
        console.log("Too Many");
      }

      document.querySelector(".users").innerHTML = templateUsers
      document.querySelector(".users-title").innerHTML = "Users:"
    }
  }

  // last step is to send it
  xhr.send()
}

// CODE PIECE
// let templateUsers = ``;
// let newTemplateUsers = ``
// function getUsersPossibleOptimized() {
//   // first you have to create XHR Object
//   let xhr = new XMLHttpRequest();

//   // then you have to open
//   xhr.open("GET", url2, true)

//   xhr.onprogress = function () {
//     document.querySelector(".users-title").innerHTML = "Loading..."
//   }
//   // then load it
//   xhr.onload = function () {
//     if (this.status == 200) {
//       const users = JSON.parse(this.responseText)


//       // itterate over all data

//       for (let i = newCount; i <= count; i++) {
//         templateUsers +=
//         `
//           <li class="list-group-item active" >User #${i}</li>
//           <li class="list-group-item" >User ID: ${users[i].id} </li>
//           <li class="list-group-item" >User Title: ${users[i].title} </li>
//           <li class="list-group-item" >User Completed: ${users[i].completed} </li>
//         `
//       }

//       newTemplateUsers = templateUsers
//       count += 5;
//       newCount += 5;

//       document.querySelector(".users").innerHTML = newTemplateUsers
//       document.querySelector(".users-title").innerHTML = "Users:"
//     }
//   }

//   // last step is to send it
//   xhr.send()

// }
// CODE PIECE END

getUsers()

let flag = true;
window.onscroll = () => {
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  let progressHeight = (window.scrollY / totalHeight) * 100;
  
  console.log("===========================");
  console.log("Total height: " + totalHeight);
  console.log("Progress Height: " + progressHeight);
  console.log("OFFSET: " + document.querySelector("body").offsetTop);

  if (flag) {
    // Your code here - this will execute the first time onscroll is triggered
    if (progressHeight >= 100) {
      getUsers()
      flag = false; // Set the flag to false to prevent the code from executing again immediately
  
      setTimeout(function() {
        flag = true; // Set the flag to true after a few seconds to allow the code to be executed again
      }, 100); // Wait for  before setting the flag to true
    }
  }
}

