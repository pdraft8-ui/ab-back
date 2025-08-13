import { roles } from "../../Servicess/roles.js";

export const endPoints = {
  addVehicle: [roles.Admin, roles.Employee, roles.headOfDepartment],
  deleteVehicle: [roles.Admin, roles.Employee, roles.headOfDepartment],
  updateVehicle: [roles.Admin, roles.headOfDepartment],
  allVehicles: [roles.Admin, roles.headOfDepartment, roles.Employee],
  findVehicleById: [roles.Admin, roles.headOfDepartment, roles.Employee],
  findByPlate: [roles.Admin, roles.headOfDepartment, roles.Employee],
  getVehiclesByCustomer: [roles.Admin, roles.headOfDepartment, roles.Employee],
  addInsuranceToVehicle: [roles.Admin, roles.headOfDepartment, roles.Employee],
  removeInsuranceFromVehicle: [
    roles.Admin,
    roles.Employee,
    roles.headOfDepartment,
  ],
  getInsurancesForVehicle: [
    roles.Admin,
    roles.headOfDepartment,
    roles.Employee,
  ],
  addCheckToInsurance: [roles.Admin, roles.headOfDepartment, roles.Employee],
  getInsuranceChecks: [roles.Admin, roles.headOfDepartment, roles.Employee],
  getAllChecksForVehicle: [roles.Admin, roles.headOfDepartment, roles.Employee],
  deleteCheckFromInsurance: [
    roles.Admin,
    roles.headOfDepartment,
    roles.Employee,
  ],
};
