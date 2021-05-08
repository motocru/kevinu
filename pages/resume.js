import Layout from '../components/layout';
import Head from 'next/head';

const Resume = () => (
  <Layout>
    <Head>
      <title>Kevin-u.com - Resume</title>
    </Head>
    <div>
      <h1>Resume</h1>
      <h4><i>My professional Resume</i></h4>
      <hr />
      <div className="centered">
        <h1><strong>Kevin J. Urban</strong></h1>
        <h3>3007 North Court, Onalaska, WI 54650</h3>
        <h3>(920) 224-4375 | urban.kevi@gmail.com</h3>
        <h3>github.com/motocru | kevin-u.com | www.linkedin.com/in/kevin-u/</h3>
      </div>
      <div>
        <h2><strong>Work Experience:</strong></h2>
        <p><strong>SQA Tester, Three Rivers Technologies - </strong> Rochester, MN (June 2018 - April 2020)</p>
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Extensively tested applications for multiple departments that added features to active 
            systems and replaced legacy systems while following the Application Lifecycle Management model.</li>
          <li>Wrote automated test software using C#, Selenium, and MSTest to consolidate regression testing 
            length from a full 8 hour day to an hour and a half process.</li>
        </ul>
        <p><strong>Full Stack Developer, Three Rivers Technologies - </strong> Onalaska, WI (April 2020 - Present)</p>
        <ul style={{listStylePosition: 'inside', marginLeft: '20px'}}>
          <li>Maintained and expanded front end and back end systems used for aiding support staff in helping customers with device and account issues.</li>
          <li>Constructed API endpoints for payment transaction history and invoice updates to google cloud firebase storage for accurate record keeping of customer accounts.</li>
          <li>Secured internet-exposed API endpoints using HMAC Authorization, preventing unauthorized access to company data and functionalities.</li>
          <li>Dynamically created billing statements for customers using the iText7 library to create PDFs detailing where and how customer account charges were incurred.</li>
          <li>Aided in testing of applications where possible to increase rate of application deployment.</li>
        </ul>
      </div>
      <div>
        <h2><strong>Skills:</strong></h2>
        <p><strong>Full Stack Web Development - </strong>Created client-side interfaces using ReactJS, Blazor, and NextJS. Constructed backend API’s 
        using JavaScript based technologies NodeJS and Express as well as industry-standard tools such as C# .NET. I have structured 
        MongoDB and SQL databases and maintained web services hosted on Linux cloud servers using Nginx.<br />
         <strong>Google Cloud Platform - </strong>Utilized Google Cloud Platform tools such as firestore, cloud scheduler 
         and kubernetes engine to store data, schedule API cron jobs and host application clusters.<br />
        <strong>Automation Testing - </strong>Created automation tests using Selenium in both JavaScript and C#. Incorporated both Selenium UI tests 
        and API tests in the MSTest framework to automate regression testing processes.</p>
      </div>
      <div>
        <h2><strong>Projects:</strong></h2>
        <p><strong>Kevin-u.com - </strong> A personal website created to host my resume, projects, and to practice programming. 
        This website was created using ReactJS, NextJS, Node, Express and MongoDB. 
        Nginx and a cloud-based Linux server acquired through DigitalOcean.com were used for hosting.<br />
        <strong>Diabotical / Quake Live timer</strong> A tool used for memorizing item timers in the competitive video games 
        Quake Live and Diabotical. This project was developed using React and NodeJS. <br />
        <strong>Grammar Guru - </strong> A game of hangman with varying levels of difficulty and user customization 
        including font choice and color scheme. This project uses a front-end ReactJS UI and backend API with NodeJS and a MongoDB database. <br />
        <strong>Curse Bot - </strong> A Discord application bot for tracking the usage of unsavory words and phrases. 
        This bot uses Discord’s external JS bot API as well as keyword recognition using regexes and database storage with MongoDB.
        </p>
      </div>
      <div>
        <h2><strong>Education:</strong></h2>
        <p><strong>Computer Science B.S. </strong>Minor Information Systems | University of Wisconsin - La Crosse</p>
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