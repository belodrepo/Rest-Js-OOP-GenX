const apiUrl = 'http://localhost:3000/api/generations';
const usersData = document.getElementById('usersData');

async function getUsers() {

    try {
        const response = await fetch(apiUrl);
        const users = await response.json();

        usersData.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.birthdate}</td>
            <td>${user.age}</td>
            <td>${user.gen}</td>
            <td>
            <button class="btn btn-danger" title="A(z) ${user.name} nevű felhasználó törlése."onClick="deleteUser(${user.id})"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
        `).join('');
    }
    catch (e) {
        console.error(e.message);
        alert('Hiba történt az adatok elérése során!')
    }
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    if (!data.name || !data.birthdate) {
        alert('Hiányzó adatok!');
    } else {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();

    if (response.ok) {
        alert(result.message);
        getUsers();
    } else {
        alert(result.message);
    }
    e.target.reset();
}
}
catch(e) {
    alert(e.message);
}
})

async function deleteUser(id) {
    if (confirm('Valóban törölni akarod a felhasználót?')) {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('A felhasználó törlése megtörtént.');
            getUsers();
        } else {
            alert('A felhasználó adatainak a törlése sikertelen volt!');
        }
    }
}


getUsers();