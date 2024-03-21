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
        <button class="btn btn-sm btn-info" onclick="showDetails(${student.id})">Afficher</button>
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

const showDetails = async (id) => {
  try {
    const student = await getStudent(id);
    root.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('container');
    root.appendChild(container);
    const title = document.createElement('h2');
    title.textContent = 'Détails de l\'étudiant';
    container.appendChild(title);
    const list = document.createElement('ul');
    list.classList.add('list-group');
    container.appendChild(list);
    const items = [
      { label: 'Nom', value: student.lastname },
      { label: 'Prénom', value: student.firstname },
      { label: 'Date de naissance', value: student.birthday },
      { label: 'CNE', value: student.cne },
      { label: 'Email', value: student.email }
    ];
    items.forEach(item => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerHTML = `
        <strong>${item.label}:</strong> ${item.value}
      `;
      list.appendChild(listItem);
    });
    const gradesTitle = document.createElement('h3');
    gradesTitle.classList.add('mt-3');
    gradesTitle.textContent = 'Notes';
    container.appendChild(gradesTitle);
    const addGradeBtn = document.createElement('button');
    addGradeBtn.classList.add('btn', 'btn-sm', 'btn-primary', 'mb-2');
    addGradeBtn.textContent = 'Ajouter une note';
    addGradeBtn.addEventListener('click', () => {
      addGrade(student);
    });
    container.appendChild(addGradeBtn);
    const gradesTable = document.createElement('table');
    gradesTable.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    gradesTable.appendChild(thead);
    gradesTable.appendChild(tbody);
    const headers = ['Cours', 'Note', 'Actions'];
    const rowHeader = document.createElement('tr');
    headers.forEach(headerText => {
      const header = document.createElement('th');
      header.textContent = headerText;
      rowHeader.appendChild(header);
    });
    thead.appendChild(rowHeader);
    student.grades.forEach(grade => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${grade.course.name}</td>
        <td>${grade.grade}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editGrade(${grade.id})">Modifier</button>
          <button class="btn btn-sm btn-danger" onclick="confirmDeleteGrade(${grade.id})">Supprimer</button>
        </td>
      `;
      tbody.appendChild(row);
    });
    container.appendChild(gradesTable);
  } catch (error) {
    handleError(error);
  }
};

/***********************************************************************************************************
 ***********************************************************************************************************
 ***********************************************************************************************************/

const fetchCourses = async () => {
  const response = await fetch(`${backendUrl}/courses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const getCourse = async (id) => {
  const response = await fetch(`${backendUrl}/course/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const saveCourse = async (course) => {
  const response = await fetch(`${backendUrl}/course`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });
  return await handleResponse(response);
};

const updateCourse = async (course, id) => {
  const response = await fetch(`${backendUrl}/course/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(course)
  });
  return await handleResponse(response);
};

const deleteCourse = async (id) => {
  const response = await fetch(`${backendUrl}/course/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await handleResponse(response);
};

const updateCoursesTable = (data) => {
  root.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('container');
  root.appendChild(container);
  const title = document.createElement('h2');
  title.textContent = 'Liste des cours';
  container.appendChild(title);

  const addButton = document.createElement('button');
  addButton.classList.add('btn', 'btn-sm', 'btn-primary', 'mb-2');
  addButton.textContent = 'Ajouter un cours';
  addButton.addEventListener('click', () => {
    createCourse();
  });
  container.appendChild(addButton);

  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  table.appendChild(thead);
  table.appendChild(tbody);

  const headers = ['Id', 'Nom', 'Actions'];
  const rowHeader = document.createElement('tr');
  headers.forEach(headerText => {
    const header = document.createElement('th');
    header.textContent = headerText;
    rowHeader.appendChild(header);
  });
  thead.appendChild(rowHeader);

  data.forEach(course => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${course.id}</td>
      <td>${course.name}</td>
      <td>
        <button class="btn btn-sm btn-warning" onclick="editCourse(${course.id})">Modifier</button>
        <button class="btn btn-sm btn-danger" onclick="confirmDeleteCourse(${course.id})">Supprimer</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  container.appendChild(table);
}

const showCourses = async () => {
  try {
    const courses = await fetchCourses();
    updateCoursesTable(courses);
  } catch (error) {
    handleError(error);
  }
};

const createCourseForm = (course) => {
  document.getElementById('alert').innerHTML = '';
  const container = document.createElement('div');
  container.classList.add('container');
  container.style.width = '460px';
  container.style.margin = 'auto';
  root.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = course ? 'Modifier Cours' : 'Ajouter Cours';
  container.appendChild(title);
  const form = document.createElement('form');
  form.classList.add('row', 'g-3', 'needs-validation');
  form.id = 'course-form';
  form.noValidate = true;
  form.setAttribute('aria-live', 'polite');
  form.appendChild(createInputField('Nom', 'name', 'text', 'name', true, 12));
  if (course) {
    form.name.value = course.name;
  }
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('col-12', 'd-flex', 'justify-content-end');
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');

  submitButton.type = 'submit';
  if (course) {
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
    const newCourse = {
      name: form.name.value
    };
    if (course) {
      await updateCourse(newCourse, course.id);
      showCourses();
      handleSuccess('Cours modifié avec succès');
    } else {
      await saveCourse(newCourse);
      showCourses();
      handleSuccess('Cours ajouté avec succès');
    }
  });
  cancelButton.addEventListener('click', () => {
    showCourses();
  });
  container.appendChild(form);
  root.appendChild(container);
};

const createCourse = () => {
  createCourseForm();
};

const editCourse = async (id) => {
  await getCourse(id).then(course => {
    createCourseForm(course);
  });
};

const confirmDeleteCourse = async (id) => {
  const result = confirm('Voulez-vous vraiment supprimer ce cours?');
  if (result) {
    await deleteCourse(id).then(() => {
      showCourses();
      handleSuccess('Cours supprimé avec succès');
    });
  }
};


/***********************************************************************************************************
 ***********************************************************************************************************
 ***********************************************************************************************************/

document.addEventListener('DOMContentLoaded', async () => {
  document.getElementById('alert').innerHTML = '';
  document.addEventListener('click', (event) => {
    document.getElementById('alert').innerHTML = '';
    switch (event.target.id) {
      case 'students-link':
        showStudents();
        break;
      case 'courses-link':
        showCourses();
        break;
    }
  });
  showStudents();
});