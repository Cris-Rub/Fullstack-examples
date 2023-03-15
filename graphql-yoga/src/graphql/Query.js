import Employee from '../models/Employee.js';
import User from '../models/User.js';

const Query = {
    async getEmployees() {
        const employees = await Employee.find();
        return employees;
    },
    async findByName(_, { name }){
        const employee = await Employee.find({name});
        if(!employee.length){
            // throw new Error('Employee not found');
            return [];
        }
        // console.log(employee);
        return employee;
    },
    // FIND BY USERNAME AND PASSWORD
    // async login(_, { email,})
    async login(_, { email, password}){
        const verifyUser = User.findOne({ email, password });
        console.log(verifyUser);
        return verifyUser;
    }
}

export default Query;
