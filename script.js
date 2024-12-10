var i = 1; // To track the next task ID

// Storing data in Local Storage

let btn = document.getElementsByTagName("button")[0];

btn.addEventListener("click", () => {
    if(i>7){
        alert("Already 5 tasks are there try to complete them first !!!")
        return;
    }
    let textarea = document.getElementById("one");
    let task = textarea.value;
    textarea.value = null;
    if (task) {
        localStorage.setItem(i, JSON.stringify(task)); // Store task with index as key
        i++; // Increment the index for the next task
        fetchTask(); // Reload tasks after storing
    }
})


// Fetching materials present in Local Storage
let fetchTask = () => {
    let position = document.getElementsByClassName("allother")[0];
    position.innerHTML = ""; // Clear the display area before fetching new tasks

    if (localStorage.length) {
        // Loop over all stored keys
        for (let j = 1; j <= localStorage.length; j++) {
            let key = localStorage.key(j - 1); // Get the actual key (since localStorage keys are zero-indexed)
            let task = JSON.parse(localStorage.getItem(key)); // Get task associated with the key

            let element = document.createElement("div");
            element.innerHTML = `&#8594 ${task}</p>
            <img src="close.png" alt="Description of image" height="6px" width="6px" />`;

            position.append(element);

            element.style.backgroundColor = "white";
            element.style.margin = "5px"
            element.style.display = "flex"
            element.style.justifyContent = "space-between"
            element.style.alignItems = "center"

            var p = element.querySelector("p");
            p.style.padding = "5px 12px"
            p.style.fontFamily = "Roboto"
            p.style.fontSize = "12px"

            var img = element.querySelector("img");
            img.style.verticalAlign = "center";
            img.style.marginRight = "10px";
            img.style.border = "0.5px solid black";
            img.style.padding = "3px"
            img.style.borderRadius = "2px";

            // Add event listener for the delete button
            img.addEventListener("click", () => {
                deleteTask(key); // Pass the key to delete the correct task
            });
        }
    }
}

// Deleting tasks
let deleteTask = (key) => {
    if (key) {
        localStorage.removeItem(key); // Remove task by its key
        fetchTask(); // Reload tasks after deletion
        i--;
    } else {
        localStorage.clear(); // Clear all tasks if no key is provided
        fetchTask(); // Reload tasks after clearing
        i = 0;
    }
}

