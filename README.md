# ProjectRed
A JavaScript based Game [Engine], under development.

### Current Features :

1. Greedy algorithms for collision detection between circle and any closed polygon and it's response in position as well as velocities based on physical properties.
2. Physics processing which includes gravity, friction, and restitution. [Angular velocity depiction is not accurate yet, and accurate one doesn't look good either.]
3. JSON sprite input which allows maximum flexibility and easy stage creation.
4. Menu System with various text animations, mainly enter, emphasis and exit transitions.
5. And More...

### Current Bugs Found :

1. High speed collision for complex polygons in specific cases is not working correctly. The solution I have might make the code more complex and less efficient, so debugging of this one is halted for now.
2. Let me know...

### Current Limitations :

1. Collision detection limited to Circle With Polygons.
2. Collision response and detection (detection will work though) is not implemented for dynamic (with physics on) sprites, i.e, two dynamic sprites with physics turned on won't be detected by the collision system and response is not appropriate yet.
3. Single screen stage, i.e., no camera movement.