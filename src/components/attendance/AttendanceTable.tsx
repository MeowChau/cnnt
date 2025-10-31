import { FC } from 'react'
import type { Session, Student } from '../../services/attendance/typings'

interface Props {
  session: Session
  onStatusChange: (studentId: string, status: Student['status']) => void
}

export const AttendanceTable: FC<Props> = ({ session, onStatusChange }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {session.students.map((student) => (
            <tr key={student.id}>
              <td>{student.studentId}</td>
              <td>{student.name}</td>
              <td>
                <select
                  value={student.status}
                  onChange={(e) => onStatusChange(student.id, e.target.value as Student['status'])}
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
