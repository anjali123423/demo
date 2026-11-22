
const API_URL = "http://localhost:8080/api/users";

const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");

async function loadUsers() {
    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        userTable.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");

            [user.id, user.name, user.email, user.phone].forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            const actionCell = document.createElement("td");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editUser(user);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteUser(user.id);

            actionCell.append(editButton, deleteButton);
            row.appendChild(actionCell);

            userTable.appendChild(row);
        });

    } catch (error) {
        alert("Unable to load users!");
    }
}

// ADD USER
userForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("userId").value;

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value
    };

    try {
        const response = await fetch(
            id ? `${API_URL}/${id}` : API_URL,
            {
                method: id ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            throw new Error("Request failed");
        }

        alert(id ? "User Updated!" : "User Added!");

        userForm.reset();
        document.getElementById("userId").value = "";
        document.getElementById("submitBtn").textContent = "Add User";

        loadUsers();

    } catch (error) {
        alert("Something went wrong!");
    }
});

// EDIT USER
function editUser(user) {
    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;

    document.getElementById("submitBtn").textContent = "Update User";
}

// DELETE USER
async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Delete failed");
        }

        alert("User Deleted!");
        loadUsers();

    } catch (error) {
        alert("Unable to delete user!");
    }
}

// LOAD USERS WHEN PAGE OPENS
loadUsers();
