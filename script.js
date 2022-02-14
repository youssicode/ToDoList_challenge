
const tasksContainer = document.querySelector(".tasksContainer")
const wrapperChild = document.querySelector(".wrapper.child")
const inputField = document.querySelector("input[name='newTask']")
const addBtn = document.querySelector(".addBtn")
const taskNbr = window.localStorage.length
let count

// Initialise the tasks saved in LocalStorage
if (taskNbr > 1) {
        let tempArray = new Array()
        for (let i = 0; i < taskNbr; i++) {
            let key = window.localStorage.key(i)
            if (key != "Counter") { 
                tempArray.push(window.localStorage.key(i).slice(5,key.length)) // create an array of key's last numbers
            } 
        }
        tempArray.sort(function (a,b) {return a-b}) // See: https://www.w3schools.com/jsref/jsref_sort.asp

        for (let i in tempArray) { // i = element's index
            let lastNbr = tempArray[i]
            addTask(window.localStorage.getItem(`Task_${lastNbr}`), lastNbr)
        }
        count = +window.localStorage.getItem("Counter") + 1 // + == Number()
} 
else if (taskNbr == 1) { // No tasks,just the counter
    count = +window.localStorage.getItem("Counter") + 1 // + == Number()
} 
else {
    count = 1
}

// Add New task
window.addEventListener("keydown", ev => {
    if (ev.key == "Enter") {
        pressAddBtn()
    }
})
addBtn.onclick = pressAddBtn;
function pressAddBtn() {
    if (inputField.value.trim()) { //* after removing spaces at the begining & at the end using trim() method, check if not empty 
        console.log(count)

        addTask(inputField.value, count)
        window.localStorage.setItem(`Task_${count}`,inputField.value) // Save the task in LocalStorage
        window.localStorage.setItem(`Counter`,count) // Save the task in LocalStorage
        count++
        inputField.value = "" // Clear the input field
        
    } else { // if empty
        alert("Please add a task.")
    }
}

function addTask(task,key) {
    let newChild = wrapperChild.cloneNode(true);  // Clone the hidden Wrapper
    newChild.style.display = "flex"; // Make the new Wrapper appear
    newChild.querySelector(".taskLabel").innerText = task; //Add the input text(Or L.S key's value) into task field
    // OR:  newChild.firstElementChild.innerText = inputField.value; 
    tasksContainer.append(newChild); //Add the new task in the page

    let delBtn = newChild.querySelector(".delBtn")
    delBtn.addEventListener("click",()=> {
        delBtn.parentElement.remove()
        window.localStorage.removeItem(`Task_${key}`)
    })
}

// window.localStorage.clear()


