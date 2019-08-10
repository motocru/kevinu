import Layout from '../components/layout';
import Head from 'next/head';

const About = () => (
  <Layout>
    <Head>
      <title>Kevinu.com - About</title>
    </Head>
    <div>
      <h1>About me</h1>
      <h5><i>Some basic information about myself</i></h5>
      <hr />
      <div>
        {/**This section goes over a bit about myself */}
        <h3>Who am I?</h3>
        <div>
          <p>
            &emsp;My name is is Kevin J. Urban. I'm a 25 year old SQA Tester 
            working for Three Rivers Technologies, currently living in Rochester, Minnesota
            . I'm originally from New London, Wisconsin and graduated from the 
            University of Wisconsin - Lacrosse with a bachelor's degree in computer science.
            I'm an avid programmer who enjoys learning anything new in the tech world whether 
            it be in the realm of hardware or software. I also enjoy running, lifting weights,
            snowboarding and competing in video game tournaments (Quake Champions mostly.)
          </p>
        </div>
        <div className="form-inline">
          <img src="../static/HS1.jpg" className="pic rounded-circle"/>
          <img src="../static/HS2.jpg" className="pic rounded-circle ml-auto"/>
        </div>
      </div>
      <div>
        {/**This section goes over the purpose of the website */}
        <h3>What's this website about?</h3>
        <div>
          <p>
            &emsp;The purpose of this website is to have a place to host information about 
            myself as well as having a website to use as a playground of sorts.
            On this website you can find my Resume and some previous programming projects
            that I've done. Having everything hosted here also allows me to create more
            projects to further expand my programming knowledge
          </p>
        </div>
      </div>
      <div>
        <h3>Contact me</h3>
        <div>
          <ul>
            <li>Email: urban.kevi@gmail.com</li>
            <li>Phone: (920) 224-4375</li>
            <li>GitHub: <a href="https://www.github.com/motocru" target="_blank" >Click Me!</a></li>
          </ul>
        </div>
      </div>
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

      .pic {
        width: 25%;
        height: 25%;
        padding: 10px;
      }
    `}
    </style>

  </Layout>
);

export default About;
