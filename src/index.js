(async function () {
  const data = await fetch("./src/data.json");
  const res = await data.json();
  let employees = res;
  let seletedEmployeeId = employees[0].id;
  let selectedEmployee = employees[0];

  const employeeList = document.querySelector(".employees_names--list");
  const employeeInfo = document.querySelector(".employees__single--info");

  //   Add employee logic later
  const createEmployee = document.querySelector(".createEmployee");
  const addEmployeeModal = document.querySelector(".addEmployee");
  const addEmployeeForm = document.querySelector(".addEmployee_create");

  createEmployee.addEventListener("click", () => {
    addEmployeeModal.style.display = "flex";
  });

  addEmployeeModal.addEventListener("click", (e) => {
    e.target.className === "addEmployee"
      ? (addEmployeeModal.style.display = "none")
      : "";
  });
  //   check for age
  const dobInput = document.querySelector(".addEmployee_create--dob");
  dobInput.max = `${new Date().getFullYear() - 18}-${new Date()
    .toISOString()
    .slice(5, 10)}`;

  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(addEmployeeForm);
    const values = [...formData.entries()];
    let empData = {};
    values.forEach((value) => {
      empData[value[0]] = value[1];
    });
    empData.id = employees[employees.length - 1].id + 1;
    empData.age =
      new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10);
    empData.imageUrl =
      empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
    employees.push(empData);
    renderEmployees();
    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });
  //   select employee logic
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && seletedEmployeeId !== e.target.id) {
      seletedEmployeeId = e.target.id;
      selectedEmployee = e.target;
      renderEmployees();
      renderSingleEmployee();
    }

    if (e.target.tagName === "I") {
      employees = employees.filter(
        (emp) => String(emp.id) !== e.target.parentNode.id
      );
      if (String(seletedEmployeeId) === e.target.parentNode.id) {
        seletedEmployeeId = employees[0] ? employees[0].id : -1;
        selectedEmployee = employees[0] || {};
        renderSingleEmployee();
      }
      renderEmployees();
    }
  });

  const renderEmployees = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      employee.classList.add("employees__names--item");
      if (parseInt(seletedEmployeeId, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">X</i>`;
      employeeList.append(employee);
    });
  };

  const renderSingleEmployee = () => {
    if (seletedEmployeeId === -1) {
      employeeInfo.innerHTML = "";
      return;
    }
    employeeInfo.innerHTML = `
    <img src="${selectedEmployee.imageUrl}" alt="" />
    <span class="employees__single--heading">${selectedEmployee.firstName} ${selectedEmployee.lastName} ${selectedEmployee.age}</span>
    <span>${selectedEmployee.address}</span>
    <span>${selectedEmployee.email}</span>
    <span>${selectedEmployee.contactNumber}</span>
    <span>${selectedEmployee.dob}</span>
    `;
  };
  if (selectedEmployee) {
    renderSingleEmployee();
  }
  renderEmployees();
})();
