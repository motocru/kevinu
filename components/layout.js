import Head from 'next/head';
import Navbar from './navbar';
import Meta from './meta';

const Layout = (props) => (
  <div>
    <Head>
      <title>Kevin-u.com</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatiable" content="ie=edge" />
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Head>
    <Meta />
    <Navbar/>
    <div className="container" style={{paddingTop: '70px'}}>
      {props.children}
    </div>
  </div> 
);

export default Layout;
