import * as mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  views: String,
  user: String,
});
