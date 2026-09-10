// lib/data.ts
import { Server, Database, Layout, Terminal, Users, Code2Icon } from "lucide-react";

// Thông tin cá nhân
export const personalInfo = {
  name: "Thân Quốc Thịnh",
  role: "Backend Developer & Business Analyst (.NET / Java)",
  description: "Kỹ sư phần mềm tốt nghiệp ĐH Tôn Đức Thắng với GPA 8.48/10. Chuyên sâu về hệ sinh thái .NET (C#, ASP.NET Core), Java (Spring Boot), phân tích nghiệp vụ (Business Analysis) và kiến trúc Microservices.",
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

// Danh sách kỹ năng (Ưu tiên .NET, sau đó là Java)
export const skills = [
  { category: "Frameworks", icon: Server, items: [".NET", "ASP.NET Core", "Spring Boot", "Node.js"] },
  { 
    category: "Languages & Core",
    icon: Code2Icon, 
    items: ["C#", "Java", "SQL", "JavaScript", "Python"] 
  },
  { category: "Databases", icon: Database, items: ["SQL Server", "MySQL", "Redis", "MongoDB"] },
  { category: "DevOps & BA", icon: Terminal, items: ["Docker Swarm", "Git", "Business Analysis", "Postman", "Linux"] },
];

// Danh sách kinh nghiệm 'experience'
export const experience = [
  {
    year: "03/2026 - Present",
    title: "Currently Working",
    company: "Mebisoft JSC",
    description: "GPA 8.48/10. Hoàn thành hơn 12 dự án từ học thuật đến thực tế.",
  },
  {
    year: "2022 - 2026",
    title: "Software Engineering Graduate",
    company: "Ton Duc Thang University",
    description: "Tốt nghiệp ngành Kỹ thuật Phần mềm với GPA 8.48/10. Sẵn sàng đảm nhận các vị trí Backend Developer hoặc Business Analyst.",
  }
];

// Danh sách dự án 'projects'
export const achievements = [
  { id: "pentapulse", type: "award" as const, year: "2025" },
];

export const certificates = [
  { id: "ielts", type: "certificate" as const, score: "6.0 Overall", issuer: "IDP / British Council" },
];

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
