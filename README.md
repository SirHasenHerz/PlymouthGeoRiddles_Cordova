# Plymouth GeoRiddles

## Description
This project was originally created as a college project with two other fellow students.
Years later I revised and improved the app on my own.

This app uses geolocations as input and sends the user on a riddle journey along a coastal area of Plymouth, UK. The user is encouraged to move and look around the specified area in the real world and rediscover one's surroundings.

To start the journey, the user must move inside the specified area on the screen. If the user is outside of the area, a notice is display that they need to walk inside the area. Once they're in the area, the first riddle will be displayed. 
To solve a riddle, the user has to move to the location that is described in the riddle and need to log in their location by clicking on the button. Afterwards a feedback sound is played, whether the solution was false or correct. Also the next riddle is displayed, if the solution was correct.

As the app rely on the geolocation of the user and revolves around the specified areas of Plymouth, I implemented a debug mode that allows you to set the location with a mouse click. To use the actual geolocation data, you'll need to modify the code in the sketch.js file - just search for "DEBUG".

Originally this app was created for the web, but I wanted to have an android app afterwards. Therefore I used cordova, which build the android version for me.


## Techstack
* HTML, CSS, JS
* Ionic framework
* p5.js
* mappa.js
* turf.js
* cordova



## How to build: 
* install cordova and the specified dependencies on their website
* open console and execute `cordova build`
* then use android studio to transfer the android build on your phone
