// lib/data.ts
import { Server, Database, Layout, Terminal, Users, Code2Icon } from "lucide-react";

// Thông tin cá nhân
export const personalInfo = {
  name: "Thân Quốc Thịnh",
  role: "Backend Developer | Software Engineering Student",
  description: "Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại ĐH Tôn Đức Thắng với GPA 8.32/10. Chuyên sâu về hệ thống Backend, kiến trúc Event-driven và Docker.",
  email: "thanquocthinh112@gmail.com",
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
  { category: "Frameworks", icon: Server, items: ["Spring Boot", "Node.js", "ReactJS", ".NET"] },
  { 
    category: "Languages & Core",
    icon: Code2Icon, 
    items: ["Java", "JavaScript","Python", "Dart", "C#" ] 
  },
  { category: "Databases", icon: Database, items: ["MySQL", "SQL Server", "MongoDB", "Redis"] },
  { category: "DevOps", icon: Terminal, items: ["Docker Swarm", "Git", "Postman", "Linux"] },
];

// Danh sách kinh nghiệm 'experience' (Để fix lỗi ở Experience.tsx)
export const experience = [
  {
    year: "2022 - 2026",
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
    features: ["feat.iot", "feat.ai_chat", "feat.health_connect"],
    githubUrl: "https://github.com/quocthinhthan/PentaPulse-Health-System",
  },
  {
    id: "renthub",
    title: "Renthub",
    shortDesc: "Nền tảng P2P Rental (Event-driven Architecture).",
    fullDesc: "Hệ thống cho thuê đồ dùng sử dụng RabbitMQ và Docker Swarm để đảm bảo khả năng mở rộng.",
    techStack: ["Node.js", "RabbitMQ", "Docker Swarm", "Redis"],
    role: "Backend Developer",
    features: ["feat.event_driven", "feat.high_availability", "feat.microservices"],
    githubUrl: "https://github.com/quocthinhthan/Rental-P2P-MVP",
  },
  {
    id: "telescope",
    title: "Telescope Store",
    shortDesc: "E-commerce chuyên dụng cho kính thiên văn.",
    fullDesc: "Xây dựng Backend hoàn chỉnh với Spring Boot, Spring Security và JWT cho việc bảo mật.",
    techStack: ["Java", "Spring Boot", "MySQL", "JWT"],
    role: "Backend Developer",
    features: ["feat.auth", "feat.cart", "feat.order_mgmt"],
    githubUrl: "https://github.com/quocthinhthan/Telescope-Store-ECommerce",
  },
  {
    id: "buffet-order-system",
    title: "Buffet Order System",
    shortDesc: "Hệ thống quản lý đặt món Buffet đa nền tảng.",
    fullDesc: "Xây dựng toàn bộ hệ thống Backend bằng FastAPI để phục vụ cho ứng dụng gọi món tại bàn. Triển khai API lên Railway để hỗ trợ đội ngũ phát triển Frontend đa nền tảng.",
    techStack: ["FastAPI", "MySQL", "Railway", "Flutter"],
    role: "Backend Developer",
    features: ["feat.backend_api", "feat.database", "feat.cloud_deploy"],
    githubUrl: "https://github.com/quocthinhthan",
  },
  {
    id: "network-security-tool",
    title: "Network Security Tool",
    shortDesc: "Công cụ phát hiện và ngăn chặn điểm truy cập giả mạo.",
    fullDesc: "Phát triển một công cụ chạy trên Kali Linux có khả năng phát hiện các điểm truy cập WiFi giả mạo dựa trên địa chỉ MAC và thực hiện ngắt kết nối trái phép để bảo vệ người dùng.",
    techStack: ["Python", "Flask API", "Kali Linux", "Network Protocol"],
    role: "Full-stack Developer (Solo Project)",
    features: ["feat.mac_detect", "feat.deauth", "feat.realtime_log"],
    githubUrl: "https://github.com/quocthinhthan",
  }
  // Thêm các dự án khác vào đây...
];