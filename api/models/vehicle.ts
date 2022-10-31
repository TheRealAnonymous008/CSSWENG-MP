import { randomUUID } from "crypto";
import mongoose from "mongoose";

export const VehicleSchema = new mongoose.Schema({
    id : {type: String, default: randomUUID()},
    licensePlate : String,
    make : String,
    model : String,
    yearManufactured : Number,
});

export const Vehicle = mongoose.model('Vehicle', VehicleSchema);