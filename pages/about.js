import Layout from '../components/layout';
import Head from 'next/head';

const About = () => (
  <Layout>
    <Head>
      <title>Kevinu.com - About</title>
    </Head>
    <div>
      <h1>About me</h1>
      <h4><i>Some basic information about myself</i></h4>
      <hr />
      <div>
        {/**This section goes over a bit about myself */}
        <h3>Who am I?</h3>
        <div>
          <p>
            &emsp;My name is is Kevin J. Urban. I'm a 27 year old Software Engineer 
            working for Three Rivers Technologies and currently living in Lacrosse, Wisconsin.
            I was born in New London, Wisconsin and graduated from the 
            University of Wisconsin - Lacrosse with a bachelor's degree in computer science.
            I'm an avid programmer who enjoys learning anything new in the tech world whether 
            it be in the realm of hardware or software. I also enjoy running, lifting weights,
            snowboarding and competing in video game tournaments (Quake Champions & Diabotical mostly.)
          </p>
        </div>
        <div style={{height: '100%'}}>
          <img src="/HS1.jpg" className="pic" />
          <img src="/HS2.jpg" className="pic" style={{float: 'right', marginTop: '20px'}}/>
        </div>
      </div>
      <div>
        {/**This section goes over the purpose of the website */}
        <h3>What's this website about?</h3>
        <div>
          <p>
            &emsp;The purpose of this website is to have a place to host information about 
            myself as well as having a website to use as a playground of sorts.
            On this website you can find my Resume and some programming projects
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

      .pic {
        width: 25%;
        height: 25%;
        margin: 10px;
        border-radius: 30px;
      }
    `}
    </style>

  </Layout>
);

export default About;
