# CSC 462 Project - Phase 2 - By Dafydd Foster and Daniel Dubichev

### Link to application: [sentinel.westcloud.ca](http://206.12.92.18:10130/)
### Link to stakeholder report: [sentinel.westcloud.ca/blog](http://206.12.92.18:10130/blog/)

Throughout the course, we have been dealing with satellite imagery to derive and quantify information for stakeholders and potential end users. Phase 1 of our project revolved around the U.N’s 17 social development goals. The solution provided algae insights and visualizations of three different test sites across British Columbia, with an app to help uncover algae trends and blooms. Since then, we’ve had meetings and discussions with numerous stakeholders, data scientists, and first nations. The results of these meetings have uncovered specific solution needs, such as drones or sensors monitoring characteristics of specific locations. An example would be sensors monitoring the temperature of different bodies of water. A solution like this could help first nations and others discover suitable locations for harvesting kelp and similar products. This README will overview the proof of concept for the aforementioned water temperature drone system, including design, architecture and prototype ideas. 
# Design
To incorporate a local computing aspect into the pre-existing application, it was decided to utilize a localized ad hoc network of autonomous underwater vehicles (AUV’s), producing an Internet Of Things (IOT) based solution. Each AUV’s mission is to take a temperature reading of the surrounding water every second as they traverse through their dedicated regions. If at any point the temperature is read to be above a predetermined threshold, the geo-location will be flagged as an unfit location for future kelp farms. Each AUV’s respective region is determined by preset geo-points, creating an Area-Of-Interest (AOI). These AOI’s would be dynamically controllable to the end user, allowing for either a moving search grid structure or a refinement of a curtain AOI giving a higher sampling to area ratio. 

Each time an AUV gathers a new temperature reading, it will ping the base station (the client's local computer) with a ‘keep alive’ message. This message will contain identification of the AUV, the exact geo-location of the AUV at the time of the reading, the newly acquired temperature reading, along with other pertinent metadata. When the base station receives a new ‘keep alive’ message, it will do two things: First, the base station will do initial processing on the data to determine if the temperature reading is above the set threshold or not. Following the processing, the base station will insert all received data into a locally held database. A realtime, visual tracking interface will be available to the end user allowing them to see the exact location of all AUV’s at present time. Also, if an AUV has returned a temperature reading that has been determined to be above the preset threshold, a marker will be overlaid on the visual map, allowing the end users to gain an initial intuition of the data being received without having to initiate any data analytic techniques. Below is a live screenshot of a datapoint with an exceeding temperature threshold, resulting in a red data point representing a warning.

![pasted image 0](https://user-images.githubusercontent.com/31911398/128283890-315c6789-92cd-4972-95f9-093de44064f6.png)

Overlay of the map includes data point “features” which display temperature warnings to the end user.

Although this process is focused on localized computing, since all data being received from the AUV’s is actively logged into a local database, future development could include allowing the end user to then use this newly acquired dataset in conjunction with the pre-existing cloud based machine learning aspects of the application at a later date.
# Implementation
As the team does not have access to a group of AUV’s to truly implement this design, a proof of concept simulation was created in place. Also, although the majority of this design should be implemented as a separate process, not reliant on an internet connection, it was decided instead to implement the design solely in a web browser on the client's side which can be seen at sentinel.westcloud.ca/sensor.html. This way the end user does not have to download another piece of software for viewing. An open-source map library called OpenLayers[1] was used in conjunction with an ArcGIS[2] satellite overlay to render the map. Each AUV is represented as a green dot. To be able to track each AUV’s movements more clearly, the five most recent historical locations are also rendered, giving each AUV a green ‘snake’ like appearance six dots long. A primitive implementation of the classical maze solving algorithm ‘hand on the wall’ was used for the AUV’s movement automation, where a pseudo random number generator is used to decide if the AUV in question ‘hit a wall’. Likewise, a pseudo random number generator is used to simulate the temperature readings. When a temperature reading is above the preset threshold, a red marker is overlaid onto the interface’s map. Clicking on a red marker will display the metadata for the reading in question, including: location, date and time, geo coordinates, and the recorded temperature. Incorporated into the legend in the top left corner are three location buttons. By clicking these buttons the location in question is centered in the map and the scale is zoomed in allowing more precise location based viewing.
# Conclusion
By harnessing OpenLayers’ map functionality, we were able to render a proper mosaic of our three test sites. Further, by incorporating an Overlay on the map, this enabled geometric features to be seemingly placed on top of the map, with respect to each AUV’s current coordinate position. For each test site, the relative AUV is bounded by a set of coordinates, to simulate a real life operating sensor. Although each AUV is simulated, the next steps in this project would be to deploy real life sensors to begin true water monitoring and heat detection.

# References

[1] https://openlayers.org/

[2] https://www.arcgis.com/index.html


