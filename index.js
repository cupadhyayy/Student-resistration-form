document.addEventListener('DOMContentLoaded', function () {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    //--------Load stored data---------//
    loadStudents();

    studentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const studentName = document.getElementById('studentName').value.trim();
        const studentID = document.getElementById('studentID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contactNo = document.getElementById('contactNo').value.trim();

        if (validateInputs(studentName, studentID, email, contactNo)) {
            const student = { studentName, studentID, email, contactNo };
            addStudent(student);
            studentForm.reset();
        } else {
            alert('Please provide valid inputs.');
        }
    });

    //--------Validate input fields--------//
    function validateInputs(name, id, email, contact) {
        const namePattern = /^[a-zA-Z\s]+$/;
        const idPattern = /^\d+$/;
        const contactPattern = /^\d{10}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return namePattern.test(name) &&
               idPattern.test(id) &&
               emailPattern.test(email) &&
               contactPattern.test(contact);
    }

    //--------Add a student to the table--------//
    function addStudent(student) {
        const row = studentTable.insertRow();
        row.insertCell(0).textContent = student.studentName;
        row.insertCell(1).textContent = student.studentID;
        row.insertCell(2).textContent = student.email;
        row.insertCell(3).textContent = student.contactNo;

        const actionsCell = row.insertCell(4);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.onclick = () => editStudent(row, student);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => deleteStudent(row);
        actionsCell.appendChild(deleteButton);

        saveStudents();
    }

    //--------Edit student details--------//
    function editStudent(row, student) {
        document.getElementById('studentName').value = student.studentName;
        document.getElementById('studentID').value = student.studentID;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNo').value = student.contactNo;

        studentTable.deleteRow(row.rowIndex);
        saveStudents();
    }

    //--------Delete student record--------//
    function deleteStudent(row) {
        if (confirm('Are you sure you want to delete this record?')) {
            row.remove();
            saveStudents();
        }
    }

    //--------Save student data to local storage--------//
    function saveStudents() {
        const students = [];
        for (let i = 0; i < studentTable.rows.length; i++) {
            const row = studentTable.rows[i];
            students.push({
                studentName: row.cells[0].textContent,
                studentID: row.cells[1].textContent,
                email: row.cells[2].textContent,
                contactNo: row.cells[3].textContent
            });
        }
        localStorage.setItem('students', JSON.stringify(students));
    }

    //--------Load student data from local storage---------//
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => addStudent(student));
    }
});



