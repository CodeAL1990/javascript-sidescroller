# javascript-sidescroller

Final iteration combining all(most) of skillsets used in previous projects such as state management, child classes, sprite animation etc
Set up your canvas on html, css, js and set canvas width to 500 and height to 500.
In your main js file, encase everything in a load event listner for window
Create a main Game class that requires width and height as parameters and convert these parameters into class properties
Add a custom update and draw method in Game class
Create a new js file called player.js
Create Player class in player.js that will use the Game class as its parameter so pass game into it and convert it to a class property
Check the size of your sprite sheet in browser and deduce the width and height of a single sprite
Create width and height properties in Player and place the deduced values
Create xy properties, giving them values of 0 and 100 respectively for now
Create custom update and draw methods
In Player draw, add context as an argument and use the fillRect method on context to draw, giving it the x, y, width, and height parameters for now
You can use export default or named export to export Player to the main js file
As Player is the only class you want to use now, use named export to export it
Import the exported player.js into main.js
The usefulness of the class constructor is that when you use new keyword on the class, you are running all the code that are present in that class, making it easy to separate codes that matter only to the class you want to target
In Game, create player property and call the new keyword on Player that you have imported
Since your Player class expects game as an argument, you can just pass the this keyword in Game's player property since player is already inside Game
With player property done, you can call the draw method on player in Game draw, passing them the required context arguments
Create a game variable and call new Game with the required arguments to execute the code inside Game
console.log game to see the properties of the Game
To display it visually we want to use requestAnimationFrame canvas method
Create custom animate function, using draw on game with the required argument, and use requestAnimationFrame with animate argument
Call animate after you have done the above
You should see the default black rectangle drawn base on the width and height you have set in Player
You can change the color with fillStyle on context in Player draw and move it around using the xy properties which act as positions which have been passed as parameters in fillRect
With that in mind, you probably want player to be on the x axis of the canvas to represent him/her being on the ground
In y property, change the value to the Game's height(remember how to access Game properties in Player?) minus Player's height which will deduct the total gameHeight with the Player's height, 'pushing' the Player object to ground level
Once you are satisfied with the location of Player object, let's replace the default box with the Player sprite
Create image property in Player and link the image from the img tag in html
Use drawImage method on context in Player draw and pass in image, x, and y
Pass in the width and height as well in drawImage and it will squeeze the whole spriteSheet in your width and height dimensions
You need all 9 parameters(missing sx, sy, sw, sh) to crop out a single frame of the sprite sheet
To crop the first sprite as placeholder, pass 0 to sx and sy, and pass the width and height of Player to sw and sh
You can delete fillRect and other fill methods in Player draw since you have your sprite as reference now
Even though the sprite looks static, it is actually 'animating' on the same frame due to requestAnimationFrame
To visually show that it is animating, let's increment x in Player update
In Game update, you should call update on player
In animate, call update on game
You should see your sprite 'moving' across the horizontal axis
To prevent the 'smudging' because requestAnimationFrame is redrawing on the canvas without wiping its previous draws, use clearRect method on the canvas
Comment increment x in Player update once the above is working
Incrementing x on its own will move Player but that is due to the expression and not player input such as directional keys which is ultimately what we want
Create input.js file and create InputHandler class where you will place all your input related code for player
Add keys property with empty array
keys will have directional key presses and releases being pushed and removed in it to make sure only 1 key press is present inside at any point in time
Since the code inside classes will be executed everytime a new instance is made from them, we can make use of it to 'listen' for events such as key presses(keydown)
Add keydown event listener for window inside InputHandler, and use event or e as the callback function(using the arrow function to bind it to the parent class)
If you remember from previous projects, if you console.log(e) you can find out the properties of the key presses inside console when you press a key
The property that we need is the key property which contains the direct information of whatever key we are pressing on the keyboard
Thus, console.log(e.key) inside the event listener will show you what the keydown event listener is doing when you press a key
It won't work now because you have not export and import yet, do it
Like with player, you want to create an instance of InputHandler inside Game class properties
In your console, you should be able to see all the key presses you are doing on your keyboard
Since you only want directional keys like up down left right(ArrowUp, ArrowDown in console), you want to specifically target only those keys
Start off with down arrow key, add a condition where if e.key is down AND that they are not yet inside keys array(use indexOf for this), push that e.key into keys array
You can add an additional this.keys in your e.keys console.log and you can observe down arrow key being added to array and subsequent presses do not add additional items to it
Now, create a keyup event listener for window to check for key releases
We will be removing the keys inside keys array when they are released to make way for new key presses
Do it for the down arrow key using the splice(index, how many to remove) method
console.log after the statements for keydown and keyup to see arrow down key being added on press and removed on release
Once the above is working we can add additional directional keys to listen for
Add the up arrow key condition with the down array using OR operator to separate them
Remember OR operator will be evaluated later than AND so you will need parenthesis to evaluate the OR condition first(which you want) before evaluating the AND condition
If the OR operator is working as intended, add the remaining left and right to both event listeners
Slightly different from the previous state management project, you want to add an Enter key(or Control or Alt whatever you prefer) for special move in InputHandler
\*\*This part will be confusing
You want player to react to input changes
Remember the increment x in Player update which you comment?
Update is where you want player to 'update' the canvas base on the new inputs
Pass the keys array into the Game's player update to check for changes in that array
In Player update, pass the input parameter in it as player expects it, and you want to check if input has the ArrowRight key(use incldues or indexOf), then increment x
Else, if input has ArrowLeft, decrement x
You should be able to move player left and right with the respective keys
You are now moving at a constant of +1 or -1 and if you want to increase and decrease speed you will need to hardcode the numbers in which is not good
You want to add speed as a Player property and set it to 0
Add maxSpeed property and set it to 10(this will be where you can adjust your player speed)
We will be dealing with horizontal movement for now(left and right) so add that section in Player update
Increment x by speed(which will be 0 for now)
In the ArrowRight and left condition, set speed to maxSpeed for right and left to -maxSpeed
This will move the player left or right but indefinitely since speed is constantly 10 or -10
Give the condition an else condition and set speed back to 0 once right or left is not pressed
Notice that player can move outside the canvas which you do not want
For the left side, you can add a condition where is x is less than 0, set x to 0(so it can never go below 0 which is beyond the left canvas)
For the right side, if x is more than game width minus the width, set x to the game width minus the width(player is width and game width is the whole of canvas width)
Add a vertical movement section now
Add helper property veloY(stands for velocityY) and set it to 0
In vertical movement section, increment y by veloY(No changes because veloY is 0)
Just like previous projects, we need to know if player is currently on the x axis or not when jumping, during the jump and landing
Create custom method onGround in Player and in it, return y is more than or equals to game height minus height(this will return true or false, true being player is on the ground and vice versa)
In vertical movement section, set a condition where if input has ArrowUp, decrement veloY by -20(negative because up is negative down is positive)
Pressing up should move player up and off screen
Player should only jump when up is pressed AND on the ground(add the AND condition)
Currently, player will just keep going upwards since veloY is constantly being decremented
To bring player back down, we need an opposing force or weight of sorts so player 'fall'
Add a property called weight and set it to 1
Add a condition when player is not on the ground(in the air), veloY is incremented by weight(so negative veloY will constantly being added by weight which will push negative to positive and translates to upwards and downwards in this case)
Since the addition is constant, the jump and fall will look smooth
Player will fall through the ground now after jumping since there are no restrictions in place
Add an else condition when player is not on ground to set veloY back to 0
Place increment y by veloY below the ArrowUp condition for vertical movement to work
Notice in the previous state management we started off with multiple js files which makes life easier when adding or altering the codes inside without breaking the rest of the game. In this we did not start of with state management so there are alot of if else statements in Player for player movements which makes it messy
To alleviate this messiness, create a playerStates.js file where each state will be tasked to perform its own unique duties
Create a states object inside the freshly created js file
Add the basic states of the player such as sitting,running and jumping, giving them increasing numbers starting from 0(enum)
Create a State class with state as its parameter(depending on which 'state' player is in, inputs will behave differently)
Convert state parameter into class property(this is for console.log purposes)
Create child class Sitting with parent class State
Give it a requirement of a player parameter
To give child access to parent's properties and methods, you use the super method in child class
super method will look at the parameter in parent class(State) and see that state is a requirement so you need to pass in an argument in super that is related to state
In this case, this super is in Sitting child class so you can name the state argument in super as "SITTING" to represent the state the child class is in
The state "SITTING" will be converted in the parent State class to a class property
this keyword will also yield an error in a child class if you do not use super method to link the child and parent class
In Sitting child class, convert player parameter to a class property
Create custom method enter in Sitting child class(each child class will have this method to 'enter' the related state when called)
Create custom method handleInput with input parameter(this method will be tasked to switch to a different 'legal' state from the Sitting state in this case. 'Legal' state meaning it will ignore an input if it's not present in this method)
Now, we need three helper properties in Player to determine what state is player in
Add states property and assign an empty array
Add currentState and assign it states array index(give it a default of 0 for now)
Add an enter call on currentState(this is to call the initial state of whatever your currentState is)
Export and import your Sitting class into player.js
Just like in main.js with Player and InputHandler, you want to create an instance of them to run the code inside them
In this case, however, instead of just running the code, we want to run the code base on the input being pressed
This is why the first two helper methods are needed, states to store the different states available to the player, and currentState to switch between states base on the handleInput method(enter on currentState is only to set the initial default state)
You want to create an instance of Sitting class inside the states array where it will store it for you to use later
Since Sitting class expects a player argument, and the states array is in Player, you can just pass this keyword to point towards Player and run its code
When entering sitting state, you want to draw the sitting sprite on the canvas
Currently you have no way of drawing it because in your drawImage you are hardcoding 0,0 in sx and sy which represent the first sprite(top left) of your sprite sheet
To gain access to the full scope of your sprite sheet, we will need helper properties to move along both the x and y coordinate
Add frameX and frameY properties and set them to 0
In drawImage, replace the 0s with frameX multiplied by width for sx and frameY multiplied by height for sy
Now, when you change the values inside frameX and/or frameY, you can switch between sprite poses of the whole sheet
For the sitting state, you can see that it starts when frameY is at 5
With that in mind, in Sitting class enter method, you can set frameY in Player to 5
Currently, you can only be in the sitting state because currentState will always be at index 0(sitting state) and creating a second state is meaningless when you cannot access it
You will need a custom method that switches between states using currentState and states array
In Player, create custom method setState and use state as its parameter
Set currentState in setState to the states array and pass state inside the array(state will be a number representing the index of the array)
Call enter on currentState after(enter will have specific poses, animations and other codes that you want that state to enter in)
setState is done, allowing you to switch between states
You want to use inputs to switch between states that is why you have handleInput custom methods in child classes
To call upon these methods with input being a requirement, you will do so in Player update which expects input parameter and call handleInput on currentState(which will point towards what state it is in base on index), passing the input as argument in the call
In Sitting class handleInput, you want this custom method to contain all 'legal' state switches when in Sitting state, in this case, only running left or right is allowed
Add a condition where if input has ArrowLeft OR ArrowRight, setState to RUNNING(make use of the states object to point towards the state you want)
You do not yet have a Running class so this condition wouldn't work, so create one(similar to Sitting class)
Make the appropriate change to super and frameY
In handleInput, if input is ArrowDown, switch state to SITTING(you know jumping is also a state you want but for now we are just establishing that relationship with Sitting class, and to make sure the code is going to work)
Export/import and add new Running instance in states array in Player(remember to follow the enum order strictly)
You can add Jumping class once you can switch between Running and sitting state
Comment out the ArrowUp condition in vertical movement section(Notice you can jump due to this code, you are going to move it to its state now)
Move the onGround condition into Jumping enter method(Remember you are in a different js file now)
In jumping state, you obviously will fall after you reach peak height(which we did before using veloY and weight)
Entering falling state do not require an input, and you only fall when veloY reaches peak at 0 and become positive(positive means falling)
So in jumping's handleInput, if veloY is more than 0(\*\*video says more than player weight, although i think more than 0 is fine), setState to FALLING
Add FALLING in your states object
To enter jumping state, it makes sense it starts off from the running state so add that else if condition in its handleInput method
Create Falling class and do the changes
For the falling state, you only care when it touches ground
So in its handleInput, once player is on the ground, setState to RUNNING
Export/import jumping and falling classes, and add them to states array
Play around in your browser and make sure all states work accordingly
Remember in the previous state management project while in their air you cannot move left or right and you jump left or right explicitly using jump left and jump right child classes and thus you cannot control your left right motion while not on the ground
In this project, we place the ArrowRight and left logic in the Player update method as well so player can move left right in any state, making it the control more fluid instead of forced like in state management
You can remove the commented code in vertical movement(or leave it for reference)
Add a new section in Player update called sprite animation where it will control all logic regarding each state's animation
Add maxFrame property in Player and set it to 5
You can set a condition where if frameX is less than maxFrame, increment x
Else, set frameX set frameX back to 0
You can see your sprites moving across horizontally on the sprite sheet(sitting is blinking because the rows are uneven which will show empty spaces)
Comment the frameX condition out for now
Just like previous projects, you should use time stamps from requestAnimationFrame to dictate how fast you want your frames to animate
In Game, create a variable called prevTimeStamp(author uses lastTime) to hold previous time stamps
requestAnimationFrame will pass the time stamp value in the DOM as a value to its argument as a value(in this case animate which you have passed to it)
You can capture that value as a variable by naming it in animate's parameter, in this case name it timeStamp
With that info, you can now calculate the time difference between each animation frame in milliseconds by deducting that timeStamp with the previous time stamp (prevTimeStamp), giving it a variable name of deltaTime
Just like the name suggest, prevTimeStamp will always hold the time stamp from the previous loop
As such, set prevTimeStamp to timeStamp after calculating deltaTime so the previous time stamp will be replaced by current time stamp and be used in the next loop as previous time stamp
Since the first loop has no previous time stamp, the initial call of animate will return undefined
Add a default 0 to the animate call to fix this
console.log deltaTime after calculation of deltaTime to see how the console captures this information
You probably want deltaTime to be used in areas where pc power will affect the gameplay experience differently
In our case, this will be in the game itself and when the player inputs their keys to play the game
Remove/comment the console log and pass deltaTime to the update call on game inside animate
Pass deltaTime as a parameter to Game update, and inside this update, add deltaTime as a second parameter to the update call on player
In Player update, pass deltaTime as its parameter as well
We will need three helper properties to make use of deltaTime, fps, frameInterval and frameTimer
Set fps to 20(this will be fixed to give uniformity across machines)
Set frameInterval to 1000 divided by fps(Computers calculate in milliseconds)
Set frameTimer to 0(incrementing it by deltaTime till it reaches frameInterval before serving the next frame)
Under sprite animation section, when frameTimer is more than frameInterval, set frameTimer to 0 to reset the count
After the above, invoke the frameX condition you have commented out(place it inside this newly created condition)
Else, increment frameTimer by deltaTime
You should notice that your sprite moves at a comfortable speed now(not on steroids like before)
To fix the blinking, remove the value in maxFrame and set maxFrame value in the enter method under sitting
You should do this for all states so each state will have the correct number of sprite frames
There is still blinking when swapping states too fast due to frameX not resetting back to 0 before frameY is calculated
To prevent this, set frameX to 0 at the start of each enter method so javascript will set sprite sheet to 0 index before calculating maxFrame and frameY in their enter methods
The art assets(playerFinal.png) that you are using is designed for around 20 fps(more fps means more frames/drawings needed)
When we introduce background into the canvas, the 'ground' level of the background will not be on the x axis of the canvas, but will protrude out at a certain margin
Add a groundMargin property in Game and set it to 50
In Player, y will need to be adjusted by this groundMargin so deduct the calculation by groundMargin
Remember to place groundMargin property before the new instance of player because player will need to have access to that value in Game before it instantiates with new keyword
Since you are moving ground level downwards by 50, you will need to offset it in your onGround method by that value to reach your new 'ground' level
If you find that your player sprite is clipping the top of your canvas, you can adjust the veloY value in the jumping state
We will now create background.js to deal with background related stuff
In background.js, we will create a Layer class that has game, width, height, speedModifier, and image as parameters
Turn them all to class properties, set xy to 0 and create custom update and draw methods
In background update, when x is less than negative width(if background moves completely off canvas), set x back to 0
Else, decrement x by game's speed(else keep moving x left till it does)
multiplied by speedModifier(the speed change i.e 1.1 1.2 1.3 0.9 etc)
There is currently no speed property in Game so create it and give it a number like 3
In Layer draw, pass the context as parameter and use drawImage on it with 5 parameters (drawImage has 3, 5 or 9 parameters)
Now create Background class, passing the game parameter and convert it to class property
The background layers you downloaded has a width of 1667 and height of 500(on ubuntu you can see it but on windows you probably need to use the browser console)
Once the background layers a downloaded you can bring them in the html using img tags
Once created, you can use getElementbyId or just use the Id to bring them as properties inside Background class
For now just create layer5 for now to test it out
Add layer(\*\*author wrote layer1 might be a typo) and create new instance of Layer with the required parameters(for dy, pass 1 into it since there is no value for speedModifier yet, and for image, pass the layer5 property)
Add backgroundLayers property with an empty array
Place the layer property inside this array
Create custom update and draw methods
In background update, use forEach method on backgroundLayers and for each layer, call update on it(\*\*not sure if naming layer in constructor and using layer as the parameter in the forEach method will have issues)
In background draw, pass context and also use the forEach method on backgroundLayers, calling draw on each layer with the required parameter
In Game, create new instance of background and pass the game parameter into it(this keyword since background is inside Game)
Once background is instantiated, you can call its update method inside Game update(place it above player update call because you want background to be behind player)
Do the same in Game draw(with the required parameter)
Remember to export/import background in Game
You should see layer5 animating on the canvas now
Adjust groundMargin to match player sprite with the layer5(which is the ground)
To create a seamless endless scrolling background, you want to drawImage twice for Layer class
Copy and paste a second drawImage for Layer and in its dx component, add the width of the Layer in it
So instead of showing blank spaces after it scrolled through the background layer, it will show the same layer a second time but only the width of the Layer(800px of 1667px) before resetting to the start of the first drawImage(\*\*maybe because of requestAnimationFrame in animate)
