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
Increase x by speed(which will be 0 for now)
In the ArrowRight and left condition, set speed to maxSpeed for right and left to -maxSpeed
This will move the player left or right but indefinitely since speed is constantly 10 or -10
Give the condition an else condition and set speed back to 0 once right or left is not pressed
Notice that player can move outside the canvas which you do not want
For the left side, you can add a condition where is x is less than 0, set x to 0(so it can never go below 0 which is beyond the left canvas)
For the right side, if x is more than game width minus the width, set x to the game width minus the width(player is width and game width is the whole of canvas width)
Add a vertical movement section now
Add helper property veloY(stands for velocityY) and set it to 0
In vertical movement section, increase y by veloY(No changes because veloY is 0)
Just like previous projects, we need to know if player is currently on the x axis or not when jumping, during the jump and landing
Create custom method onGround in Player and in it, return y is more than or equals to game height minus height(this will return true or false, true being player is on the ground and vice versa)
In vertical movement section, set a condition where if input has ArrowUp, minus veloY by -20(negative because up is negative down is positive)
Pressing up should move player up and off screen
Player should only jump when up is pressed AND on the ground(add the AND condition)
Currently, player will just keep going upwards since veloY is constantly negative
To bring player back down, we need an opposing force or weight of sorts so player 'fall'
Add a property called weight and set it to 1
Add a condition when player is not on the ground(in the air), veloY is incremented by weight(so negative veloY will constantly being added by weight which will push negative to positive and translates to upwards and downwards in this case)
Since the addition is constant, the jump and fall will look smooth
Player will fall through the ground now after jumping since there are no restrictions in place
Add an else condition when player is not on ground to set veloY back to 0
Place increase y by veloY below the ArrowUp condition for vertical movement to work
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
Set frameTimer to 0(increasing it by deltaTime till it reaches frameInterval before serving the next frame)
Under sprite animation section, when frameTimer is more than frameInterval, set frameTimer to 0 to reset the count
After the above, invoke the frameX condition you have commented out(place it inside this newly created condition)
Else, increase frameTimer by deltaTime
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
Else, minus x by game's speed(else keep moving x left till it does)
multiplied by speedModifier(the speed change i.e 1.1 1.2 1.3 0.9 etc)
There is currently no speed property in Game so create it and give it a number like 3
In Layer draw, pass the context as parameter and use drawImage on it with 5 parameters (drawImage has 3, 5 or 9 parameters)
Now create Background class, passing the game parameter and convert it to class property
The background layers you downloaded has a width of 1667 and height of 500(on ubuntu you can see it but on windows you probably need to use the browser console)
Once the background layers a downloaded you can bring them in the html using img tags
Once created, you can use getElementbyId or just use the Id to bring them as properties inside Background class
For now just create layer5 for now to test it out
Add layer5(\*\*author wrote layer1 might be a typo) and create new instance of Layer5 with the required parameters(for dy, pass 1 into it since there is no value for speedModifier yet, and for image, pass the layer5 property)
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
With the endless loop done for layer5, we will now add the remaining layers to create a parallax effect(each individual layer moving on its own speed)
Add the remaining layers into Background and create a new instance for each of them
Add the new instances into backgroundLayers array so forEach method can do it for all layers
You should see all 5 layers present on the canvas
Currently, all 5 layers have the same speedModifier(1) because you copy pasted them all
You can change that number around for each of them to see what fits your game
To apply logic to game, certain states should induce certain game speeds
For example, while sitting, game should stop moving instead of continuously scrolling
To do it, you need access to Game's speed property
One way is to bring the speed property into Player to modify speed values
Another way is to access it from setState method as a parameter, allowing all states to have access to it and change value separately for each individual state
We will use the latter so add speed as the second parameter in setState
Set Game's speed in setState to speed parameter so states can now use the property
We start in the sitting state so logically, Game's initial speed should be 0 instead of 3
In playerStates.js, include a number for each state switch in handleInput(0 for sitting, and positive numbers for the rest)
Using this method seems fine but notice that if you want to change the speed you have to go to each individual state and change the number which is tedious and not ideal
Instead, you can add an additional property in Game called maxSpeed and give it a number you want your game to be running
In setState, instead of setting game's speed to speed, set it to maxSpeed multiplied by speed
This way, you can just change the value in maxSpeed and not touch any values individually in the states js
Now, create enemies.js where we will store all enemy related info
Create Enemy class and we will use most of the properties just like Player, but without its states since we do not control enemies with inputs
Set frameX and Y to 0
Bring in fps, frameInterval and frameTimer to Enemy
Add custom methods, update and draw
We will be using subclasses with Enemy being the parent class
Create FlyingEnemy, GroundEnemy, and ClimbingEnemy child classes
Bring in the sprites for flying, ground(plant), and climbing(spider big) enemies in the html using the img tags
\*\*Missed it for the background layers, you will need to add them to css for display: none so they do not appear in html but rather from javascript. Do it for the enemies as well
With the above done, call super inside the constructor that has game parameter before converting game to class property(not calling it at the start will result in an error)
With parent and child classes, everything specific to the child class should be placed inside it and any properties that will be shared in all child classes will be placed in parent Enemy class
Width and height will be specific to each enemy class type
x and y positions will be different for each enemy type as well(for player you always start at the same place) so put it inside child classes
For FlyingEnemy, xy will be 200 each which is roughly top right since flying
Add speedX property(horizontal speed) and set it to 2
Add maxFrame and check the number of sprites(6 in this case so 5)
Add image property and point it towards the appropriate image for each child class
\*\* something to note, you can extend into FlyingEnemy because you may have other flying enemy types like birds, bats etc so FlyingEnemy will become the parent in this case and unique properties such as width and height will be moved into those sub-sub classes instead
Inside Enemy update, add a movement section
In said section, increase x by speedX and increase y by speedY
Just like Player, we will use deltaTime(we created fps, frameInterval, frameTimer before) to calculate when a frame should be served
Place the condition that you did in sprite animation inside Enemy update as well
In Enemy draw, pass in context parameter, and call drawImage using all 9 parameters(For simplicity, put in the image, dx, dy, dw, and dh first before the source because the former 5 are direct values from your properties while source requires some thinking/calculations)
For Player, you have frameY calculations because you have columns and rows in your sprite sheet but enemies only has 1 row so no frameY calculations
With the above done, we move on to FlyingEnemy update method where we will again call super to its parent class' update then write code that will be specific to FlyingEnemy
You will need to pass deltaTime to FlyingEnemy's update as well
Before continuing, import/export the child classes to main.js
You will not instantiate in Game because you will creating multiple enemies and not just once
Add custom method addEnemy to Game and create an enemies property with an empty array
In the newly created addEnemy method, call push method on enemies array and push in an instance of FlyingEnemy with the required parameter
In Game update, add a section for handleEnemies
We will need some helper properties to time the enemies being added into enemies array
In Game, add enemyTimer and set it to 0
Add enemyInterval and set it to 1000(every 1 second)
In handleEnemies section, when enemyTimer is more than enemyInterval, call addEnemy, and set enemyTimer back to 0, else, increase enemyTimer by deltaTime
console.log enemies in addEnemy to see if it is working
In Game update, call forEach on enemies array and for each enemy, call update on enemy(required parameter)
Do the same in Game draw but for draw with its parameter
In Enemy update, change plus x to minus x by speedX to move from right to left
You are not seeing anything yet because y is not a number if you check the properties in FlyingEnemy and javascript has no idea where to draw on the canvas
It is not a number because speedY is not defined in FlyingEnemy(but we did it for speedX so OOPSIE)
Create speedY in FlyingEnemy and set it to 0
You should see them spawning now
Instead of spawning from a random coordinate you hardcoded, spawn it on the right side of the canvas by setting x to game width
For y, you want them to spawn on the top half of the canvas randomly, so set y to a random number between 50%(0.5) and game height
Now, we want to remove enemies as they move offscreen so they do not bloat my enemies array
in Enemy update, add a offscreen check section
In this section, when x plus width is less than 0(enemy sprite moves offscreen completely), set markedForDeletion to true
This markedForDeletion property will be shared across child classes so put it in the parent Enemy class and set its initial value to false
In Game update, you are cycling through the enemies array and in each array item you are triggering its update method
In this forEach method, check if enemy's markedForDeletion is true, and if so splice the enemy off the array (splice(index, how many))
Check console.log enemies in addEnemy and if enemies are being removed when offscreen, the code works
We can randomise the movement speeds of an enemy type by randomising the numbers in speedX
You can also randomise the spacing of x positions so enemy spawns are randomly closer or further apart(For x you will need to add the randomised number multiplied by width as you need to take into account the horizontal space that the sprite takes up as well)
When player starts moving, you will notice that the game speed is inversely affecting enemy's movement which means you will need to take game speed into account inside horizontal movement of the enemy(x is moving to the left as it's being deducted by speedX in movement section, so to account for game speed you want to add it)
What if you want flying enemies to fly in an irregular fashion instead of just straight?
Since this only applies to flying enemies, you can add angle and veloAngle(velocity of angle) helper variables in FlyingEnemy to calculate this movement angle
Set angle to 0
set veloAngle to a random number betweeen 0.1 and 0.2
In FlyingEnemy update, increase angle by veloAngle
Then, increase y by the Math.sin of angle(this will map y position along a sine wave)
For GroundEnemy, write the starting properties specific to it just like FlyingEnemy
Set x to game width, making them spawn on the edge of right canvas
Set y to game height minus the height of the sprite so it spawns on the x-axis(\*MINUS GAME GROUNDMARGIN AS WELL TO SPAWN ON THE GROUND LAYER BACKGROUND)
Link the image and set speedX and Y to 0(because plants don't move)
Only 2 sprites so set maxFrame to 1
If we do not declare an update method for GroundEnemy child class, it will automatically look for update method in its parent class
The logic for ground enemy spawns that do not move should be: we move it spawns, we don't move, it doesn't spawn
To do that, we only want plant enemy to spawn when game speed is more than 0 AND in a randomised fashion, so a randomised number between 0 and 1 less than 50% of the time
In addEnemy, check if game speed is more than 0 AND a randomised number between 0 and 1 less than 50% of the time(or equals to to make it an exact 50/50), then push a new instance of ground enemy into enemies array
With the above done, we move to ClimbingEnemy and add the necessary specific properties pertaining to it
x will be game width(spawns on right edge of canvas)
y will be a random number between 0 and game height but only on the top half(random multiply by game height multiply by 0.5)
Link the image
Set speedX to 0(no horizontal movement)
Give speedY a ternary operation -> Is it a random number between 0 and 1 and is it more than 0.5?(again you can put more than or equal to for exact 50/50) if so value is 1, if not value is -1(This means 50% of the time the spider will move down(positive) or up(negative))
6 spider sprites so maxFrame is 5
Just like FlyingEnemy, ClimbingEnemy will have its own update method because you want to control the way it moves
Create custom update method and call update on super with required parameter for ClimbingEnemy
Unlike the previous two child classes, ClimbingEnemy will have its own draw method so create it
In addEnemy, after a new instance of GroundEnemy, add an else if of the same check but without the AND condition(speed > 0), push a new instance of ClimbingEnemy in enemies array
This way, every second you get a FlyingEnemy and a plant(<50%) or spider
ClimbingEnemy has an extended update method because you want the spider to climb up and down which is specific to it
In ClimbingEnemy update, if y is more than the game height minus height of spider, and offsetting it by game groundMargin(meaning if spider touches the ground layer), set speedY to negative(multiply speedY by -1)
Currently, we only remove sprites that move offscreen horizontally but not vertically
This is specific to spider enemies so in ClimbingEnemy update, add the condition when y is less than negative height(upwards and offscreen), set markedForDeletion to true
We have a custom draw method for ClimbingEnemy because it will have a thread extending when it moves down(because spiders don't float)
In ClimbingEnemy draw, call beginPath on the canvas(remember when canvas is mentioned it means context)
beginPath will initiate the point where you will start drawing(like placing a point of your pencil on a paper but not moving)
Call moveTo on canvas now and give coordinate 0 for xy for now
Call lineTo on canvas and give coordinates of ClimbingEnemy's xy position
Call stroke on canvas to draw it
Running your game, you should now see a line extending from top left corner(0, 0 coordinate start) to the spider
Replacing 0 in x of moveTo to ClimbingEnemy's x will put the line on the left edge of spider
To center the line, add a width divided by 2(50% of width) so the line appears at the middle of ClimbingEnemy
The line will now extend from middle of x from the top to the left edge
To cut it down straight to the middle, add the width divided by 2 to lineTo's x as well so both x starting and ending positions are aligned
You can see the line is not touch the spider, so you can extend the line downwards by adding a number to y position of ending position(lineTo) till it touches the spider
With the above done, we will tackle collision detection
In InputHandler, remove the console.logs
In its keydown event, add an else if the key pressed is d, set debug property in game to its reverse(so if it's true set it to false, and vice versa)
In Game, create and set debug property to true
In Player draw, set a condition where is game's debug is true, use strokeRect method on canvas with player's x, y, width, and height parameters passed
This will draw a transparent rectangle with an outline around the player sprite
To have the d key debug key work to on and off(true or false), you will need to link the InputHandler with the game, so pass the game argument into InputHandler and convert it to class property
With that change, input in Game should have the game parameter as well so pass it into its instance
Pressing d should now add or remove the outline on player sprite
Once the above works, in Enemy draw, apply the debug condition and strokeRect method to its canvas with the same parameters just like in Player draw
Notice that it works even without reference to the game because your child classes are referencing them already
With the rectangles in place, we will now create a helper method to check collision
In player.js, add checkCollision custom method and inside we will cycle through enemies array that holds currently active(on canvas) objects
Use forEach method on enemies array and for each enemy check for a condition where collision is detected(both rectangles touch or overlap) and else condition where there is no collision
For the first condition, if enemy's x is less than player's x plus player's width AND if enemy's x plus enemy's width is more than player's x(this would only check for their horizontal positions and to collide means the y position is also affected) AND if enemy's y is less than player's y plus player's height AND if enemy's y plus enemy's height is more than player's y --> Only when all these are true, there is collision(set markedForDeletion for enemy to true), also increment game's score(which we have not made)
Add score property in Game and set it to 0
In Player update, place the newly created checkCollision method and call it at the start of the update
In the browser, when player's rectangle touches enemy's rectangle, enemy should disappear
For score display, we'll need an additional js for User's Interface(UI)
Create new js file called UI.js
Create class UI and reference game and convert it to class property
Give the UI fontsize of 30, fontFamily of Helvetica(these could be adjusted to your preference)
Create custom UI draw method and reference the canvas(context)
In UI draw, set font on canvas with its fontSize plus px text plus fontFamily
Align text to the left
Apply fillStyle on canvas and set it to the game's fontColor(which is not yet made)
In Game, add fontColor property and set it to black
Back to UI draw, add a score section and use fillText(text, x, y, maxwidth) method on canvas
Export/import UI to main.js
Add UI property and create a new instance of UI
In Game draw, use the draw method on UI with the required reference
You should now see score and it increases whenever you remove an enemy with player
To further expand upon player actions, we will now add rolling state, diving state, and a hit state(damage taken state)
In states object, add the rolling, diving and hit states
Create or copy paste a pre-existing state child class and rename it to ROLLING and do the necessary changes to super and frames
To enter rolling state, we want to assign a special key to it
\*\*In the video, author uses enter but i mean for convenience i feel spacebar fits better because the arrow keys on a keyboard are on the right so you want your left hand to be activating the roll state
In rolling state's handleInput, check if input does not include 'spacebar'(spacebar in javascript e.key property is just literal spacebar i.e " ") AND player is on ground --> setState to running
Else, if input does not include 'spacebar' AND player is not on ground --> setState to falling
Enable rolling states in sitting, running and during a jump by adding an else if input includes the key of your preference(mine was spacebar, author was enter), setState to rolling
You want rolling state to be faster so put a number higher than your running, jumping and falling states(i.e if the speed parameter in your states are 1, you should pick something like 2 for rolling)
\*\* I also want player to be able to jump from sitting state, so i'll add the up arrow key condition and setState to jumping
With the rolling state and the associated states you want done, import/export it to player.js
Add the new Rolling state to the states array and instantiate
\*\* Remember we added the enter key to input previously because author wants to use enter key for special moves, if you want to use other keys(like i used spacebar), you need to add it to input.js using OR operators with its other keys
Play around in your browser using the rolling state
Notice that you cannot jump while in rolling state because your rolling state's handleInput lacks this behaviour
To enter jumping state while rolling, you can add another else if to check if input includes your special moves key AND jump is pressed AND player is on ground, minus veloY of player by the value you used in your jumping state(or lower or higher depending on how you want your jumping rolls to behave)
Now you should be able to roll and jump at the same time
\*\* author did not implement it in falling state so when you fall you cannot enter rolling state, you can add the condition in your falling state if you want
Once you are done with all the state switches, let's add particle effects to certain actions done by players
Create particles.js and Particle class
No export on this class, reference game and convert to class property
Add markedForDeletion property and set it to false
Create Particle update method
Minus x by speedX and game's speed
Minus y by speedY
Keep multiplying size by 0.95(meaning keep reducing size by 5% over each update loop)
Add a condition where if size is less than half(0.5) set markedForDeletion to true
speedX, speedY and size is not defined because we are going to create child classes that will have them and each will have their own unique values and behaviours
Create 3 child classes: Dust, Splash, and Fire
In Dust, reference game, x and y(x and y is needed because particles will be generated from the player's position)
Add super and its required reference from the parent class
Set size to a random number between 10 and 20
Convert x and y to class properties
Set speedX and Y to a random number between 0 and 1(default)
Set color to black
Add Dust draw custom method and its canvas reference
Use beginPath method on canvas to begin drawing
Use arc on canvas passing in xy coordinates, radius of size property, start angle of 0, end angle of Math.PI multiply 2(full circle)
Use fillStyle on canvas and set it to color property
Use fill on canvas to draw it
To access particles.js, you will need to access it by importing it to main.js BUT it makes more sense to import it to playerStates.js because the particles appear on different states and not just from the player
You will need to gain access to Game class in the playerStates.js so you will need to refactor some code
Import/export Dust to playerStates.js
In State parent class, add game as a second reference and convert it to class property
You can start replacing the references in the child states from player to game because referencing game will give you access to player
You will also need to change class properties and codes that reference only player to game's player
Your super calls in each state must also include game reference now
If you do the above, you do not need to convert game reference to class property in the child classes, you can just do it once in the parent state
\*\*In VS Code, you can highlight text and ctrl + d and keep tapping d to highlight text that has the same spelling --> useful for multiple changes
Once you are done with sitting state move on to the rest and do the relevant changes from player to game
Once all the refactor is done in playerStates, move to player.js
Your code will now break because Player has references to itself which playerStates now point towards Game instead so change the instances of playerStates in states array to point towards the game instead(this.game)
You will get a new error because the game is not completely loaded with the new refactor but you are triggering it using the enter method on currentState in player
To fix it, move the currentState property and the call of enter on currentState to Game instead
You will need to reference it from player class so all currentState code in Game must point it towards player
Your game should now work again after the refactor and changes made, and now you can add particles effects more 'cleanly'
Remove/Comment any previous console.logs if you want to get a clean console
You want to hold particles items in an array so add a particles property in Game and assign it an empty array
Back in playerStates.js, you want to create dust particles in running state so go into that state, and in its handleInput, push a new instance of Dust into the particles array you created in game
The instances of Dust will require game, x, and y references so pass in the game, and the game's player's positions because you want to generate dust particles from the player's position
In Game update, add a new section called handle particles
In handle particles section, call the forEach method on particles array and for each particle, call its update method
If markedForDeletion property in particle is true, use splice on the array to remove it
You will need the index to splice it so in the arrow function in the forEach method add a second reference of index
With the newly added index, splice particles at index and remove 1 array item
In Game draw, use the forEach method on the particles array and for each particle, call its draw method with the required reference
You should see 'dust' particles forming on the top left of the rectangle of the player's sprite
Just like the line attached to the spider, we want to adjust where the 'dust' appears on the player sprite
In playerStates.js, center the dust particles on the x axis by adding half of width to player's x position in the push method in running state
The dust particles should appear in the middle, at the top of the rectangle of player's sprite
To move it on the opposite side(below), add the player's height to the y parameter in the push method(remember positive in y is downwards negative is upwards)
In Dust class, you can adjust color using its property(rgba etc)
We will now tackle Fire particles(download and move file into folder)
Link the image in the html and add it in the display: none css
Back to particles.js, add the references just like you did for dust
Call super with game reference, convert the references to class properties(except game which is already in super), link the image, add size property(it's just radius) and give it a random number between 50 and 150
Add speedX and Y and set them to 1 for now
Create Fire update method and call its parent's update using super
Create Fire draw method with its reference and call drawImage on said reference
In drawImage, pass 5 parameters using size property for dw and dh
In playerStates.js, we want the Fire particles to appear in rolling state, so do the same push method you did for dust but this time, for fire in rolling instead
Import/export Fire to playerStates
Fire particles should appear now when you roll
To make the Fire image appear to 'move', we will create a rotating fire image
Add angle property in Fire and set it to 0
Add veloAngle(velocity of angle) property in Fire and give it a random number between -0.1 and 0.1
In Fire update, increase angle by veloAngle
To make sure the above code only affects Fire particles, use save and restore method in Fire draw
Use translate method on canvas(you are converting default 0,0 position to the position you want into translate's position arguments)
Use rotate method on canvas, using angle as its reference and will rotate everything base on the translate's position you have defined
The translate and drawImage methods overlap due to the xy position
Translate has xy which pushing 0,0 to xy, while drawImage also does this but since xy is already defined in translate, drawImage will push the xy further into xy^2 position
To fix this, pass 0 into both dx and dy in drawImage since translate is basically doing the same thing as drawImage position wise
To center the fire particles, offset it in xy by half the width for x and half the height for y(in this case size property is your width and height)
To adjust the size of the fire particles, you can do it in Fire's size property
You can use Math.sin method like you did for your FlyingEnemies to achieve the wobble
To do this, increase x by Math.sin with the angle reference multiplied by a number. This along with the increment angle code you wrote before will create a sine wave
To adjust the shrink timing of the particles, you can tweak it in Particle update's size multiplication factor
With particle effects, you want to limit them so they do not hamper your performance(because being able to play is more important than just fancy particles lagging your game)
In handle particles section, if the length of particles' array is more than 50, slice any array items beyond 50(so slice(0, 50))
Now, we HATE hardcoded values and try to place them with variables as much as possible
In Game, add a maxParticles property and set it to 50
In handle particles section, replace the 50s with maxParticles
Notice that slice removes the new particles rather than the old particles, resulting in your particle effects having gaps in between
To fix this you can either adjust your slice method or instead of push on particles array(adding new items at the end of an array), you can use unshift(adding new items at the start of an array) so slice will remove old particles before new particles beyond 50 array items
In running and rolling states, you can change the push methods to unshift methods
With the above change, the particle effects should have no 'pause' or gaps now
Now, let's allow the player to dive in the air vertically downwards
Create Diving class which you have added in the states object
Most of the code resides in the rolling state, so copy that and rename it to diving
Its enter method uses the same sprite sheet componenet as rolling so that remains
For its handleInput, when player is on the ground, set state to running
Also, when special move key is pressed AND player is on ground, set state to rolling
We will need to go to the other states now as there is currently no way to enter diving state
The most obvious state to enter diving state from is jumping, so add an else if condition if input arrow key down is pressed, set state to diving
Falling and rolling state should also be able to enter diving state to make the game more dynamic
\*\*speed of diving is currently 0, but it should be higher because you are dive-bombing vertically. It's a placeholder
Import/export diving class to player.js and add its instance in states array
In diving enter method, set veloY to a positive number to increase its diving speed
Notice after you dive, you clip pass the ground layer
In Player update, add a horizontal boundaries section below its movement, and a vertical boundaries section below its related section as well(For horizontal boundaries, the condition for x less than or more than something is calculating the left right boundaries so move that into horizontal boundaries)
To not allow player sprite to go below ground layer, check if y is more than game's height minus player's height minus game's groundMargin, if so, set y to that same position thus disallowing to go beyond ground layer
Now, move on to the last class in particles that is still empty, Splash
This particle effect will happen when the diving state touches ground, causing a shockwave(splash) that damages an area
Add the references in splash's constructor
Reference game in super call
Set the size property to a random number between 100 and 200
Convert xy to class properties
speedX will be a random number between -3 and 3(so the effect will 'splash' left and right)
speedY will be a random number between 2 and 4
Add gravity property and set it to 0(for creating a 'shockwave')
Link image to fire
Create update method in Splash and call update on super
Increase gravity by 0.1
Increase y by gravity
Create draw method with canvas reference in Splash
Use drawImage on reference using 5 parameters(remember size property(radius) is used as the width and height)
Import/export Splash to playerStates.js, alongside the other particle effects
For the 'splash' to occur, we want player sprite to be in diving state and when it hits the ground in that state
So go to diving state, and in the condition when it touches the ground, and state is switched to running, create the splash particles right after(unshift on particles array and instantiate splash with its proper references)
There is barely any visual feedback from splash so use a for loop with a limit of 30 and move the splash creation in it
You can adjust values in Splash class, and the xy references in splash to adjust how particles behave(although there should be a better way)
Once you are satisfied(or fed up) with the adjusting, you can move to the damage taken state(or hit state)
So for the hit state, create the class as usual with appropriate changes
So for the hit state, you will take damage,trigger the state, and once the state is done(looped through the hit state sprite sheet), you will automatically enter an appropriate state
To do this, since total horizontal hit state sprite has maxFrame of 10, in Hit handleInput, check for a condition where if frameX is more than or equals to 10 AND if player is on the ground, set state to running
Else if frameX is more than or equal to 10 AND player is not on the ground, set state to falling
Import/export hit to player.js and instantiate it in states array
Currently, all collisions will turn markedForDeletion to true
In checkCollision method, remove the idle else condition(not needed)
In its condition after markedForDeletion becomes true, add another if condition to check if the currentState is in rolling OR diving state(so index 4 and 5 in states array), increment game's score(move it from before inside this condition)
Else, set state to (6, 0) --> this means 6th index which is hit state, and 0 speed(not moving) with no score increment
Now that we have all(most?) of our collision states, we can create our collison animations
Create collisionAnimation.js and create the class
As usual, pass the references and convert game to class property, and link the image(boom sprite)
Set the spriteWidth and height accordingly(\*\*200 and 179, author uses 100 and 90 different sized sprite sheet)
Add sizeModifier property and randomised it between 0.5 to 1.5(\*\* i tweaked this value here because the image sprites i'm given is twice as large for some reason)
Add width property and set it to the multiplication between spriteWidth and sizeModifier(this is to randomise the collision animation size with its aspect ratio so no stretching occurs)
Do the same for height
You can only convert x and y references to class properties now because you need the width and height calculation you did prior
So, set x to x minus width times 0.5(to center it on the rectangle)
Do the same for y and its value using height(\*\*Author might have typo he uses width instead YEP IT WAS A TYPO)
Add frameX and set it to 0
Add maxFrame and set it to 4(total 5 sprites)
Add markedForDeletion and set it to false
Add CollisionAnimation draw method and reference the canvas
Use drawImage on refernce and pass in the full 9 parameters
Add update method to the above class and minus x by the game's speed(so collision animation syncs with the game's speed)
Import/export to player.js
Add collisions property to Game and give it an empty array
In checkCollision, whenever player collides with enemy(first condition), after setting enemy's markedForDeletion to true, push a new instance of CollisionAnimation with the required references to collisions array
For its positional references, make sure to center them
In Game update, add a handle collision sprites section
In this section, use forEach method on collisions array and for each collision and index, call update on collision with deltaTime reference, and if markedForDeletion in collision is true, splice 1 from that index
In Game draw, use forEach method and for each collision, call draw with required reference on collision
Colliding with enemies should now yield a static image on each enemy's position
Now we shall start animating the frames
In CollisionAnimation update, increment frameX
Then, if frameX is more than maxFrame, set markedForDeletion to true
Colliding with enemies should give you the animation now, albeit very fast because there is no limit
To limit it, we use deltaTime with the help of helper properties to time each animation frame
Reference CollisionAnimation update with deltaTime
Add fps property and set it to 15
Add frameInterval and set it to 1000(1sec) divided by fps
Add frameTimer and set it to 0
With the helper properties done, back to update and set a condition when frameTimer is more than frameInterval, increment frameX(or move the previous one you wrote in), set frameTimer back to 0
Else, increase frameTimer by deltaTime
You should see the collision animation frames now when colliding
You can give fps a random number instead of a fix number(any number above 50 will have the same result because there is a cap)
So instead of 15, you can give it a random number between 0 and 50(or anything in between) so the collision animation looks 'different' each time
In Game, set default debug value to false, so you don't see the collision rectangles when you first enter the game(you can always press d to toggle it)
We will now set a time limit from game start to game end
In Game, add time property and set it to 0
Add maxTime and set it to 2000
Add gameOver and set it to false
In Game update, increase time by deltaTime
And right after it, if time is more than maxTime, set gameOver to true
In animate, only invoke requestAnimationFrame when gameOver is false
After the above, your game should stop animating
In UI draw, create a timer section
In this section, use the font method just like you did before for score but multiply the fontSize by 0.8 this time
Use fillText method on reference and write the text for time
With timer section done, your game should start animating till the value of maxTime and then it stops
Add a game over messages section
In this section, if game's gameOver is true, textAlign to center, set the font to your preferences, use fillText(and a second set of fillText if you want to place a second message with different font, you'll need to adjust their placement using xy parameters in fillText) and set your winning messages in the middle of canvas(center them with width and height)
Once the above is working, you can now interact with game's score to display this message and allow animation to occur again(your game should still be static)
You can check if game's score is more than a number of your preference, run fillText of your winning messages(move the fillText you made for winning into this newly created condition)
Else, run fillText of your losing message(basically a second set of your winning messages but change them to losing messages instead)
maxTime is your game running time before it calculates your score and decide if you get a winning or losing message
Set maxTime to a number of your choice(remember javascript counts in milliseconds so use 1000 is 1 second)
Notice that your timer goes to decimal places and it is in the milliseconds
To convert it to seconds, in the fillText parameter for game time calculation, multiply the time by 0.001(multiplying 1000 by 0.001 which will move the decimal by 3 to the right resulting in 10) and use a toFixed javascript method of 1(which will force the numbers shown beside Time to be at 1 decimal place)
To make sure UI's draw method only applies to the text you wrote the code in and not spill to other objects(such as enemies and player), use save and restore method on the reference
Now, you can apply shadow built-in method inside UI draw so it only affects the text on the canvas with save and restore method in place
Use shadowOffsetX on reference and set it to 2
Do the same for shadowoffsetY
Use shadowColor on reference and set it to white
Use shadowBlur on reference and set it to 0
\*\*The above shadow built in method is similar to what you did when you added a second set of fillText and change the color to a contrasting color and moved the position slightly to create a shadow effect
Notice that when player takes damage(get hit), player can still move left and right
In Player update, under horizontal movement, add an AND operator to ArrowRight and ArrowLeft conditions and after that operator, add the condition that currentState is not the 6th state in the states array(meaning not the during the hit state)
The above will disable left and right movement when player is in hit state
When on the ground in rolling state, player is allowed to input ArrowDown which and since you cannot go below ground layer, it causes a weird 'bobbing' effect which is visible by looking at the particle effects going up down rapidly(due to diving state)
In rolling state, search for the condition on ArrowDown and add an additional condition where player is not on ground, then enter diving state
\*\* Everything below after this are changes or additions that are optional or bug fixes(for more practice)
We will swap backgrounds(from city to forest)
You can adjust the speedModifier parameter in your layers if you want
In Game, change value of groundMargin from 80 to a smaller number for a '3d' effect when player stands on the ground
Add creepster(or your preference) google font to html
Place it above your custom css file so it loads first before your css file
Add the font-family to your canvas in css so it can be drawn on your canvas
Now you can change the fontFamily of your UI to the google font of your choice
We want to add lives to the game so for each time player enters hit state, it loses a live
Download the associated lives image(heart or dog), and place it in your html and the id in css so it will not appear on the background
You will be drawing the lives image in your UI so link the image in your UI class
Lives will appear under timer(or wherever you please)
Add a lives section below your timer
In that section, use drawImage using 5 parameters(place it underneath timer for now and width and height will be hardcoded)
In Game, add lives property and set it to 5
Back in lives section, use a for loop with a limit of game's lives(5 in this case) and invoke the drawImage you just wrote in it
There are now 5 lives but you do not see it because they are stacked on top of one another
You will need to multiply the horizontal x position(dx) by the for loop(i)
To align it with the time and score, your hardcoded x position needs to be the same as your width(25) multiplied by the for loop and add 20px(the same x position as your score and time)
Once your lives appear properly, go to checkCollision method and in the condition where you set state to hit, after you get hit, decrement game's lives
After the decrement, check if game's lives is less than or equals to 0, if so, set gameOver to true
You should lose live when you enter hit state and game over message when you lose all lives
We will be adding a floating score to give you visual feedback when you score points
Create floatingMessages.js and its class
In the class, you will have 5 parameters, the value, original xy position, and the target xy position you want the text to move to
Convert value, original xy, and target xy to class properties
Set markedForDeletion to false
Add a timer and set it to 0
Add custom update and draw methods to it
In its update method, increase x by the target x position minus original x position
Do the same for y
Increment timer after the above
Check if timer is more than 100, and if so, set markedForDeletion to true
In its draw method, pass the required reference
Set the font to 20px and the google font you chose
You will now employ the method similar to the use of built-in javascript shadow method you did previously for your score and time(this was done in previous tutorials)
You will use fillStyle and fillText twice with constrasting colors and slightly modified xy positions to showcase a 'shadow' effect
For the first fillStyle, set it to white
First fillText, give it the value, and xy parameters
Second fillStyle black
Second fillText, give it the same value but give the xy parameters a slight offset(+2) to shift them slightly to bottom right and create a 'shadow' effect
Import/export FloatingMessage class to player.js
Inside checkCollision, when you gain score, you want floating message to appear towards your score
In Game, add a floatingMessages property with an empty array
Back to player.js you can now push a new instance of FloatingMessage class into floatingMessages array with the required references(value, original xy positions, and target xy positions)
Starting with value, you can put a +1 text in it
For original/starting xy positions, use enemy's xy positions
For target xy, use 0,0 for now
In Game update, add a handle messages section and in it, use a forEach method on floatingMessages and for each message, call its update method
\*\* You will not use splice now because it causes bugs which we will get to soon
In Game draw, also use forEach method and for each message, call its draw method
You can only see the bottom of the text because your target xy position is set to 0,0
You can see there is no animation and it just appears on 0,0 because javascript is going too fast
To slow it down, go to FloatingMessage update and for the increase in xy, multiply the calculation by 0.03(3%) so you can see the animation actually play out because you slow it down(before multiplying the calculation, remember to put parenthesis on the original calculation because you want those to calculate first before multiplying)
You should now see the +1s floating to your 0,0 position
You should adjust them so it floats next to your score to simulate your player earning points(you know the position of your score, go to UI)
Your +1s will accumulate beside your score as you did not splice or filter them
\*\*Speaking of splice, using splice is causing bugs in your game because the splice method is constantly pushing your object to the left before removing it(you can see it with ground enemies where they keep shifting on your ground layer but it is happening to every object uses splice)
\*\*Using filter will avoid this because you are setting the array property to filter all array items in the array with markedForDeletion set to false, thereby automatically removing them instead of adding to the array and then removing them
\*\*Author did not add a filtered arrays section so you add it
We will now change all splice methods you used previously to filter method
To start off, set floatingMessages to filter its array and for each message in it, check if markedForDeletion is false and filter will include those while removing the array items in which markedForDeletion is true
Do the same for enemies, particles, and collisions
In Player, add currentState property and set it to null(the refactor we've done before require us to move this property to Game class, this is just to make it clearer but the code will work the same with or without it)
Final tuning to the game's difficulty
Set maxTime in Game to 30000(30s)
Create and set winningScore to 40 in Game
In checkCollision, when entering hit state, you can decrease game's score by 5(or however much you want)
In game over messages section, instead of checking if gameScore is more than 5, check if it is more than the winningScore, then display the winning message
In main.js, enlarge the width(if you want) but don't touch the height because all height related stuff are optimized and changing it will mean you need to change nearly all calculations and backgrounds
\*\*Changed Diving speed parameter to 1 instead of 0 because i want the game to be constantly scrolling
Done! Finished video!
