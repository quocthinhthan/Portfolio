export type Lang = "vi" | "en";

export const dictionaries = {
  vi: {
    "nav.title": "Thân Quốc Thịnh Portfolio",
    "nav.theme.light": "Sáng",
    "nav.theme.dark": "Tối",
    
    "nav.about": "Về Tôi",        // 🟢 Mới
    "nav.projects": "Dự Án",      // 🟢 Mới
    "nav.skills": "Kỹ Năng",      // 🟢 Mới
    "nav.contact": "Liên Hệ",     // 🟢 Mới

    "hero.badge": "Sẵn sàng thực tập Backend",
    "hero.cta.projects": "Xem Dự Án",
    "hero.cta.contact": "Liên Hệ",

    "personal.name": "Thân Quốc Thịnh",
    "personal.role": "Backend Developer | Sinh viên Kỹ thuật Phần mềm",
    "personal.description":
      "Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại ĐH Tôn Đức Thắng với GPA 8.32/10. Chuyên sâu về hệ thống Backend, kiến trúc Event-driven và Docker.",

    "about.title": "Về Tôi",
    "about.p1": "Là sinh viên năm cuối với nền tảng kỹ thuật vững chắc (GPA 8.32/10), tôi tìm thấy niềm đam mê lớn trong việc xây dựng 'phần chìm' của các hệ thống phần mềm - ",
    "about.backend": "Backend Development",
    "about.p2": "Tôi không chỉ viết code để chạy được chức năng, mà luôn trăn trở làm sao để hệ thống tối ưu, dễ bảo trì và mở rộng (Clean Architecture). Với tư duy cầu tiến và sự kỷ luật, tôi đang tìm kiếm cơ hội thực tập (Spring Boot/Node.js) để được cống hiến sức trẻ và học hỏi từ những bài toán thực tế.",
    
    "skills.title": "Kỹ Năng Kỹ Thuật",

    "experience.title": "Kinh Nghiệm & Học Vấn",
    "exp.tdtu.title": "Sinh viên Kỹ thuật Phần mềm",
    "exp.tdtu.company": "Đại học Tôn Đức Thắng",
    "exp.tdtu.desc": "GPA hiện tại: 8.32/10. Hoàn thành hơn 12 dự án từ học thuật đến thực tế.",
    "exp.intern.title": "Ứng viên Thực tập Backend",
    "exp.intern.company": "Đang tìm kiếm cơ hội",
    "exp.intern.desc": "Đang chuẩn bị CV và kiến thức chuyên sâu để ứng tuyển vị trí thực tập/fresher Backend.",

    // =========================================================
    // 🟢 CẬP NHẬT PHẦN PROJECTS CHO GIAO DIỆN MỚI
    // =========================================================
    "projects.title": "Dự Án Nổi Bật", // Key cũ (giữ lại nếu dùng chỗ khác)
    
    // Header Section
    "projects.section.label": "Sản Phẩm Kỹ Thuật",
    "projects.title.line1": "Dự Án",
    "projects.title.line2": "Tiêu Biểu",
    "projects.intro.desc": "Tuyển tập các hệ thống Backend được xây dựng với sự chú trọng tối đa vào khả năng mở rộng.",
    
    // Card Actions
    "projects.viewDetails": "Xem chi tiết →", // Key cũ
    "projects.card.view_details": "Nhấn để xem chi tiết →", // Key mới cho card
    "projects.btn.source": "Mã nguồn",
    "projects.btn.demo": "Demo",
    
    // Github Card
    "projects.github.view_more": "Xem thêm",
    "projects.github.on": "trên",
    "projects.github.visit_profile": "Xem Hồ Sơ",

    // Modal Details
    "projects.modal.role": "Vai trò",
    "projects.modal.description": "Mô tả chi tiết", // Cập nhật text cho khớp context
    "projects.modal.features": "Tính năng chính",
    "projects.modal.links": "Liên Kết",
    "projects.btn.source_code": "Mã Nguồn",
    "projects.btn.live_demo": "Trải Nghiệm Ngay",

    // Project Data Descriptions
    // Project 1
    "proj.pentapulse.title": "PentaPulse",
    "proj.pentapulse.short": "Theo dõi bệnh nhân suy tim - Giải Nhì Startup TDTU.",
    "proj.pentapulse.full": "Pentapulse là ứng dụng hỗ trợ quản lý và theo dõi bệnh nhân suy tim mạn tính.<br/><br/><strong>Tính năng nổi bật:</strong><br/>- Thu thập dữ liệu từ smartwatch qua Google Health Connect.<br/>- Gửi đến mô hình AI để dự đoán tình trạng (ổn định, cảnh báo, nguy hiểm).<br/>- Quét đơn thuốc bằng <strong>AI (Gemini API 2.5)</strong>.<br/><br/>Hệ thống gồm Backend Node.js, Frontend Flutter và cơ sở dữ liệu MongoDB. Dự án đạt <strong>giải Nhì</strong> cuộc thi ý tưởng khởi nghiệp khoa Dược.",
    // Project 2
    "proj.renthub.title": "Renthub",
    "proj.renthub.short": "Nền tảng P2P Rental (Event-driven Architecture).",
    "proj.renthub.full": "Rental Hub là nền tảng web P2P Rental, tập trung vào triển khai kiến trúc backend và hệ thống Docker.<br/><br/><strong>Điểm nhấn kỹ thuật:</strong><br/>- Frontend: ReactJS.<br/>- Backend: Node.js (Express) với MongoDB.<br/>- <strong>Scaling:</strong> Hỗ trợ scale nhiều instance backend bằng <strong>Docker Swarm</strong>.<br/>- Xử lý tác vụ nền (gửi email) bằng <strong>RabbitMQ</strong>.",
    
    // Project 3
    "proj.telescope.title": "Telescope Store",
    "proj.telescope.short": "E-commerce chuyên dụng cho kính thiên văn.",
    "proj.telescope.full": "Telescope là website bán kính thiên văn do tôi tự phát triển.<br/>- <strong>Backend:</strong> Spring Boot, Spring Security.<br/>- <strong>Frontend:</strong> Thymeleaf & Custom Template.<br/>- <strong>Database:</strong> MySQL.<br/><br/>Website có đầy đủ trang quản trị và các tính năng mua bán cơ bản. Có video demo kèm mã nguồn đầy đủ trên GitHub.",

    // Project 4
    // Buffet Order (MỚI)
    "proj.buffet-order-system.title": "Phần Mềm Order Buffet",
    "proj.buffet-order-system.short": "Hệ thống quản lý đặt món Buffet đa nền tảng.",
    "proj.buffet-order-system.full": "Hệ thống web đa nền tảng cho phép đặt món tại bàn (mô hình Haidilao/Gogi).<br/><br/><strong>Vai trò & Công nghệ:</strong><br/>- Tôi phụ trách phát triển <strong>toàn bộ backend bằng FastAPI</strong>.<br/>- Thiết kế API tách biệt để Frontend Mobile & Web dùng chung.<br/>- Triển khai API lên <strong>Railway</strong> để test online.<br/>- CSDL MySQL.<br/><br/>Các chức năng chính: quản lý bàn ăn, menu, đặt món, theo dõi tiến trình phục vụ.",
    
    // Network Security (MỚI)
    "proj.network-security-tool.title": "Network Security Tool",
    "proj.network-security-tool.short": "Công cụ phát hiện và ngăn chặn điểm truy cập giả mạo.",
    "proj.network-security-tool.full": "Công cụ bảo mật chạy trên <strong>Kali Linux</strong> giúp phát hiện điểm truy cập Wi-Fi giả mạo.<br/><br/><strong>Cơ chế hoạt động:</strong><br/>- Phân tích địa chỉ MAC và hành vi mạng.<br/>- Tự động gửi gói <strong>Deauthentication</strong> để ngắt kết nối khi phát hiện nguy hiểm.<br/>- Giao diện web log thời gian thực bằng <strong>Flask API</strong>.<br/><br/>Dự án được tôi tự phát triển và chạy hoàn toàn ở môi trường local.",

    "contact.title": "Liên Hệ",
    "contact.desc":
      "Tôi đang tìm kiếm cơ hội thực tập. Nếu bạn quan tâm đến hồ sơ của tôi, đừng ngần ngại kết nối!",
    "contact.downloadCv": "Tải Xuống CV",

    "footer.builtWith": "Được xây dựng bằng Next.js, Tailwind & Framer Motion.",

    "feat.iot": "Theo dõi chỉ số sinh tồn (IoT)",
    "feat.ai_chat": "Tích hợp Chatbot AI (Gemini)",
    "feat.health_connect": "Kết nối Google Health",
    "feat.event_driven": "Kiến trúc Event-driven (RabbitMQ)",
    "feat.high_availability": "Khả năng chịu tải cao",
    "feat.microservices": "Mô hình Microservices",
    "feat.auth": "Xác thực & Phân quyền (JWT)",
    "feat.cart": "Xử lý giỏ hàng",
    "feat.order_mgmt": "Quản lý đơn hàng",
    "feat.backend_api": "Xây dựng Full Backend API",
    "feat.database": "Quản trị CSDL Quan hệ",
    "feat.cloud_deploy": "Triển khai Cloud (Railway)",
    "feat.mac_detect": "Phát hiện MAC giả mạo",
    "feat.deauth": "Gửi gói tin ngắt kết nối (Deauth)",
    "feat.realtime_log": "Theo dõi Log thời gian thực",
  },
  en: {
    "nav.title": "Quoc Thinh Than Portfolio",
    "nav.theme.light": "Light",
    "nav.theme.dark": "Dark",
    "nav.about": "About",        
    "nav.projects": "Projects",   
    "nav.skills": "Skills",       
    "nav.contact": "Contact",     

    "hero.badge": "Open For Backend Internship",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",

    "personal.name": "Thinh Quoc Than",
    "personal.role": "Backend Developer | Software Engineering Student",
    "personal.description":
      "Final-year Software Engineering student at Ton Duc Thang University (GPA 8.32/10). Focused on backend systems, event-driven architecture, and Docker.",

    "about.title": "About Me",
    "about.p1": "As a final-year student with a solid technical foundation (GPA 8.32/10), I found my true passion in building the 'core engines' of software systems - ",
    "about.backend": "Backend Development",
    "about.p2": "I don't just write code that works; I strive for maintainability, scalability, and clean architecture. With a growth mindset and strong discipline, I am seeking a Backend Internship (Spring Boot/Node.js) to contribute my energy and learn from real-world challenges.",
    "skills.title": "Technical Skills",

    "experience.title": "Experience & Education",
    "exp.tdtu.title": "Software Engineering Student",
    "exp.tdtu.company": "Ton Duc Thang University",
    "exp.tdtu.desc": "Current GPA: 8.32/10. Completed 12+ projects ranging from academic to practical applications.",
    "exp.intern.title": "Backend Intern Candidate",
    "exp.intern.company": "Searching for Opportunities",
    "exp.intern.desc": "Preparing technical knowledge and projects for Backend internship/fresher roles.",

    // =========================================================
    // 🟢 UPDATED PROJECTS SECTION FOR NEW UI
    // =========================================================
    "projects.title": "Featured Projects", // Old key
    
    // Header Section
    "projects.section.label": "Engineering Output",
    "projects.title.line1": "Featured",
    "projects.title.line2": "Projects",
    "projects.intro.desc": "A collection of backend systems built with maximum focus on scalability.",
    
    // Card Actions
    "projects.viewDetails": "View Details →", // Old key
    "projects.card.view_details": "Click to view details →", // New key
    "projects.btn.source": "Source",
    "projects.btn.demo": "Demo",

    // Github Card
    "projects.github.view_more": "View More",
    "projects.github.on": "on",
    "projects.github.visit_profile": "Visit Profile",

    // Modal Details
    "projects.modal.role": "Role",
    "projects.modal.description": "Description",
    "projects.modal.features": "Key Features",
    "projects.modal.links": "Project Links",
    "projects.btn.source_code": "Source Code",
    "projects.btn.live_demo": "Live Demo",

    // Project Data Descriptions
    
    // Project 1: PentaPulse
    "proj.pentapulse.title": "PentaPulse",
    "proj.pentapulse.short": "Heart failure monitoring - 2nd Prize TDTU Startup.",
    "proj.pentapulse.full": "Pentapulse is a chronic heart-failure monitoring application designed to connect patients and doctors.<br/><br/><strong>Key Highlights:</strong><br/>- Collects health data from smartwatches via <strong>Google Health Connect</strong>.<br/>- Sends data to an AI model to predict risk states (stable, warning, critical).<br/>- Prescription scanning using <strong>AI (Gemini API 2.5)</strong>.<br/><br/><strong>Tech Stack:</strong> Node.js Backend, Flutter Frontend, and MongoDB. The project won the <strong>Second Prize</strong> in the Pharmacy Faculty Startup Competition.",
    
    // Project 2: Renthub
    "proj.renthub.title": "Renthub",
    "proj.renthub.short": "P2P Rental Platform (Event-driven Architecture).",
    "proj.renthub.full": "Rental Hub is a P2P platform for listing and renting personal items, with a strong focus on backend architecture and scalability.<br/><br/><strong>Technical Highlights:</strong><br/>- <strong>Frontend:</strong> ReactJS.<br/>- <strong>Backend:</strong> Node.js (Express) with MongoDB.<br/>- <strong>Scaling:</strong> Supports multi-instance scaling via <strong>Docker Swarm</strong>.<br/>- Handles background tasks (email notifications) using <strong>RabbitMQ</strong>.<br/><br/>The system ensures high availability and is suitable for small-to-medium rental service models.",
    
    // Project 3: Telescope
    "proj.telescope.title": "Telescope Store",
    "proj.telescope.short": "Specialized telescope e-commerce.",
    "proj.telescope.full": "Telescope is a self-developed e-commerce website dedicated to astronomy equipment.<br/><br/><strong>Tech Stack:</strong><br/>- <strong>Backend:</strong> Spring Boot, Spring Security (Auth & JWT).<br/>- <strong>Frontend:</strong> Thymeleaf & Custom Templates.<br/>- <strong>Database:</strong> MySQL.<br/><br/>The project features a complete admin dashboard, shopping cart logic, and order management system. Fully documented with source code and demo video.",

    // Project 4: Buffet Order
    "proj.buffet-order-system.title": "Buffet Order System",
    "proj.buffet-order-system.short": "Multi-platform Buffet order management system.",
    "proj.buffet-order-system.full": "A cross-platform web application for table-side ordering, inspired by models like Haidilao/Gogi.<br/><br/><strong>Key Contributions:</strong><br/>- Built the <strong>entire backend using FastAPI</strong>.<br/>- Designed service-oriented APIs to support parallel frontend development (Web & Mobile).<br/>- Deployed APIs on <strong>Railway</strong> for remote testing.<br/><br/><strong>Core Features:</strong> Table management, digital menu, order processing, and service request tracking.",

    // Project 5: Network Security
    "proj.network-security-tool.title": "Network Security Tool",
    "proj.network-security-tool.short": "Tool to detect and prevent fake access points.",
    "proj.network-security-tool.full": "A security tool running on <strong>Kali Linux</strong> to detect suspicious public Wi-Fi access points.<br/><br/><strong>Mechanism:</strong><br/>- Analyzes MAC addresses and network behavior.<br/>- Automatically sends <strong>Deauthentication packets</strong> to disconnect users from dangerous fake APs.<br/>- Real-time logging interface built with <strong>Flask API</strong>.<br/><br/>Independently developed and operates entirely in a local environment for educational & security testing purposes.",

    "contact.title": "Get In Touch",
    "contact.desc":
      "I'm looking for backend internship opportunities. If you're interested in my profile, feel free to reach out!",
    "contact.downloadCv": "Download CV",

    "footer.builtWith": "Built with Next.js, Tailwind & Framer Motion.",

    "feat.iot": "Vital Signs Monitoring (IoT)",
    "feat.ai_chat": "AI Chatbot Integration (Gemini)",
    "feat.health_connect": "Google Health Connect",

    "feat.event_driven": "Event-driven Architecture",
    "feat.high_availability": "High Availability",
    "feat.microservices": "Microservices Concept",

    "feat.auth": "Auth & RBAC (JWT)",
    "feat.cart": "Shopping Cart Logic",
    "feat.order_mgmt": "Order Management",

    "feat.backend_api": "Full Backend API Design",
    "feat.database": "RDBMS Management",
    "feat.cloud_deploy": "Cloud Deployment (Railway)",

    "feat.mac_detect": "Fake MAC Detection",
    "feat.deauth": "Deauthentication Packets",
    "feat.realtime_log": "Real-time Logging",
  },
} as const;

export type I18nKey = keyof (typeof dictionaries)["vi"];