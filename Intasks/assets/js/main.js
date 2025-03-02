import {buildTaskItem} from "./components/liTaskItem.js";
import {formatDate} from "./utils.js";

let tasks = [];

const ulTaskList = document.querySelector("ul.task-list");
const btnAddTask = document.getElementById("btnAddTask");
const divOverlay = document.querySelector("div.overlay");

ulTaskList.addEventListener("click", ({target}) => {
    if (target.classList.contains("completed")) {
        console.log(tasks);
        if (target.checked) {
            target.closest("li").classList.add("task-completed");
            console.log(tasks);
            console.log(target.closest("li").dataset.id);
            const index = tasks.findIndex((task) => task.id == target.closest("li").dataset.id);
            tasks[index]["completed"] = true;
        } else {
            target.closest("li").classList.remove("task-completed");
            const index = tasks.findIndex((task) => task.id == target.closest("li").dataset.id);
            tasks[index]["completed"] = false;
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

const setInputError = (name, error) => {
    const input = document.querySelector(`input[name="${name}"]`);
    const inputWrapper = input.closest(".input-wrapper");

    let spnError = inputWrapper.querySelector("span.input-error");

    if (!spnError) spnError = document.createElement("span");

    spnError.classList.add("input-error");
    spnError.textContent = error;

    inputWrapper.appendChild(spnError);
}

const removeInputError = (name) => {
    const input = document.querySelector(`input[name="${name}"]`);
    const inputWrapper = input.closest(".input-wrapper");

    const spanError = inputWrapper.querySelector("span.input-error");

    spanError?.remove();
}

const validateForm = ({title, description, priority}) => {
    let valid = true;
    if (!title) {
        setInputError("title", "Bu alan boş bırakılamaz");
        valid &= false;
    } else {
        removeInputError("title");
    }

    if (!priority) {
        setInputError("priority", "Bu alan boş bırakılamaz");
        valid &= false;
    } else {
        removeInputError("priority");
    }

    return valid;
};

divOverlay.addEventListener("click", ({currentTarget, target}) => {
    if (currentTarget === target) divOverlay.classList.add("hidden");
    if (target.closest("button")?.id === "btnBack") divOverlay.classList.add("hidden");

    if (target?.id === "btnSave") {
        try {
            const frmModalContainerBody = document.querySelector("form.modal-container__body")

            const formData = new FormData(frmModalContainerBody);
            let formObject = Object.fromEntries(formData);

            formObject.completed = formObject?.completed === "on";

            formObject.createdAt = new Date();

            formObject.id = Math.random() * 1000;

            if (!validateForm(formObject)) return;

            tasks.push(formObject);

            ulTaskList.appendChild(buildTaskItem({
                id: formObject.id,
                title: formObject.title,
                priority: formObject.priority,
                description: formObject.description,
                completed: formObject.completed,
                createdAt: formatDate(formObject.createdAt),
            }));

            frmModalContainerBody.reset();

            divOverlay.classList.add("hidden");
        } catch (e) {
            alert("Bir sorun oluştu, tekrar deneyiniz");
        }
    }
});

document.getElementById("btnShowCompleted").addEventListener("click", function () {
    ulTaskList.textContent = "";

    this.dataset.checked = this.dataset.checked === "checked" ? "" : "checked";

    if (this.dataset.checked === "checked") {
        const completedTasks = tasks.filter((task) => task.completed);

        completedTasks.forEach((task) => {
            ulTaskList.appendChild(buildTaskItem({
                id: task.id,
                title: task.title,
                priority: task.priority,
                description: task.description,
                completed: task.completed,
                createdAt: formatDate(task.createdAt),
            }));
        });
    } else {
        tasks.forEach((task) => {
            ulTaskList.appendChild(buildTaskItem({
                id: task.id,
                title: task.title,
                priority: task.priority,
                description: task.description,
                completed: task.completed,
                createdAt: formatDate(task.createdAt),
            }));
        });
    }
});

document.getElementById("btnPriority").addEventListener("click", function () {
    ulTaskList.textContent = "";


    if (this.dataset.checked === "checked") {
        const priorityOrder = {low: 1, medium: 2, high: 3};

        const sortedTasks = tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);

        sortedTasks.forEach((task) => {
            ulTaskList.appendChild(buildTaskItem({
                id: task.id,
                title: task.title,
                priority: task.priority,
                description: task.description,
                completed: task.completed,
                createdAt: formatDate(task.createdAt),
            }));
        });
    } else {
        tasks.forEach((task) => {
            ulTaskList.appendChild(buildTaskItem({
                id: task.id,
                title: task.title,
                priority: task.priority,
                description: task.description,
                completed: task.completed,
                createdAt: formatDate(task.createdAt),
            }));
        });
    }

    this.dataset.checked = this.dataset.checked === "checked" ? "" : "checked";

});
