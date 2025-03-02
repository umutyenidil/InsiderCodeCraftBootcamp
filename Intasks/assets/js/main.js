import {buildTaskItem} from "./components/liTaskItem.js";
import {formatDate} from "./utils.js";

const ulTaskList = document.querySelector("ul.task-list");
const btnAddTask = document.getElementById("btnAddTask");
const divOverlay = document.querySelector("div.overlay");

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
            const formObject = Object.fromEntries(formData);

            formObject.completed = formObject?.completed === "on";

            formObject.createdAt = new Date();

            formObject.id = Math.random() * 1000;

            if (!validateForm(formObject)) return;

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
