import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-background">

      {/* ===== SEO CONTENT (ẩn UI – Google đọc được) ===== */}
      <section className="sr-only">
        <h1>Thân Quốc Thịnh – Backend Developer / Business Analyst</h1>
        <h2>Spring Boot | Node.js | Microservices | RESTful API</h2>

        <p>
          Tôi là Thân Quốc Thịnh, sinh viên ngành Kỹ thuật Phần mềm tại Việt Nam,
          định hướng phát triển sự nghiệp trong lĩnh vực Backend Developer và
          Business Analyst (BA). Tôi có kinh nghiệm xây dựng hệ thống backend với
          Spring Boot và Node.js, thiết kế RESTful API, làm việc với cơ sở dữ liệu
          SQL/NoSQL và triển khai kiến trúc microservice cho các hệ thống vừa và
          nhỏ.
        </p>

        <p>
          Bên cạnh kỹ năng lập trình backend, tôi cũng quan tâm đến phân tích yêu
          cầu nghiệp vụ, mô hình hóa hệ thống, viết tài liệu đặc tả (SRS, use case,
          user story) và làm cầu nối giữa khách hàng và đội phát triển. Website
          này là portfolio cá nhân, nơi tôi tổng hợp các dự án học tập, dự án cá
          nhân và kinh nghiệm liên quan đến backend development và business
          analysis.
        </p>
      </section>
      {/* ================================================= */}

      {/* UI chính */}
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
  