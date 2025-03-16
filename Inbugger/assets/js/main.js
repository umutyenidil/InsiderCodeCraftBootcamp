const appendLocation = ".test-container";

const cacheData = (url, data, expiryInMinutes = 1440) => {
    try {
        const expiryTimestamp = Date.now() + expiryInMinutes * 60 * 1000;

        const cacheObject = {
            data,
            expiry: expiryTimestamp
        };

        localStorage.setItem(url, JSON.stringify(cacheObject));
        return data;
    } catch (e) {
        return data;
    }
}

const cachedData = (url) => {
    try {
        const cacheString = localStorage.getItem(url);

        if (!cacheString) return null;

        const {data, expiry} = JSON.parse(cacheString);

        if (Date.now() > expiry) {
            localStorage.removeItem(url);
            return null;
        }

        return {data, expiry};
    } catch (e) {
        return null;
    }
}

const fetcher = ({url, onData, onCacheData, onError, onPending, initialFetch = true}) => {
    let isFetching = false;

    const refetch = () => {
        if (isFetching) return;
        isFetching = true;
        onPending(true);

        setTimeout(() => {
            const cachedUsers = cachedData(url);

            if (cachedUsers) {
                onCacheData(cachedUsers);
                onPending(false);
                isFetching = false;
            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        cacheData(url, data);
                        return data;
                    })
                    .then(users => onData(users))
                    .catch(error => onError(error))
                    .finally(() => {
                        onPending(false);
                        isFetching = false;
                    });
            }
        }, 2000);
    };

    if (initialFetch) refetch();

    return {refetch};
};

const getAppendLocation = (selector) => {
    const appendLocation = document.querySelector(selector);

    appendLocation.style.position = "relative";

    return appendLocation;
}

const buildDataContainer = (parentElement) => {
    const container = document.createElement("div");

    container.style.position = "absolute";
    container.style.zIndex = "2147483647"
    container.style.width = 128 * 4 + "px";
    container.style.height = 128 * 2 + "px";
    container.style.left = "50%";
    container.style.top = `calc(100% + ${parentElement.offsetHeight * 1.5}px)`;
    container.style.transform = "translate(-50%, -50%)";

    container.style.padding = "5px";

    container.style.overflowY = "scroll";

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.rowGap = "4px";

    container.style.backgroundColor = "#ffffff";
    container.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.5)";
    return container;
};

const buildDataList = () => {
    const el = document.createElement("ul");

    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.rowGap = "4px";

    return el;
};

const buildDataListItem = (data) => {
    const el = document.createElement("li");
    el.style.display = "flex";
    el.style.justifyContent = "space-between";
    el.style.backgroundColor = "blue";

    const dataItemElLeading = document.createElement("span");
    dataItemElLeading.style.display = "block";
    dataItemElLeading.style.padding = "8px";
    dataItemElLeading.textContent = data.name;
    el.appendChild(dataItemElLeading);

    const dataItemElRemoveButton = document.createElement("button");
    dataItemElRemoveButton.style.height = "100%";
    dataItemElRemoveButton.style.aspectRatio = "1/1";
    dataItemElRemoveButton.style.textAlign = "center";
    dataItemElRemoveButton.textContent = "x";
    dataItemElRemoveButton.onclick = () => {
        let {data: users, expiry} = cachedData("https://jsonplaceholder.typicode.com/users");
        users = users.filter(i => i.id !== data.id);
        cacheData("https://jsonplaceholder.typicode.com/users", users, expiry / 6000);

        el.remove();
    }
    el.appendChild(dataItemElRemoveButton);

    return el;
};

const buildRefetchButton = (onClick) => {
    const el = document.createElement("button");
    el.style.width = "100%";
    el.style.padding = "8px";
    el.style.backgroundColor = "blue";
    el.textContent = "refetch"
    el.onclick = onClick;

    return el;
};

const appendUsers = ({selector}) => {
    const appendLocation = getAppendLocation(selector)

    let dataContainer = buildDataContainer(appendLocation);
    appendLocation.appendChild(dataContainer);

    const handleData = ({data: users}) => {
        dataContainer.innerText = "";

        const dataListEl = buildDataList();

        for (const user of users) {
            const dataItemEl = buildDataListItem(user);

            dataListEl.appendChild(dataItemEl);
        }

        dataContainer.appendChild(dataListEl);
    };

    const dataFetcher = fetcher({
        url: "https://jsonplaceholder.typicode.com/users",
        onPending: (pending) => {
            if (pending) {
                dataContainer.innerText = "loading...";
            }
        },
        onData: handleData,
        onCacheData: handleData,
        onError: (error) => {
            console.error(error);
        }
    });

    const dataContainerObserver = new MutationObserver(() => {
        if (dataContainer.querySelector("ul") && dataContainer.querySelector("ul").children.length === 0) {
            dataContainer.innerHTML = "";

            const refetchButton = buildRefetchButton(() => {
                if (sessionStorage.getItem("refetched") === "1") {
                    alert("you are not able to fetch the data again");
                    return;
                } else {
                    sessionStorage.setItem("refetched", "1");
                }
                dataFetcher?.refetch();
            });

            dataContainer.appendChild(refetchButton);
        }
    });
    dataContainerObserver.observe(dataContainer, {childList: true, subtree: true});
};

appendUsers({selector: appendLocation});