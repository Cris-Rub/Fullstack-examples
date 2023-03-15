import Employee from "../models/Employee.js";

const Mutation = {
    async createEmployee( _, { name, age, position, code }){
        const newEmployee = {name, age, position, code};
        const employee = await Employee.create(newEmployee); // Return object
        return await Employee.find();
    },
    async updateEmployee(_, { _id, name, age, position, code }){
        const employee = {name, age, position, code};
        return await Employee.findByIdAndUpdate(_id, employee, {new: true}); // Informacion que puede ser utilizada para actualizar
        // return await Employee.findByIdAndUpdate(_id, {name, age, position, code}, {new: true}); // Informacion que puede ser utilizada para actualizar
    },
    async deleteEmployee(_, { _id}){
        const employee = await Employee.findById(_id);
        console.log(employee);
        if(!employee){
            //new Error('Employee not found');
            return [];
        }
        await Employee.findByIdAndRemove(_id);
        return await Employee.find();
    }
}

export default Mutation;
