let taskItem;
let personsId = [];
const taskList = document.getElementById("taskList");
const personList = document.getElementById("persons");
let userTasks = [];
let tasks = [];
let selectedUser = 'Choose a person'
const baseUrl = "http://localhost:3000"
console.log(personsId);


// add id to database //   
function userId() {

}






function additem(arrTask) {
  taskItem = document.getElementById("input1").value;
  taskUser = document.getElementById("input2").value;
  if (taskItem !== "" || arrTask !== undefined) {
    let task = arrTask !== undefined ? arrTask : taskItem;

    if (arrTask === undefined) {

      const curTime = new Date()
      const taskObj = {
        task_name: task,
        person: taskUser,
        person_id: selectedUser.id,
        date_assigned: curTime
      };

      fetch(`${baseUrl}/addtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObj)

      })
        .then((response) => response.json())
        .then((data) => console.log(data));

    };

    location.reload(); 
    document.getElementById("input1").value = "";
  } else {
    alert("Enter next task");
    return;
  }
  
};






//////////////////////////////////////////////////////////////
function addPerson(arrPersons) {
  // get value from the input text //
  let name = document.getElementById('name').value;


  if (arrPersons === undefined) {
    const personObj = {
      name: name,

    };
    fetch(`${baseUrl}/addperson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(personObj)

    })
      .then((response) => response.json())

  };
  


  // clear input text
  const btn = document.getElementById("person-update");

  btn.addEventListener('clicked', function handlerClick() {

  });
  document.getElementById("name").value = "";
  location.reload();
};


////////////////////////////////////////////////////////////////

function filterTask() {
  selectedUser = document.getElementById('input2').value
  
  filterUserTasks()
  
  printCurrentTasks()
 
};


///////////////////////////////////////////////////////////////

//get persons and add the dropdown//
fetch(`${baseUrl}/getpersons`)
  .then(function (response) {
    return response.json();
  })
  .then(function (people) {
    people.sort();
    
    people.forEach(function (person) {
      personsId.push(person);
      var nameList = document.createElement("option");
      nameList.text = person.name;

      input2.append(nameList);
      
     

    });


  })
  .catch(function (err) {
    console.log(err);
  });



///////////////////////////////////////////////////////////////////////
function getTodos() {
  fetch(`${baseUrl}/gettodos`)
  .then(function (response) {
    return response.json();
  })
  .then(function (todos) {
    tasks = todos
    filterUserTasks()
    printCurrentTasks()

  })
  .catch(function (err) {
    console.error(err);
  });
};

// get task by user //
function filterUserTasks() {
  userTasks = []
  if (selectedUser === 'Choose a person' ){    
    userTasks = tasks
  }else if(selectedUser !== 'Choose a person'){
    tasks.forEach(function (task) {  
      if(selectedUser === task.person){
        userTasks.push(task)
      }
    });
    
  }

  
  
}


// display current tasks
function printCurrentTasks() {
  let tbodyEl = document.querySelector("tbody");
  tbodyEl.innerHTML = "";
  userTasks.forEach(function (taskName) {
    let nameTask = document.createElement("tr");
    

    nameTask.classList.add("td");
    nameTask.text = taskName.task_name.person;
    nameTask.value = taskName.task_name.person;


    tbodyEl.innerHTML += `
     <tr>
      <td>${taskName.task_name}</td>
      <td>${taskName.person}</td>
      <td>${taskName.date_assigned}</td>
      <td>${taskName.id}</td>
      <td>
      <button onclick="deleteTask(${taskName.id})" id="deleteTask_${taskName.id}" class="button">
      Delete Task
      </button>
      </td>
     </tr>
     `;


    const deleteB = document.getElementById(`deleteTask_${taskName.id}`);




  });
  
};

function deleteTask(taskId) {

  fetch(`${baseUrl}/deletetask/todos/` + taskId, {
    method: 'DELETE',
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(function (err) {
      console.error(err);
    });
  location.reload();

};


getTodos();



