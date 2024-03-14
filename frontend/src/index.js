const root = document.getElementById('root');

const backendUrl = 'http://localhost:8080';

const fetchStudents = async () => {
  const response = await fetch(`${backendUrl}/students`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const getStudent = async (id) => {
  const response = await fetch(`${backendUrl}/student/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const saveStudent = async (student) => {
  const response = await fetch(`${backendUrl}/student`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });
  return await handleResponse(response);
};

const updateStudent = async (student, id) => {
  const response = await fetch(`${backendUrl}/student/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(student)
  });
  return await handleResponse(response);
};

const deleteStudent = async (id) => {
  const response = await fetch(`${backendUrl}/student/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const handleError = (error) => {
  const alert = document.getElementById('alert');
  alert.innerHTML = '';
  console.error(error);
  const errorDiv = document.createElement('div');
  errorDiv.classList.add('alert', 'alert-danger');
  errorDiv.innerHTML = `
    ${error.message}
    `;
  alert.appendChild(errorDiv);
}

const handleSuccess = (message) => {
  const alert = document.getElementById('alert');
  alert.innerHTML = '';
  const alertDiv = document.createElement('div');
  alertDiv.classList.add('alert', 'alert-success');
  alertDiv.innerHTML = `
    ${message}
    `;
  alert.appendChild(alertDiv);
};


document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('alert').innerHTML = '';
  showStudents();
});

const showStudents = async () => {
  try {
    const students = await fetchStudents();
    updateStudentsTable(students);
  } catch (error) {
    handleError(error);
  }
};

const updateStudentsTable = (data) => {
  root.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('container');
  root.appendChild(container);
  const title = document.createElement('h2');
  title.textContent = 'Liste des étudiants';
  container.appendChild(title);

  const addButton = document.createElement('button');
  addButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mb-2');
  addButton.textContent = 'Ajouter un étudiant';
  addButton.addEventListener('click', () => {
    createStudent();
  });
  container.appendChild(addButton);

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);

  const headers = ['Nom', 'Prénom', 'Date de naissance', 'CNE', 'Email', 'Actions'];
  const rowHeader = document.createElement('tr');
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    rowHeader.appendChild(header);
  });
  thead.appendChild(rowHeader);

  data.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.lastname}</td>
      <td>${student.firstname}</td>
      <td>${student.birthday}</td>
      <td>${student.cne}</td>
      <td>${student.email}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editStudent(${student.id})">Modifier</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteStudent(${student.id})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  container.appendChild(table);
}

const createStudentForm = (student) => {
  document.getElementById('alert').innerHTML = '';
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.width = '460px';
  container.style.margin = 'auto';
  root.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = student ? 'Modifier Etudiant' : 'Ajouter Etudiant';
  container.appendChild(title);
  const form = document.createElement('form');
  form.classList.add('row', 'g-3', 'needs-validation');
  form.id = 'student-form';
  form.noValidate = true;
  form.setAttribute('aria-live', 'polite');
  form.appendChild(createInputField('Prénom', 'firstname', 'text', 'firstname', true, 6));
  form.appendChild(createInputField('Nom', 'lastname', 'text', 'lastname', true, 6));
  form.appendChild(createInputField('Date de naissance', 'birthday', 'date', 'birthday', true, 6));
  form.appendChild(createInputField('CNE', 'cne', 'text', 'cne', true, 6));
  form.appendChild(createInputField('Email', 'email', 'email', 'email', true, 12));
  if (student) {
    form.firstname.value = student.firstname;
    form.lastname.value = student.lastname;
    form.birthday.value = student.birthday;
    form.cne.value = student.cne;
    form.email.value = student.email;
  }
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('col-12', 'd-flex', 'justify-content-end');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  submitButton.type = 'submit';
  if (student) {
    submitButton.classList.add('btn', 'btn-warning');
    submitButton.textContent = 'Modifier';
  } else {
    submitButton.classList.add('btn', 'btn-primary');
    submitButton.textContent = 'Ajouter';
  }
  cancelButton.classList.add('btn', 'btn-secondary', 'mx-2');
  cancelButton.textContent = 'Annuler';
  buttonsDiv.appendChild(submitButton);
  buttonsDiv.appendChild(cancelButton);
  form.appendChild(buttonsDiv);
  submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }
    const newStudent = {
      firstname: form.firstname.value,
      lastname: form.lastname.value,
      birthday: form.birthday.value,
      cne: form.cne.value,
      email: form.email.value
    };
    if (student) {
      await updateStudent(newStudent, student.id);
      showStudents();
      handleSuccess('Etudiant modifié avec succès');
    } else {
      await saveStudent(newStudent);
      showStudents();
      handleSuccess('Etudiant ajouté avec succès');
    }
  });
  cancelButton.addEventListener('click', () => {
    showStudents();
  });
  container.appendChild(form);
  root.appendChild(container);
};

const createInputField = (label, id, type, name, required, col) => {
  const div = document.createElement('div');
  div.classList.add('col-md-' + col);
  const labelElement = document.createElement('label');
  labelElement.htmlFor = id;
  labelElement.textContent = label;
  const input = document.createElement('input');
  input.type = type;
  input.classList.add('form-control');
  input.id = id;
  input.name = name;
  input.placeholder = label;
  if (required) {
    input.required = true;
  }
  div.appendChild(labelElement);
  div.appendChild(input);
  return div;
}

const createStudent = () => {
  createStudentForm();
};

const editStudent = async (id) => {
  await getStudent(id).then(student => {
    createStudentForm(student);
  });
};

const confirmDeleteStudent = async (id) => {
  const result = confirm('Voulez-vous vraiment supprimer cet étudiant?');
  if (result) {
    await deleteStudent(id).then(() => {
      showStudents();
      handleSuccess('Etudiant supprimé avec succès');
    });
  }
};
