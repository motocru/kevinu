import Layout from '../components/layout';
import Head from 'next/head';

const Resume = () => (
  <Layout>
    <Head>
      <title>Kevinu.com - Resume</title>
    </Head>
    <div>
      <h1>Resume</h1>
      <h4><i>My official Resume</i></h4>
      <hr />
      <div className="centered">
        <h1><strong>Kevin J. Urban</strong></h1>
        <h3>3625 41st. St. NW Apt #222, Rochester, MN 55901</h3>
        <h3>(920) 224-4375 | urban.kevi@gmail.com</h3>
        <h3>github.com/motocru | kevinu.com | www.linkedin.com/in/kevin-u/</h3>
      </div>
      <div>
        <h3><strong>Education:</strong></h3>
        <p>University of Wisconsin - Lacrosse: 2014 - 2018<br />
        Major: Computer Science, Minor: Information Systems</p>
      </div>
      <div>
        <h3><strong>Work Experience:</strong></h3>
        <p><strong>SQA Tester, Three Rivers Technologies - </strong> Rochester, MN (June 2018 - Present)
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Extensively tested a variety of application software through both manual and automated means</li>
        </ul>
        </p>
        <p><strong>Floor Sander, Stalker Sports Floors - </strong> New London, WI (June 2012 - August 2017)
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Extensive travel and team project experience refinishing hardwood floors</li>
        </ul>
        </p>
      </div>
      <div>
        <h3><strong>Skills:</strong></h3>
        <p><strong>Full Stack Web Development - </strong>I have created client-side interfaces, backend API's structuring
        databases and maintaining reliable web services. I worked mostly with JavaScript technoligies including NodeJs, Express,
        React.js, Next.js. I have also spent time using industry standard technologies such as C# ASP.NET and Java Spring.<br />
        <strong>Automation Testing - </strong>I have written UI automation tests using industry standard tools such as Selenium 
        in both JavaScript and C#. I have incorporated both Selenium and API testing with the MSTest framework. </p>
      </div>
      <div>
        <h3><strong>Projects:</strong></h3>
        <p><strong>Kevinu.com - </strong> A personal website created to host my resume, projects 
        and to practice programming. I chose to create this website using React.js and Next.js 
        as it presented an opportunity to learn new frameworks while accomplishing a goal of 
        maintaining a website. I also learned to use Nginx and use a Linux server to host the site.<br />
        <strong>Numeral to word converter - </strong> This program takes an integer ranging from 
        negative one quintillion to one quintillion and prints the English word counterpart. 
        This project was made for a class and was a great way to learn how useful recursion 
        can be to perform actions and remove unnecessary repeated code.<br />
        <strong>Grammar Guru - </strong> A game of hangman with varying levels of difficulty 
        and user customization including font choice and color scheme. This project helped with 
        learning skills in full stack development and has been done using both React.js and Angular frameworks.</p>
      </div>
      <div>
        <h3><strong>References:</strong></h3>
        <div>
          <p><strong>Vishal Trivedi - Lead Developer</strong><br />
          Time Acquainted: 6 Months<br />
          Phone: (507) 250-2625<br />
          Email: Trivedi.Vishal@mayo.edu
          </p><br />
        
          Still need a second reference here
        </div>
      </div>
      <hr/>
      <h4>A .PDF version of my Resume can be found here: <a href="../static/Resume082019.pdf" target="_blank">PDF</a></h4>
    </div>
    <style jsx>{`
      div {
        margin-top: 20px;
        margin-bottom: 20px;
      }

      hr {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0;
      }
      .centered {
        text-align: center;
      }
    `}
    </style>
  </Layout>
);

export default Resume;