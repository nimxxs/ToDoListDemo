// 1. 유저가 값을 입력한다.
// 2. + 버튼을 누르면 할 일이 추가된다.
// 3. Delete 버튼을 누르면 할 일이 삭제된다.
// 4. Check 버튼을 누르면 할 일에 밑줄이 생긴다.
// 5. 탭을 누르면 언더바가 이동한다.
// 6. 각 탭을 누르면 탭마다 아이템을 보여준다.

let inputArea = document.getElementById("input-area");
let buttonArea = document.getElementById("button-area");
let deleteButton = document.getElementById("deleteButton");
let taskList = [];

buttonArea.addEventListener("click", () => {
    console.log("add")
    addTask()
    render()
})
deleteButton.addEventListener("click", () => {
    deleteRender()
})

// 할 일 추가
function addTask() {
    let taskContent = inputArea.value;
    taskList.push(taskContent);
    console.log("taskList", taskList)
}

// 할 일 render
function render() {
    let resultHTML = '';

    for(let i=0; i<taskList.length; i++) {
        resultHTML += `
            <div class="list">
                <button>체크</button>
                <div>${inputArea.value}</div>
                <button>수정</button>
                <button id="deleteButton">휴지통</button>
            </div>
            `;
    }

    document.getElementById("todo-list").innerHTML = resultHTML;
}

// 할 일 삭제
function deleteRender() {

}