# ChessGame-SE181
This is a collaborative project with the intent of building a chess web app that allows two clients to interact with a server.

Release Notes:

# Version 1.0: Connection
This is version is the basis for our webapp. This version hosts our first iteration of our node server and html pages to to serve the room assignment page.

-Create basic node server
-Create basic landing page with styling

# Version 1.1: Pathing rooms
This version included node server revision, java script functions for joining and creating rooms. More CSS styling and ChessGame class implimentation. 

-updated page to redirect to separate url root
-moved from using query parameters to url path.
-Implement basic chess game class

# Version 1.3: Chess Board Centering
This version was published after a group meeting rediscussing our methods and re-centering our vision to keep on the same path. This version tied up the loose ends.

-Changed to board for ease of connection
-Remove create rooms
-Added board.png 

# Version 1.4: Board Movement and Socket
This version revamped how the board is displayed and how its created. This is also the beginning of our socket implimentation and the basis for how our server communicates. 
Condensed files using inline css instead of using an additional file. Also cleaned up how we manage images. 

-Revamped index page
-Implemented sockets
-Implemented board and piece movement
-Removed external style sheet and made it internal to index.html file
-Added socket.io and client as dependencies
-Deleted pictures
-Deleted image folder

# Version 1.5: Move Validation
This version can be found in our Validation branch, it impliments our first iteration of validation. We pushed it to a seperate branch for testing and syncronization purposes. 
This version restricts the players movement into the valid moves allowed by the piece's type (via the validation function). 

-you can move correctly
-problems are that you can take your own pieces too
-needs to show checkmate and check

# Version 1.6: fixed same side taking
This version can be found in our Validation branch as it is our last iteration of our validation implimentation. This fixed our bug with piece's being able to take piece's of
the same color. Now you are no longer able to take pieces of the same color.

-Fix canibalism

# Version 1.7: Socket connections to make a two connecting rooms
This version can be found back in our main branch, it reimplimented the ability to join rooms to play the game. It also fixed path redirection through the web app. 

-Add Socket code for rooms
-Index.html changed to connection page
-ChessIndex.html reorganized the main game page
-Add server corrections to allow for rooms

# Version 1.8: Chess and rooms merged complete
This version is our final big update to the web app. This version performs our final merge to round out the game. This included some bug splatting and so retailoring of code
to get everything to play nice. 

-Merging of files to fix issues with movements


Candidate Release log
# Version 1.1.0 
Create a new UI for joining a game
Resolve same pleyer multi turn issue
Enter coordinates to move location

# Version 1.1.1
Move pieces on drag and drop
Specify game version in about page
