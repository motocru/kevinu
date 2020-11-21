const Meta = () => (
   <div>
       <style jsx global>{`
           @charset "UTF-8";
           @import url("https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,700&display=swap");
           @import url("https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css");

           :root {
               --greyapple: #ecf0f1;
               --greenapple: #2ecc71;
               --darkmatter: #34495e;
               --darkermatter: #2c3e50;
           }

           * {
               margin: 0;
               padding: 0;
               box-sizing: border-box;
           }

           body {
               font-family: "IBM Plex Sans", Verdana, Geneva, Tahoma, sans-serif;
           }

           .container {
               padding-right: 15px;
               padding-left: 15px;
               margin-right: auto;
               margin-left: auto;
           }

           .centered {
               text-align: center;
           }

           @media (min-width: 768px) {
            .container {
              width: 750px;
            }
          }

          @media (min-width: 992px) {
            .container {
              width: 970px;
            }
          }

          @media (min-width: 1200px) {
            .container {
              width: 1170px;
            }
          }

           a {
               text-decoration: none;
               color: #3399ff;
           }

           a:hover {
               color: var(--greenapple);
               cursor: pointer;
           }
           
           hr {
            display: block;
            height: 1px;
            border: 0;
            border-top: 1px solid #ccc;
            margin: 1em 0;
            padding: 0;
          }
       `}</style>
   </div>
);

export default Meta;