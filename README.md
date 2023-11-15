# Team 90 Emotional Granularity Game App

The project is to make a game based on a singular emotion, in order to aid in improving the emotional granularity in an autistic child. The game is to be embedded inside of a larger app positioned toward helping parents improve their autistic child's emotional regulation.

## Getting Started

These instructions will guide you on setting up the project on your local machine for development and testing purposes.

## Prerequisites

### Install Node.js for JavaScript

- Install the latest LTS version of [Node.js](https://nodejs.org/) which will also include npm (Node Package Manager).

## Installation Steps
First we need to clone the repo and install all dependencies:

1. **Clone the repository:**
```bash
git clone https://github.com/ITProjectTeamBlue/EmotionalGranularityGame.git
npm install -g expo-cli
```

2. **Navigate to the cloned repository and install the project dependencies:**
```bash
cd EmotionalGranularityGame
npm install
```
## Development
To run the project, navigate to the directory and run one of the following npm commands. If a network connection error occurs, try and append `--tunnel` when running/starting the server.
1. **Navigate to the local folder** 
```bash
cd EmotionalGranularityGame
```

2. **Start the Expo project (Ensure you have Expo CLI installed):**
```bash
expo start # you can open iOS, Android, or web from here
```

3. **Download [Expo Go](https://apps.apple.com/app/expo-go/id982107779) from the iOS App Store.**

4. **Link with the QR Code displayed in CMD/Terminal**
    - Scan the QR code with Expo Go. Changes will be displayed instantly.
    - The app can be controlled from the command prompt.

## Development Guidelines

#### Purpose:

Coding standards are important to maintain consistent and readable code in team projects. For that reason, our coding standards' purpose is to work for us to improve our development process, rather than to slow us down with pedantic rules. Our coding practices should achieve 3 things:

**Readability:** It should be easy for all other team members to understand what your code is doing and how.

**Attribution:** It should be clear who worked on what.

**Maintainability:** Code should be neatly organised and planned out so that it is easy to refactor or modify if requirements change.

These coding standards can be changed over the course of the project, since we are all learning React Native and iOS development.


#### Folder Structure:

All folder names will be in lowercase letters (avoiding numbers and symbols) and one word as much as possible. If multiple words are needed to maintain clarity of the folders purpose, it should use as few words as necessary and use hyphens, no spaces. 
Folder names should also avoid redundancy; if the folder player-sprites is already in the folder sprites, we don’t to repeat “sprites”

**e.g.**
    src/assets/sprites, src/utils/quick-start, src/databases/user
    SRC/Assets/Sprites, src/utils/quick-start-functionality, src/databases/user-database



#### Files:

All file names will begin with a lowercase letter, contain only lowercase letters, numbers, hyphens, and dots; and end with the appropriate extension. File names should be descriptive but brief; not repeating anything described by the folder(s) it is in. Files should be placed in appropriate folders.

**e.g.**
    driver.js, assets/sprites/player.png, assets/tiles/bonus-tile2.png
    Driver.js, assets/sprites/player-sprite.png, assets/tiles/bonus tile 2.png



**Code files should begin with the following signature format:**

/*
DESCRIPTION: [1-4 sentence description on what this file does.]
DATE CREATED: [YYYY-MM-DD]
LAST MODIFIED: [YYYY-MM-DD], BY: [Firstname Lastname]

AUTHOR(S):
[Firstname Lastname]
[Brief outline of contribution to this file]

[Firstname Lastname]
[Brief outline of contribution to this file]

...

*/

Author’s contributions should generally follow a structure similar to:
Wrote: doThis(), doThat(). Modified: complexAlgorithm(). Bugfixed: parseText()


#### Comments:

Code should be thoroughly commented to ensure readability. Comments should be added at the developers' discretion, but in general:

All functions should be preceded by a comment describing what the function does. It should explain how it works if it is not immediately obvious. It should also outline clearly what input it is expecting, and what output it is giving - along with any errors it might throw.

Code should be self-documenting, but if a segment of code is not clear in its purpose, a comment can be placed above the segment.

If a single line of code is unclear in its purpose, it should be refactored into multiple lines to improve readability. If this is not possible, an in-line comment should be placed and appropriately spaced. In-line comments are a last resort, and reserved for things like: i = 0x5f3759df - ( i >> 1 );     // Bit shift trickery

Non-complete code should be clearly commented, preferably with a description of what needs to be done. These comments are not a substitute for the Agile Board, but to notify developers if a function isn’t fully functional yet.

Any borrowed code should be clearly labelled with: where it came from, a link or source, which lines are borrowed, any modifications made

Long descriptions above functions should use /* */ commenting, while shorter comments should use //.
All comments should begin with a space // like this and not //like this.
Long descriptions should use full sentences and proper punctuation - make it as easy as possible for other developers to understand.
Short comments can be abbreviated and dot-point style, but still understandable.


#### Variable/Function Names:

Variables and functions should be in camelCase, classes should be in PascalCase, constants should be in SCREAMING_SNAKE_CASE.

Variable and function names should be descriptive, brief, and consistent. This is mostly up to the developers' judgement but they should aim to be these 3 things. Here are some notes to consider:

Avoid ambiguity. intWidth is okay if it the width of something as an integer, but terrible if it is the interior width. x is ambiguous in most contexts, try width, posX, velX or accX.

Limit names to a few words. playerOneXPositionOffsetScaled is too hard to read.

Naming styles will naturally vary between developers, but keep consistency where possible within sections of code. If there already exists functions movePlayer(), checkPlayer(), and attackPlayer(),  consider calling your function hydratePlayer() instead of updatePlayerHydration(). If the function rollDie(difficultyModifier, low, high) already exists, consider choosing the function signature getQuestion(difficultyModifier, category) instead of getQuestion(category, difficultyModifier).

Acronyms and abbreviations are okay, as long as they avoid ambiguity and are easily recognisable. Acronyms should be capitalised if they are not the first or only word in the name. topUI is okay, but UI could be confused with a constant.



#### White-space:

Spaces should be placed between operations and variable (except unary operations) and after commas.

e.g.
    x = y + 4, x = 3 * (y + 5), array = [1, 2, 3, 4]
    x=3+4, x = 3 * ( y + 5 ), array = [1,2,3,4]



If lines of code become unreadable, they should be spread over multiple and broken after a comma or operator. The rule of thumb is 80 characters, but it up to the developers' judgement to decide.

e.g.
    

identity = [[1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1]];

var foo, bar, buz,
    qux, xyzzy, qwerty,
    fred, shaggy, scooby;

 

identity = [[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0], [0, 0, 0, 0, 1]];

var foo, bar, buz, qux, xyzzy, qwerty, fred, shaggy, scooby;



Conditionals, loops, functions, and class definitions should have a new line after the {. else and else if should be on the same line as both curly braces as such: } else {.

All other white-space choice will be determined by the auto-formatter of the IDE.



#### Miscellaneous:

String literals should be in single quotes

Each function should begin with a single comma-delimited var statement that declares all necessary local variables


## Testing

Currently, there are no automated tests for this application.



## Building

If you wish to build a standalone app for iOS or Android, please follow the [Expo's building documentation](https://docs.expo.dev/distribution/building-standalone-apps/).

## Libraries and Tools Used
Expo: Provides a way to develop and build React Native applications.

## Project Structure

### Key Directories and Files
/assets: Contains all the static files used in the game, such as images, audio files, and animations.

/levels: Houses the game levels and associated logic.

    GenericLevel.js: The template component for creating new game levels.
    LevelData.js: Configuration data for each level, including the board layout and other settings.
    PawnManager.js: Manages the game pawns and their movement.
    QuestionData.js: Contains the data for in-game questions.
    QuestionPromptLogic.js: Logic for presenting questions and handling answers.
    imagePreloader.js: Utility for preloading images to improve performance.

/screens: React components representing different screens in the game.

    LevelSelector.js: Screen for selecting a game level.
    LevelStartScreen.js: Introductory screen for each level.
    MainMenu.js: The main menu of the game.
    StartScreen.js: The initial screen presented on game start.
    WinScreen.js: Displayed when a player wins a level.

/src: Contains the core logic and helper functions.

    driver.js: Interface for the database interactions.
App.js: The root component of the application.



### Adding New Levels

To add a new level:

1. Update LevelData.js with the new level configuration, using the format:

```bash
    z (Level Number): {
    title: "Level Name",
    coordinates: [ [x,y] ],
    questionSquares: [ [x,y] ],    
    heartSquares: [ [x,y] ],
    boardDimensions: [x,y] 
    background: 
    startScreenBackground: 
    },
```
3. If necessary, create new assets and place them in the /assets directory.
4. Ensure the GenericLevel.js component can handle any new gameplay mechanics introduced by the level.

### Modifying Prompts
Changing Prompts: Edit QuestionData.js to update the questions and answers for the game prompts.
```bash
    Question Prompt Format:
    9 : {
    question : 'You lost a game that you practiced hard for. How do you feel?',
    answers : ['Frustrated', 'Indifferent', 'Joyous', 'Content'],
    answerScore : [3, 0, -1, 1]
    },
```
Updating Assets: Add new assets to the /assets folder and reference them in the respective level configuration files.

## Authors
- Yifei Wang - Project Owner 
- Zach Klimas - Developer
- James Fox - Scrum Master
- Joshua Blue - Developer
