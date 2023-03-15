import {Schema, model} from 'mongoose';

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    position: {
        type: String
    },
    code: {
        type: String
    }
});

export default model('Employee', employeeSchema);
