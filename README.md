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
//Next is state management, notice in the previous state management we started off with multiple js files which makes life easier when adding or altering the codes inside without breaking the rest of the game. In this we did not start of with state management so there are alot of if else statements in Player for player movements which makes it messy
