import Layout from '../components/layout';
import Head from 'next/head';
import Link from 'next/link';

const Projects = () => (
  <Layout>
    <Head>
      <title>Kevinu.com - Projects</title>
    </Head>
    <div>
      <h1>Projects page</h1>
      <h5><i>Here are some details and links to some projects i've done</i></h5><hr/>
      <div>
        <h5><strong>Kevinu.com:</strong></h5>
        <p>This is the website you're currently on! This website serves as my little corner of the
          internet to host my Resume and some programming projects I've done in the past.
          I also use this website as a playground of sorts whenever I want to try tackling
          a new coding project or learning anything new. This website was made using a frontend of
          React, Next.js and Bootstrap 4. The backend is running on Node.js with an Express framework
          and using MongoDB to store data. The entirety of the code base is hosted on a server droplet
          through <a href="http://www.digitalocean.com" target="_blank">digitalocean.com</a> 
        </p><br/>
        <h5><strong>Grammar Guru:</strong></h5>
        <p>This project was a game of hangman that was coded in Javascript using JQuery and hosted on a Node.js
          Server using an Express framework and MongoDB for the database. Grammar Guru allowed users
          to start up multiple different games and pick them back up without losing progress 
          on any other games they started. Grammar Guru allowed for users to customize their game
          with multiple color, font and difficulty selections to choose from. The version that is playable
          on this website has been tweaked to work with the React framework. Other changes including removal
          of unnecessary code that was a part of the original assignment that inspired this project.
        </p>
        <ul>
          <li>GitHub page: <a href="https://github.com/motocru/GrammarGuru" target="_blank">Grammar Guru</a></li>
          <li>Playable version: <Link href="/proj/grammarguru"><a>Grammar Guru</a></Link></li>
        </ul><br/>
        <h5><strong>Quake Champions Stat Page:</strong></h5>
        <p>This is a stat viewing application for the video game Quake Champions. The application
          pulls directly from the Quake Champions API and calculates the accuracy for a specified user
          for each of the in game weapons, total Kills for each weapon and current rankings for 
          the different competitive modes. The original version of this application was written as a
          bot for Discord, another version is usable on this website, both are written in Javascript with
          the main differences between the two being the website uses a GUI using the React framework while
          the discord application is CLI based.
        </p>
        <ul>
          <li>GitHub page: <a href="https://github.com/motocru/quakeBot" target="_blank">Quake Bot</a></li>
          <li>Discord Application Page: <a href="https://discordapp.com/developers/applications/489141612786483205/information" target="_blank">
          Quake Champions Bot</a></li>
          <li>Website Version: <Link href="/proj/quakestats"><a>Quake Champions Stats Page</a></Link></li>
        </ul>
        <h5><strong>Curse Bot:</strong></h5>
        <p>Curse bot is an application that tracks different levels of profanity on Discord servers.
          The bot identifies differnt curse words through the use of regexes and tracks the total usage
          for both servers and individual users through the use of a MongoDB database. When numerical milestones
          are reached, the bot will notify the the server and users of those specific milestones. 
          The bot will notify users of different stats such as the total count of curses or how many times
          a specific curse word has been used when prompted with commands.
          The bot will also respond randomly from a list of pre-generated messages when users try to
          talk to it.
        </p>
        <ul>
          <li>GitHub Page: <a href="https://github.com/motocru/curse-bot" target="_blank">Curse Bot</a></li>
          <li>Discord Application Page: <a href="https://discordapp.com/developers/applications/544133743632187403/information" target="_blank">
          Curse Bot</a></li>
        </ul>
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
      .centered {
        text-align: center;
      }
    `}
    </style>
  </Layout>
);

export default Projects;