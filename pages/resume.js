import Layout from '../components/layout';
import Head from 'next/head';

const Resume = () => (
  <Layout>
    <Head>
      <title>Kevinu.com - Resume</title>
    </Head>
    <div>
      <h1>Resume</h1>
      <h5><i>My official Resume</i></h5>
      <hr />
      <div className="centered">
        <h2><strong>Kevin J. Urban</strong></h2>
        <h5>3625 41st. St. NW Apt #222, Rochester, MN 55901</h5>
        <h5>(920) 224-4375 | urban.kevi@gmail.com</h5>
        <h5>github.com/motocru | kevinu.com</h5>
      </div>
      <div>
        <h4><strong><u>Education:</u></strong></h4>
        <p>University of Wisconsin - Lacrosse: 2014 - 2018</p>
        <ul>
          <li>Major: Computer Science, Minor: Information Systems</li>
        </ul>
        <p>Carroll University: 2012 - 2014</p>
        <ul>
          <li>Major: Computer Science, Minor: Graphics Design Management</li>
        </ul><br />
        <p><strong>Selected Coursework: </strong>Software Design 1-4, Introduction to Databases,
        Fundamentals of Information Security, Programming Language Concepts, Operating Systems, 
        Web Programming, Compilers</p>
      </div>
      <div>
        <h4><strong><u>Skills:</u></strong></h4>
        <p><strong>Web Development: </strong>ASP.NET, Bootstrap, CSS, HTML, MySQL, NodeJS, Express, Spring</p>
        <p><strong>Programming: </strong>Java, C, C#, Javascript</p>
      </div>
      <div>
        <h4><strong><u>Projects:</u></strong></h4>
        <p><strong>Kevinu.com:</strong> Personal website to host my information and parctice programming</p>
        <ul>
          <li>Created using Next.js, React and Bootstrap 4 working on the front-end</li>
          <li>Backend is hosted on a Node.js server with Express framework and using MongoDB to store data</li>
        </ul>
        <p><strong>Numeral to word converter:</strong> Takes in an integer ranging from negative one 
        quintillion to one quintillion and prints the English word counterpart</p>
        <ul>
          <li>List of different languages this was written in includes: Java, C# and Scala</li>
          <li>Recursion loops and simple division and modulus formulas were used to categorize
            how large a given number was.
          </li>
        </ul>
        <p><strong>Grammar Guru:</strong> A game of hangman written in Javascript developed using
        a Node.js server with an Express framework and MongoDB database to store user information</p>
        <ul>
          <li>Supported varying levels of difficulty and user customization including font choice and color scheme</li>
          <li>Players were able to create and play multiple games without losing progress on any games they
            had started prior
          </li>
        </ul>
      </div>
      <div>
        <h4><strong><u>Work Experience:</u></strong></h4>
        <p><strong>SQA Tester, Three Rivers Technologies</strong>, Rocherster, MN (June 2018 - Present)</p>
        <p><strong>Floor Sander, Stalker Sports Floors</strong>, New London, WI (June 2012 - August 2017)</p>
        <p><strong>Front Desk Worker, Carroll University - Student Affairs Office</strong>, (September 2012 - May 2014)</p>
      </div>
      <div>
        <h4><strong><u>References:</u></strong></h4>
        <div className="row">
          <div className="col-sm-6">
            <p>Steve Stalker: Owner, Stalker Sports Floors<br/>
            Years Acquainted: 6<br/>
            Phone: (920) 475-0260<br/>
            Email: Steve@stalkersportsfloors.com</p>
          </div>
          <div className="col-sm-6">
            <p>Thomas Gendreau: Advisor, Associate Professor<br/>
            Years Acquainted: 4<br/>
            Email: tgendreau@uwlax.edu</p>
          </div>
        </div>
      </div>
      <hr/>
      <h5>A .PDF version of my Resume can be found here: <a href="../static/Resume082019.pdf" target="_blank">PDF</a></h5>
    </div>
    <style jsx>{`
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