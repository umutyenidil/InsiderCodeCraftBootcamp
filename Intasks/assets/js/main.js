import {buildTaskItem} from "./components/liTaskItem.js";
import {formatDate} from "./utils.js";

const ulTaskList = document.querySelector("ul.task-list");
const btnAddTask = document.getElementById("btnAddTask");
const divOverlay = document.querySelector("div.overlay");

for (let i = 0; i < 20; i++) {
    ulTaskList.appendChild(buildTaskItem({
        id: i,
        title: `Task ${i + 1}`,
        priority: "high",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        createdAt: formatDate(new Date()),
    }));
}

ulTaskList.addEventListener("click", ({target}) => {
    if (target.classList.contains("completed")) {
        if (target.checked) {
            target.closest("li").classList.add("task-completed");
        } else {
            target.closest("li").classList.remove("task-completed");
        }
    }

    if (target.classList.contains("actions__delete")) {
        ulTaskList.removeChild(target.closest("li"));
    }
});

btnAddTask.addEventListener("click", () => {
    if (divOverlay.classList.contains("hidden")) divOverlay.classList.remove("hidden");
    else divOverlay.classList.add("hidden");
});

divOverlay.addEventListener("click", ({currentTarget, target}) => {
    if(currentTarget === target) divOverlay.classList.add("hidden");
    if(target.closest("button")?.id === "btnBack") divOverlay.classList.add("hidden");
});