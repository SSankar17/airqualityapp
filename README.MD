INST377FinalProject
Sanjana, Noah, Kisa

About this Project
Purpose: to provide a platform for individuals to monitor and track changes in air quality and therefore provide at least some level of insight into the hands of people that wish to monitor such issues

Air quality is an often underestimated factor that plays a pivotal role in our overall well-being. As the human population continues to grow in size, so will the amount of urban environments that accompany such an increase. According to an article by The World Bank, some 56% of the world's population, or 4.4 billion individuals, already live in densely populated cities, with 70% of individuals expected to be living in similar conditions by the year 2050 (“Urban Development Overview”). This trend will likely only lead to higher rates of air pollution and therefore become a topic of concern for many, especially those with preexisting health conditions.

APIs used: https://aqicn.org/api/
           https://leafletjs.com/
           http://openstreetmap.org


Developers: Noah, Sanjana, Kisa

Languages: HTML, JS, CSS

Target Users: This is intended for the general public, in particular, those with breathing issues such as asthma or dust allergies as it can be helpful for these individuals to be able to check the air qualiity of a location before traveling in order to take necessary precausions.

Developer's Guide
Getting Started:

In order to properly work with the webpage, please start by downloading the necessary files from the GitHub repository. The needed files include Final_Project_V2.html, Final_Project_V2.js, About.html, Documentation.html, Style.css, App.js, and finally the README.md. To actually run the site on your end device, start by getting the localhost up and running by typing the following two commands into your terminal: “npm init” and “npm install express”, and then add the Supabase module and the CORS module with the following command lines: “npm install @supabase/supabase-js” and “npm install cors”. Next, start the App.js with the command “node App.js”. Once you receive a message that the server is running on port 3000, you can click the initial HTML file “Final_Project_V2.html” and then the “Go Live” button at the bottom right of Visual Studio Code, and as a result, get the site up and running. From this point, you will be brought to the homepage of the site where the actual APIs and main features of the project are located. You will also see the navigation bar where you can view the complimentary About page and Documentation page which houses all the needed information for users and developers to use the site. 


APIs:

For the site's main features located on the homepage, the following explains where in the code the API requests are located and what they are responsible for along with what each function is doing. Starting from the top of the homepage there is a form that asks for Latitude and Longitude coordinates. When users enter this information and submit it, the map located underneath, which initially loads with US coordinates and AQI widgets, will adjust to the location provided and show the many new widgets or Air Quality particulate matter that is 2.5 micrometers in diameter or smaller. Underneath the map, a box will list metadata about the air quality in the area such as Air Quality Index, Dominant Pollutant, Humidity, Temperature, Pressure, City, Attribution Sources, and Time.

The API used for controlling the map is Leaflet, a lightweight JavaScript library. Starting with the first line of JavaScript code located under the comment // Center the map on the United States, the initial coordinates and zoom level of the map are established by L or Leaflet's. Moving forward to the following comment line // Add OpenStreetMap tiles to the map, Leaflet is fetching the map tiles from openstreetmap.org and overlaying them onto the page, helping to generate the initial screen. Finally, the next comment line and code titled // Add Air Quality Index layer to the map is causing Leaflet to fetch the previously mentioned AQI widgets and properly overlay them onto the map from the world air quality index project API.

The next three comment lines are simply the functions used to listen for and react to the Latitude and Longitude form submission, check whether they are valid coordinates, adjust the map if they are, and pull the widgets from the World Air Quality Index Project API just like before. Finally, the next two sections of functions // Fetch AQI data from the API and // Display AQI data with bold titles are the actual JSON fetches from the AQI API which includes all the metadata info listed in the first paragraph. This JSON data is then formatted and placed in the appropriate container on the page for the user to read.

Database:

Moving further down the page, underneath the map, is the database whose actual title is AQI_LAT_LONG. This database was constructed in Supabase and is generated live on the page and will update to the most current copy of the table every time it is loaded. Its purpose is to provide users with possible latitude and longitude coordinates to use for the map above. The rest of the JavaScript file includes the code for fetching the data and displaying it on screen in a professionally formatted fashion. The first two comment sections labeled // Function to fetch and display Supabase table data and // Fetch data from our server's /data endpoint are the most important parts. The fetch command is the actual call to the database endpoint which is produced by the app.js file. It is looking for a JSON response which, as explained above, is then formatted to make the table seen on the screen when the page is loaded. This is the last of the endpoint calls in the document.

App.js:

This file is a Node.js server application that uses the Express.js framework to operate as an intermediary between the Supabase database that we have created and the frontend, helping to generate the endpoints for fetching all the data for the helpful latitude and longitude tables that are displayed on the home screen underneath the metadata container on the map as mentioned above. The most important section of code is the URL for the Supabase database and the complimentary API key, both are labeled under the comment section labeled // Initialize the Supabase client with hardcoded URL and Key. Finally, it's important to note that CORS was used to help ensure that the Node.js/Express server can handle requests from web pages hosted on different domains and keep the frontend and backend running properly.

Test, Bugs, and Future Development: At this current moment in time, the site has no known bugs or tests that have been developed for use. However, in terms of future development, the team and I mentioned including the ability to update the database live every time a user enters in coordinates to the map. We were also interested in adding a feature to give users the ability to simply add data to the tables and have it update the Supabase table through an add data form. However, due to time constraints, these features never made it to the current site.

Correspondents: If you have any further questions about the code or need further assistance, feel free to reach our head developer at the following email.

Noah Dolnick: noahdolnick@gmail.com

Link to User Manual