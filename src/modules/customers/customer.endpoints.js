import { roles } from "../../Servicess/roles.js";
export const endPoints = {
  addCustomer: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteCustomer: [roles.Admin, roles.Employee, roles.headOfDepartment],
  updateCustomer: [roles.Admin, roles.headOfDepartment],
  allCustomer: [roles.Admin, roles.headOfDepartment, roles.Employee],
  findbyidCustomer: [roles.Admin, roles.headOfDepartment, roles.Employee],
  addcar: [roles.Admin, roles.headOfDepartment, roles.Employee],
  removeCar: [roles.Admin, roles.headOfDepartment, roles.Employee],
  getCustomerVehicles: [roles.Admin, roles.headOfDepartment, roles.Employee],
  getCustomerInsurances: [roles.Admin, roles.headOfDepartment, roles.Employee],
  addCustomerInsurance: [roles.Admin, roles.Employee, roles.headOfDepartment],
  updateCar: [roles.Admin, roles.headOfDepartment],
  showVehicles: [roles.Admin, roles.headOfDepartment, roles.Employee],
};
