export const buildTaskItem = ({id, title, priority, description, createdAt, completed}) => {
    const liTaskItem = document.createElement("li");
    liTaskItem.dataset.id = id.toString();
    liTaskItem.classList.add("task-item");
    if (completed) liTaskItem.classList.add("task-completed");

    const divTaskItemHeader = document.createElement("div");
    divTaskItemHeader.classList.add("task-item__header");

    const divLeading = document.createElement("div");
    divLeading.classList.add("leading");

    const input = document.createElement("input");
    input.classList.add("completed");
    input.type = "checkbox";
    input.checked = completed;
    divLeading.appendChild(input);

    divTaskItemHeader.appendChild(divLeading);

    const divHeading = document.createElement("div");
    divHeading.classList.add("heading");

    const divHeadingTop = document.createElement("div");
    divHeadingTop.classList.add("heading-top");

    const h5 = document.createElement("h5");
    h5.textContent = title;
    divHeadingTop.appendChild(h5);

    const chipSpan = document.createElement("span");
    chipSpan.classList.add("chip");
    chipSpan.classList.add(priority);
    chipSpan.textContent = priority;
    divHeadingTop.appendChild(chipSpan);

    divHeading.appendChild(divHeadingTop);

    const spnCreatedDate = document.createElement("span");
    spnCreatedDate.classList.add("createdDate");
    spnCreatedDate.textContent = createdAt;
    divHeading.appendChild(spnCreatedDate);

    divTaskItemHeader.appendChild(divHeading);

    const divActions = document.createElement("div");
    divActions.classList.add("actions");

    const btnActionsDelete = document.createElement("button");
    btnActionsDelete.classList.add("actions__delete");

    const iActionsDelete = document.createElement("i");
    iActionsDelete.classList.add("bx");
    iActionsDelete.classList.add("bx-trash");
    btnActionsDelete.appendChild(iActionsDelete);

    divActions.appendChild(btnActionsDelete);

    divTaskItemHeader.appendChild(divActions);

    liTaskItem.appendChild(divTaskItemHeader);

    const divTaskItemBody = document.createElement("div");
    divTaskItemBody.classList.add("task-item__body");

    const pDescription = document.createElement("p");
    pDescription.textContent = description;

    divTaskItemBody.appendChild(pDescription);

    liTaskItem.appendChild(divTaskItemBody);

    return liTaskItem;
};
