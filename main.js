// // 1. 유저가 값을 입력한다.
// // 2. + 버튼을 누르면 할 일이 추가된다.
// // 3. Check 버튼을 누르면 할 일에 밑줄이 생긴다. -> 객체를 만들어라.
// // 4. Delete 버튼을 누르면 할 일이 삭제된다.
// // 5. 탭을 누르면 언더바가 이동한다.
// // 6. 각 탭을 누르면 탭마다 아이템을 보여준다.

let inputArea = document.getElementById("input-area");
let buttonArea = document.getElementById("button-area");
let deleteButton = document.getElementById("deleteButton");
let navbarList = document.querySelectorAll(".navbar div");
let taskList = [];
let filterList = [];
let mode = 'all';

buttonArea.addEventListener("click", () => {
    addTask();
    render();
    inputArea.value = "";
});
inputArea.addEventListener("keypress", (event) => {
    if(event.key === "Enter") {
        addTask();
        render();
        inputArea.value = "";
    }
});

for(let i=1; i<navbarList.length; i++) {
    navbarList[i].addEventListener("click", function(event) {
        filter(event);
    })
};

// 할 일 추가
function addTask() {
    let task = {
        id: randomId(),
        taskContent: inputArea.value,
        isComplete: false
    };
    taskList.push(task);
};

// 할 일 render
function render() {
    let list = [];
    if(mode === "all") {
        list = taskList;
    } else if(mode === "ongoing" || mode === "done") {
        list = filterList;
    };

    let resultHTML = '';
    for(let i=0; i<list.length; i++) {
        if (list[i].isComplete === true) {
            resultHTML += `
            <div class="list">
                <button class="returnButton" onclick= "checkItem('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                <div class="middleLine">${list[i].taskContent}</div>
                <button><i class="fa-regular fa-pen-to-square"></i></button>
                <button id="deleteButton" onclick="deleteRender('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
        } else {
            resultHTML += `
            <div class="list">
                <button class="checkButton" onclick= "checkItem('${list[i].id}')" ><i class="fa-solid fa-check"></i></button>
                <div class="taskContent">${list[i].taskContent}</div>
                <button><i class="fa-regular fa-pen-to-square"></i></button>
                <button id="deleteButton" onclick="deleteRender('${list[i].id}')"><i class="fa-solid fa-trash-can"></i></button>
            </div>
            `;
        }
    }

    document.getElementById("todo-list").innerHTML = resultHTML;
};

function checkItem(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id === id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
};

function randomId() {
    return Math.random().toString(36).substr(2, 16);
};

function filter(event) {
    console.log("filter", event.target.id)
    mode = event.target.id;
    filterList = [];
    console.log("filterList", filterList)

    if(mode === "all") {
        render();
    } else if(mode === "ongoing") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if(mode === "done") {
        for(let i=0; i<taskList.length; i++) {
            if(taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
};

// 할 일 삭제
function deleteRender(id) {
    // 필터로 걸러서 다시 새 배열에 담는다.
    // 즉, 선택된 id 말고 선택 안된 id들을 담는다.
    taskList = taskList.filter(task => task.id !== id);
    render();
};
