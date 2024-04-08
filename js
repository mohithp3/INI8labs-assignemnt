// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const userList = document.getElementById('userList');

  // Function to fetch users from backend and render them
  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      const users = await response.json();
      userList.innerHTML = ''; // Clear previous list
      users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.innerHTML = `<strong>${user.name}</strong> - ${user.email} - ${user.dob}`;
        userList.appendChild(userItem);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch users on page load
  fetchUsers();

  // Form submission event
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      dob: formData.get('dob')
    };

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      if (response.ok) {
        form.reset(); // Clear form fields on successful submission
        fetchUsers(); // Refresh user list
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error(error);
    }
  });
});
