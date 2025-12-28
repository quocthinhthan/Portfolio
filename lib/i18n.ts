export type Lang = "vi" | "en";

export const dictionaries = {
  vi: {
    "nav.title": "Thân Quốc Thịnh Portfolio",
    "nav.theme.light": "Sáng",
    "nav.theme.dark": "Tối",

    "hero.badge": "Sẵn sàng thực tập Backend",
    "hero.cta.projects": "Xem Dự Án",
    "hero.cta.contact": "Liên Hệ",

    "personal.role": "Backend Developer | Sinh viên Kỹ thuật Phần mềm",
    "personal.description":
      "Sinh viên năm cuối ngành Kỹ thuật Phần mềm tại ĐH Tôn Đức Thắng với GPA 8.32/10. Chuyên sâu về hệ thống Backend, kiến trúc Event-driven và Docker.",

    "about.title": "Về Tôi",
    "about.p1":
      "Là một sinh viên năm cuối chuyên ngành Kỹ thuật phần mềm, tôi định hướng phát triển chuyên sâu vào ",
    "about.backend": "Backend Development",
    "about.p2":
      "Tôi tin rằng một hệ thống tốt không chỉ là code chạy được, mà còn phải dễ bảo trì, cấu trúc sạch (clean architecture) và tối ưu tài nguyên. Tôi luôn chủ động học hỏi các công nghệ mới như Cloud Computing và Microservices để áp dụng vào thực tế.",

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
    "proj.pentapulse.title": "PentaPulse",
    "proj.pentapulse.short": "Theo dõi bệnh nhân suy tim - Giải Nhì Startup TDTU.",
    "proj.pentapulse.full": "Lead Full-stack Developer. Tích hợp AI Gemini và Google Health Connect để theo dõi chỉ số sinh tồn bệnh nhân tự động.",
    "proj.renthub.title": "Renthub",
    "proj.renthub.short": "Nền tảng P2P Rental (Event-driven Architecture).",
    "proj.renthub.full": "Hệ thống cho thuê đồ dùng sử dụng RabbitMQ và Docker Swarm để đảm bảo khả năng mở rộng và chịu tải cao.",
    "proj.telescope.title": "Telescope Store",
    "proj.telescope.short": "E-commerce chuyên dụng cho kính thiên văn.",
    "proj.telescope.full": "Xây dựng hệ thống Backend hoàn chỉnh với Spring Boot, Spring Security và JWT để quản lý người dùng và đơn hàng.",

    "contact.title": "Liên Hệ",
    "contact.desc":
      "Tôi đang tìm kiếm cơ hội thực tập. Nếu bạn quan tâm đến hồ sơ của tôi, đừng ngần ngại kết nối!",
    "contact.downloadCv": "Tải Xuống CV",

    "footer.builtWith": "Được xây dựng bằng Next.js, Tailwind & Framer Motion.",
  },
  en: {
    "nav.title": "Quoc Thinh Than Portfolio",
    "nav.theme.light": "Light",
    "nav.theme.dark": "Dark",

    "hero.badge": "Open For Backend Internship",
    "hero.cta.projects": "View Projects",
    "hero.cta.contact": "Contact Me",

    "personal.role": "Backend Developer | Software Engineering Student",
    "personal.description":
      "Final-year Software Engineering student at Ton Duc Thang University (GPA 8.32/10). Focused on backend systems, event-driven architecture, and Docker.",

    "about.title": "About Me",
    "about.p1":
      "I am a final-year Software Engineering student, focusing on ",
    "about.backend": "Backend Development",
    "about.p2":
      "I believe a good system is not only about working code, but also maintainability, clean architecture, and resource efficiency. I proactively learn new technologies like Cloud Computing and Microservices.",

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
    "proj.pentapulse.title": "PentaPulse",
    "proj.pentapulse.short": "Heart failure monitoring - 2nd Prize TDTU Startup.",
    "proj.pentapulse.full": "Lead Full-stack Developer. Integrated Gemini AI and Google Health Connect for automated vital signs monitoring.",
    "proj.renthub.title": "Renthub",
    "proj.renthub.short": "P2P Rental Platform (Event-driven Architecture).",
    "proj.renthub.full": "Peer-to-peer rental system using RabbitMQ and Docker Swarm for high scalability and availability.",
    "proj.telescope.title": "Telescope Store",
    "proj.telescope.short": "Specialized telescope e-commerce.",
    "proj.telescope.full": "Built a complete backend system with Spring Boot, Spring Security, and JWT for secure user and order management.",

    "contact.title": "Get In Touch",
    "contact.desc":
      "I'm looking for backend internship opportunities. If you're interested in my profile, feel free to reach out!",
    "contact.downloadCv": "Download CV",

    "footer.builtWith": "Built with Next.js, Tailwind & Framer Motion.",
  },
} as const;

export type I18nKey = keyof (typeof dictionaries)["vi"];