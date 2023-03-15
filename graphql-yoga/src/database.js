import mongoose from 'mongoose';

/* CONECTION IN LOCALHOST */
// export const connect = async () => {
//     try{
//         await mongoose.connect('mongodb://127.0.0.1/mongoDbGraphQL', {
//             useNewUrlParser: true
//         });
//         console.log('Database connected'
//     }catch(error){
//         console.log(error);
//     }
// }

const uri = "mongodb+srv://root:pzMfkTVLCg6s4IKi@test1.hhebsaw.mongodb.net/?retryWrites=true&w=majority";
export const connect = async () => {
    try{
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected');
    }catch(error){
        console.log(error);
    }
}
