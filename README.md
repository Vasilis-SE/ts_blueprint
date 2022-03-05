# MovieRama

<p>
    Social media application that displays movies to user's where they 
    can add their own like/dislike others and view them. 
</p>

## Technologies 

<p>
    Below are listed the technologies that are used.
</p>

<ol>
    <li> NodeJS </li>
    <li> Typescipt</li>
    <li> PostgreSQL -> The database. </li>
    <li> PgAdmin -> Display database tool. </li>
    <li> Redis -> For caching. </li>
    <li> redisinsight -> Tool to display stored Redis keys. </li>
</ol>

## Installation 

<p>
    Follow the steps bellow to to install & run the application.
</p>

<ol>
    <li> Download repository </li>
    <li> Change directory to /server </li>
    <li> 
        Run npm init, to initialize project and to install all dependencies 
        based on the package.json file.
    </li>
    <li> 
        You might need to install ts-node globally so execute 
        <code>npm install -g ts-node</code> 
    </li>
    <li> 
        To be on the same page and use exactly the same technologies, 
        databased and tooling, docker is needed for setting up the project. 
        So you will need to download it and install it from 
        <a href="https://docs.docker.com/get-docker/"> here </a>.
    </li>
    <li> 
        Depending on how you will run the app <b>Development</b> or <b>Production</b>
        go to /server folder and you will need to either run 
        <code>npm run docker:build:dev</code> or <code>npm run docker:build:prod</code> 
        to build your image.
    </li>
    <li> 
        After that on the /server folder either run <code>npm run docker:up:prod</code>
        or <code>npm run docker:up:dev</code> to compose UP the image.
    </li>
</ol>

## Future Updates/Tweaks

<p>
    All the future updates/tweak that can be made on the application as well as the whole
    development process and the task that were created, issues and so on are located on
    <a href="https://github.com/Vasilis-SE/MovieRama/projects/1" target="_blank"> Github's Project Panel </a>
</p>