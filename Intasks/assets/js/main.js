import {buildTaskItem} from "./components/liTaskItem.js";
import {formatDate} from "./utils.js";

const ulTaskList = document.querySelector("ul.task-list");

for (let i = 0; i < 20; i++) {
    ulTaskList.appendChild(buildTaskItem({
        id: i,
        title: `Task ${i + 1}`,
        priority: "high",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        createdAt: formatDate(new Date()),
    }));
}