import {buildTaskItem} from "./components/liTaskItem.js";


const ulTaskList = document.querySelector("ul.task-list");


ulTaskList.appendChild(buildTaskItem());