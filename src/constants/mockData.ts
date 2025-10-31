export const MOCK_USERS = {
  lecturer: {
    id: "L001",
    name: "Nguyễn Văn A",
    email: "lecturer@example.com", 
    role: "lecturer" as const,
    password: "123456" // Lưu ý: Đây chỉ là mẫu, không nên lưu password như này trong production
  },
  student: {
    id: "S001", 
    name: "Trần Thị B",
    email: "student@example.com",
    role: "student" as const,
    password: "123456"
  }
}

// Helper function để khởi tạo dữ liệu mẫu
export const initializeMockData = () => {
  // Khởi tạo users mẫu
  localStorage.setItem('mock_users', JSON.stringify(MOCK_USERS))
  
  // Khởi tạo một phiên học mẫu
  const mockSession = {
    id: "SES001",
    date: "2023-12-20",
    courseId: "CS101",
    courseName: "Lập trình web",
    students: [
      {
        id: "S001",
        name: "Trần Thị B",
        studentId: "20020001",
        status: "present"
      },
      // Thêm sinh viên mẫu khác nếu cần
    ]
  }
  
  localStorage.setItem('session_SES001', JSON.stringify(mockSession))
}
