# ProjectRed
A JavaScript based Game [Engine], under development. I started working on it because I wanted to make a game on HTML5. I looked at various engines but instead of using the pre-built engines I wanted to challenge myself and have some fun at the same time.

### Current Features :

1. Greedy algorithms for collision detection between circle and any closed polygon and it's response in position as well as velocities based on physical properties.
2. Physics processing which includes gravity, friction, and restitution. [Angular velocity depiction is not accurate yet, and accurate one doesn't look good either.]
3. JSON sprite input which allows maximum flexibility and easy stage creation.
4. Menu System with various text animations, mainly enter, emphasis and exit transitions.
5. Sprite caching, i.e, keeps only one copy of texture for multiple sprites separately.
6. Implementation of multiple layers, static and dynamic to improve performance.
7. And More...

### Current Bugs Found :

1. High speed collision for complex polygons in specific cases is not working correctly. The solution I have might make the code more complex and less efficient, so debugging of this one is halted for now.
2. Let me know...

### Current Limitations :

1. Collision detection limited to Circle With Polygons.
2. Collision response and detection (detection will work though) is not implemented for dynamic (with physics on) sprites, i.e, two dynamic sprites with physics turned on won't be detected by the collision system and response is not appropriate yet.
3. Single screen stage, i.e., no camera movement.

### Current Controls :

- Left Arrow : To impart velocity towards left.
- Right Arrow : To impart velocity towards right.
- Space : To impart velocity upwards if in contact.
- Control : To impart velocity downwards.
- Shift : To increase the velocity imparted.
- X : Speed up time, i.e., increase time delta.
- Y : Slow down time, i.e, decrease time delta.