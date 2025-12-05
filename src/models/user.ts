import mongoose from "mongoose";
import validator from "validator"


interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    photo: string;
    role: "admin" | "user";
    gender: "male" | "female";
    dob: Date;
    createdAt: Date;
    updatedAt: Date;
    // virtual age
    age: number
}


const schema = new mongoose.Schema(
    {
        _id: { String, required: [true, "Please inter ID"] },
        name: { String, required: [true, "Please inter name"] },
        email: {
            String, unique: [true, "Email already exists"],
            required: [true, "Please inter email"],
            validate: validator.default.isEmail,
        },
        photo: { String, required: [true, "Please add photo"] },
        role: { String, enum: ["admin", "user"], default: "user", },
        gender: { String, enum: ["male", "female"], required: [true, "Please inter Gender"] },
        dob: { Date, required: [true, "Please inter Date of birth"] },


    }, {
    timestamps: true
})

schema.virtual("age").get(function () {

    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if (today.getMonth() < dob.getMonth() || today.getMonth() === dob.getMonth()
        && today.getDate() < dob.getDate()
    ) {
        age--
    }
    return age
})

export const User = mongoose.model<IUser>("User", schema)