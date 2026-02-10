const skills = ['HTML', 'CSS (Bootstrap, Sass, Tailwind)', 'JavaScript (jQuery)', 'C#', 'PostgreSQL'];

const experience = [
  {
    company: 'Hygiene Car Care (TATA)',
    location: 'Chennai',
    role: 'Service Advisor Trainee',
    period: 'Jan 2020 - May 2020',
    points: [],
  },
  {
    company: 'Amazon',
    location: 'Kumbakonam',
    role: 'Delivery Executive',
    period: 'Jan 2021 - Nov 2021',
    points: [],
  },
  {
    company: 'MK Infopoint IT Solutions',
    location: 'Remote',
    role: 'SMM & Front-End Developer',
    period: 'Jan 2022 - Jul 2022',
    points: [],
  },
  {
    company: 'Vega Intellisoft Pvt Ltd.',
    location: 'Chennai',
    role: 'Application Developer',
    period: 'Jul 2022 - Jun 2024',
    points: [
      'Developed and maintained web applications using C#, .NET Core, and MVC architecture.',
      'Designed and implemented responsive user interfaces using jQuery, HTML, and CSS.',
      'Worked extensively with PostgreSQL for database design, queries, and optimization.',
    ],
  },
  {
    company: 'MK Infopoint IT Solutions',
    location: 'Remote',
    role: 'Front-End Developer',
    period: 'Nov 2024 - Present',
    points: [
      'Developed and maintained a static website using HTML, CSS, and JavaScript.',
      'Ensured responsiveness, cross-browser compatibility, and a clean user interface.',
      'Optimized site performance and implemented SEO-friendly markup.',
    ],
  },
];

function App() {
  return (
    <div className="portfolio-page">
      <header className="hero card">
        <p className="tag">Portfolio</p>
        <h1>Naveenkumar Vembaiyan</h1>
        <h2>Application Developer & Front-End Developer</h2>
        <p className="objective">
          Dedicated and results-driven software developer with a strong foundation in modern web
          technologies. Committed to delivering clean, efficient, and scalable code for high-quality
          software solutions.
        </p>

        <div className="contact-grid">
          <a href="tel:+919003627969">+91 90036 27969</a>
          <a href="mailto:naveenvembaiyan6798@gmail.com">naveenvembaiyan6798@gmail.com</a>
          <span>Kumbakonam, Tamil Nadu</span>
          <a href="https://github.com/naveenvembaiyan" target="_blank" rel="noreferrer">
            github.com/naveenvembaiyan
          </a>
        </div>
      </header>

      <section className="section card">
        <h3>Skills</h3>
        <div className="pill-wrap">
          {skills.map((skill) => (
            <span key={skill} className="pill">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="section card">
        <h3>Experience</h3>
        <div className="timeline">
          {experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="timeline-item">
              <div className="timeline-head">
                <h4>{job.role}</h4>
                <p>{job.period}</p>
              </div>
              <p className="company">
                {job.company} · {job.location}
              </p>
              {job.points.length > 0 && (
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section grid-two">
        <article className="card">
          <h3>Education</h3>
          <div className="edu-item">
            <h4>B.E (Mechanical)</h4>
            <p>K.S.K. College of Engineering & Technology, Kumbakonam</p>
            <span>2015 - 2019</span>
          </div>
          <div className="edu-item">
            <h4>SSLC & HSC</h4>
            <p>Govt. Hr. Sec. School, Valangaiman</p>
            <span>2013 - 2015</span>
          </div>
        </article>

        <article className="card">
          <h3>Declaration</h3>
          <p>
            I hereby declare that the above-mentioned information is correct and true to the best of
            my knowledge and belief.
          </p>
        </article>
      </section>
    </div>
  );
}

export default App;
