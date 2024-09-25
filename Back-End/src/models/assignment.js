import mongoose from 'mongoose';


const assignmentSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        upper: true,
        default: "new-user",
        nullable: false
    },
    description: {
        type: String,
        maxLength: 255,
        default: '',
        nullable: true,
    },
    accessLevel: {
        type: Number,
        default: 0,
        required: true,
        nullable: false
    }

})

export default new  mongoose.model('Assignment', assignmentSchema)