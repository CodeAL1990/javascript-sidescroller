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
//Input next
