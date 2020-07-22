import { ATTENDANCE_MODEL } from '../../constants';
import { Connection } from 'mongoose';
import { AttendanceSchema } from '../schemas/attendance.schema';

export const usersProviders = [
  {
    provide: ATTENDANCE_MODEL,
    useFactory: (connection: Connection) => connection.model('Attendance', AttendanceSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];