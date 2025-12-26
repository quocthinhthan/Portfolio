// lib/data.ts
import { Server, Database, Layout, Terminal, Users } from "lucide-react";

// Thông tin cá nhân
export const personalInfo = {
  name: "Thân Quốc Thịnh",
  role: "Backend Developer | Software Engineering Student",
  description: "Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại ĐH Tôn Đức Thắng với GPA 8.32/10. Chuyên sâu về hệ thống Backend, kiến trúc Event-driven và Docker.",
  email: "quocthinhthan@gmail.com",
  github: "https://github.com/quocthinhthan",
  linkedin: "https://linkedin.com/in/quocthinhthan",
};

// Định nghĩa Interface 'Project' (Để fix lỗi ở Projects.tsx)
export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  role: string;
  features: string[];
  githubUrl: string;
  demoUrl?: string;
}

// Danh sách kỹ năng
export const skills = [
  { category: "Backend", icon: Server, items: ["Spring Boot", "Node.js", "RabbitMQ", "JWT"] },
  { category: "Databases", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { category: "DevOps", icon: Terminal, items: ["Docker Swarm", "Git", "CI/CD", "Linux"] }
];

// Danh sách kinh nghiệm 'experience' (Để fix lỗi ở Experience.tsx)
export const experience = [
  {
    year: "2021 - 2025",
    title: "Software Engineering Student",
    company: "Ton Duc Thang University",
    description: "GPA hiện tại: 8.32/10. Hoàn thành hơn 12 dự án từ học thuật đến thực tế.",
  },
  {
    year: "12/2025",
    title: "Backend Intern Candidate",
    company: "Searching for Opportunities",
    description: "Đang chuẩn bị CV và kiến thức để ứng tuyển vị trí thực tập Backend.",
  }
];

// Danh sách dự án 'projects'
export const projects: Project[] = [
  {
    id: "pentapulse",
    title: "PentaPulse",
    shortDesc: "Theo dõi bệnh nhân suy tim - Giải Nhì Startup TDTU.",
    fullDesc: "Lead Full-stack Developer. Tích hợp AI Gemini và Google Health Connect để theo dõi chỉ số sinh tồn bệnh nhân.",
    techStack: ["Flutter", "Node.js", "Gemini API", "Render"],
    role: "Lead Full-stack Developer",
    features: ["Theo dõi chỉ số sinh tồn", "Chatbot AI", "Health Connect Integration"],
    githubUrl: "https://github.com/quocthinhthan",
  },
  {
    id: "renthub",
    title: "Renthub",
    shortDesc: "Nền tảng P2P Rental (Event-driven Architecture).",
    fullDesc: "Hệ thống cho thuê đồ dùng sử dụng RabbitMQ và Docker Swarm để đảm bảo khả năng mở rộng.",
    techStack: ["Node.js", "RabbitMQ", "Docker Swarm", "Redis"],
    role: "Backend Developer",
    features: ["Event-driven", "High Availability", "Microservices concept"],
    githubUrl: "https://github.com/quocthinhthan",
  },
  {
    id: "telescope",
    title: "Telescope Store",
    shortDesc: "E-commerce chuyên dụng cho kính thiên văn.",
    fullDesc: "Xây dựng Backend hoàn chỉnh với Spring Boot, Spring Security và JWT cho việc bảo mật.",
    techStack: ["Java", "Spring Boot", "MySQL", "JWT"],
    role: "Backend Developer",
    features: ["Auth", "Cart logic", "Order management"],
    githubUrl: "https://github.com/quocthinhthan/TelescopeStore",
  }
  // Thêm các dự án khác vào đây...
];