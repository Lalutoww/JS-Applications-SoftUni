function attachEvents() {
   getAllStudents();

   const form = document.getElementById('form');
   form.addEventListener('submit', submitHandler);
}
attachEvents();

async function request(url, options) {
   const response = await fetch(url, options);

   if (response.ok != true) {
      const error = await response.json();
      alert(error.message);
      throw new Error(error.message);
   }

   const data = await response.json();
   return data;
}

async function getAllStudents() {
   const students = await request(
      'http://localhost:3030/jsonstore/collections/students'
   );

   const rows = Object.values(students).map(createRow).join('');

   document.querySelector('tbody').innerHTML = rows;
}

function createRow(student) {
   return `<tr>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${student.grade.toFixed(2)}</td>
        </tr>`;
}

async function submitHandler(e) {
   e.preventDefault();

   const formData = new FormData(e.target);
   const firstName = formData.get('firstName');
   const lastName = formData.get('lastName');
   const facultyNumber = Number(formData.get('facultyNumber'));
   const grade = Number(formData.get('grade'));

   const URL = `http://localhost:3030/jsonstore/collections/students`;

   if (firstName && lastName && facultyNumber && Number(grade)) {
      const student = {
         firstName,
         lastName,
         facultyNumber,
         grade,
      };

      await request(URL, {
         method: 'post',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(student),
      });
      getAllStudents();
   }
}
