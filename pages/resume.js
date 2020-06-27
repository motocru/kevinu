import Layout from '../components/layout';
import Head from 'next/head';

const Resume = () => (
  <Layout>
    <Head>
      <title>Kevin-u.com - Resume</title>
    </Head>
    <div>
      <h1>Resume</h1>
      <h4><i>My work Resume</i></h4>
      <hr />
      <div className="centered">
        <h1><strong>Kevin J. Urban</strong></h1>
        <h3>3625 41st. St. NW Apt #222, Rochester, MN 55901</h3>
        <h3>(920) 224-4375 | urban.kevi@gmail.com</h3>
        <h3>github.com/motocru | kevin-u.com | www.linkedin.com/in/kevin-u/</h3>
      </div>
      <div>
        <h2><strong>Education:</strong></h2>
        <p>University of Wisconsin - Lacrosse: 2014 - 2018<br />
        Major: Computer Science, Minor: Information Systems</p>
      </div>
      <div>
        <h2><strong>Work Experience:</strong></h2>
        <p><strong>SQA Tester / C# Developer, Three Rivers Technologies - </strong> Rochester, MN (June 2018 - Present)</p>
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Extensively tested a variety of application software through both manual and automated means</li>
          <li>Wrote code for automatic billing generation and structured backend API's</li>
        </ul>
        <p><strong>Floor Sander, Stalker Sports Floors - </strong> New London, WI (June 2012 - August 2017)</p>
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Extensive travel and team project experience refinishing hardwood floors</li>
        </ul>
      </div>
      <div>
        <h2><strong>Skills:</strong></h2>
        <p><strong>Full Stack Web Development - </strong>I have created client-side interfaces, backend API's structuring
        databases and maintaining reliable web services. I worked mostly with JavaScript technoligies including NodeJs, Express,
        React.js, Next.js. I have also spent time using industry standard technologies such as C# ASP.NET and Java Spring.<br />
        <strong>Automation Testing - </strong>I have written UI automation tests using industry standard tools such as Selenium 
        in both JavaScript and C#. I have incorporated both Selenium and API testing with the MSTest framework. </p>
      </div>
      <div>
        <h2><strong>Projects:</strong></h2>
        <p><strong>Kevin-u.com - </strong> A personal website created to host my resume, projects 
        and to practice programming. I chose to create this website using React.js and Next.js 
        as it presented an opportunity to learn new frameworks while accomplishing a goal of 
        maintaining a website. I also learned to use Nginx and use a Linux server to host the site.<br />
        <strong>Diabotical / Quake Live timer</strong> A tool used to help with item respawn timers
        in the video games Quake Live and Diabotical. This project was a learning experience in App development using
        Dart and Flutter as well as a learning experience in API structure for the web application version <br />
        <strong>Grammar Guru - </strong> A game of hangman with varying levels of difficulty 
        and user customization including font choice and color scheme. This project helped with 
        learning skills in full stack development and has been done using both React.js and Angular frameworks.</p>
      </div>
      <div>
        <h2><strong>References:</strong></h2>
        <div>
          <p><strong>Vishal Trivedi - Lead Developer</strong><br />
          Time Acquainted: 1 Year<br />
          Phone: (507) 250-2625<br />
          Email: Trivedi.Vishal@mayo.edu
          </p><br />
          <p><strong>Nathan Jones - Developer</strong><br/>
          Time acquainted: 8 months<br/>
          Phone: (507) 244-0230<br/>
          Email: Jones.Nate@mayo.edu
          </p>
        </div>
      </div>
      <hr/>
      <h4>A .PDF version of my Resume can be found here: <a href="/Resume.pdf" target="_blank">PDF</a></h4>
    </div>
    <style jsx>{`
      div {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    `}
    </style>
  </Layout>
);

export default Resume;