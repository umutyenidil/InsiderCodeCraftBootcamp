export const buildTaskItem = () => {
    const liTaskItem = document.createElement("li");
    liTaskItem.classList.add("task-item");

    const divTaskItemHeader = document.createElement("div");
    divTaskItemHeader.classList.add("task-item__header");

    const divLeading = document.createElement("div");
    divLeading.classList.add("leading");

    const input = document.createElement("input");
    input.type = "checkbox";
    divLeading.appendChild(input);

    divTaskItemHeader.appendChild(divLeading);

    const divHeading = document.createElement("div");
    divHeading.classList.add("heading");

    const divHeadingTop = document.createElement("div");
    divHeadingTop.classList.add("heading-top");

    const h5 = document.createElement("h5");
    h5.textContent = "Insider Code";
    divHeadingTop.appendChild(h5);

    const chipSpan = document.createElement("span");
    chipSpan.classList.add("chip");
    chipSpan.classList.add("medium");
    chipSpan.textContent = "Medium";
    divHeadingTop.appendChild(chipSpan);

    divHeading.appendChild(divHeadingTop);

    const spnCreatedDate = document.createElement("span");
    spnCreatedDate.classList.add("createdDate");
    spnCreatedDate.textContent = "02.03.2024 14:20";
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
    pDescription.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    divTaskItemBody.appendChild(pDescription);

    liTaskItem.appendChild(divTaskItemBody);

    return liTaskItem;
};
