var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game = (function () {
    function Game(output, input) {
        this.health = 20;
        this.parser = new Parser(this, input);
        this.out = new Printer(output);
        this.isOn = true;
        this.createRooms();
        this.printWelcome();
    }
    Game.prototype.createRooms = function () {
        var spawn = new Room("You are in a tiled room with a small puddle of blood on the ground, could it be your own?", "You see a lot of bloody handprints on the walls, you feel chills running down your spine.");
        var dark = new Room("You are in a dark small room, in the middle of the room are your glasses.", "You see a note lying in the corner of the room, it reads: ‘Help’ written in blood.");
        var tpDes = new Room("You hear something buzzing in the middle of the room.", "You see a round platform in the middle of the room, what could that be?");
        var hallway1 = new Room("You are in a small hallway.", "You wonder how big this basement is.");
        var hallway2 = new Room("You hear a beeping sound.", "You see a faint light coming from the southern door.");
        var teleporter = new Room("the door I just came through now suddenly looks different.", "it looks like a teleporter");
        var hallway3 = new Room("You see a small hallway with pictures of a little girl with dark hair. Are her eyes following me?", "You see a small puddle of blood near the southern door");
        var bodyRoom = new Room("You see a dead body lying on the floor.", "The dead body looks a lot like one of your friends you were with. There seems to be a keycard in the palm of the dead body’s hand.");
        var powerRoom = new Room("this seems to be an electricity room, I can see wires running all over the walls.", "I can also see a power switch. Should I flip the switch?");
        var hallway4 = new Room("You are in a small hallway, the light keeps flickering.", "You can see electricity wires running down the walls and going into the room to the north.");
        var pigRoom = new Room("the first thing you notice when you open the door to this room is the horrific smell. What on earth could that be.", "You see three gutted pigs. Disgusting!");
        var lockedRoom = new Room("this looks like a dead end", "there seems to be a door that can be unlocked with a keycard, it doesn’t seem to be working.");
        var gate = new Room("You can see a unlocked gate with a broken lock.", "");
        var exit = new Room("You can see light coming from the door to the east. Could this mean freedom?", "");
        var deadEnd = new Room("this looks like a dead end. Will I ever find the exit?!", "In the corner of the room you see a sign with 'F*CK YOU' written on it.");
        var win = new Room("Congratulations! You win!", "Press f5 to play again.");
        spawn.setExits(null, hallway1, null, null);
        dark.setExits(null, hallway2, null, null);
        tpDes.setExits(null, null, hallway1, null);
        hallway1.setExits(tpDes, hallway3, hallway2, spawn);
        hallway2.setExits(hallway1, bodyRoom, teleporter, dark);
        teleporter.setExits(tpDes, null, null, null);
        hallway3.setExits(null, hallway4, bodyRoom, hallway1);
        bodyRoom.setExits(hallway3, null, null, hallway2);
        powerRoom.setExits(null, null, hallway4, null);
        hallway4.setExits(powerRoom, pigRoom, null, hallway3);
        pigRoom.setExits(null, deadEnd, lockedRoom, null);
        lockedRoom.setExits(null, null, gate, null);
        gate.setExits(null, exit, null, null);
        deadEnd.setExits(null, null, null, pigRoom);
        exit.setExits(null, win, null, null);
        this.currentRoom = spawn;
    };
    Game.prototype.printWelcome = function () {
        this.out.println();
        this.out.println("You wake up, the last thing you remember is that you were partying with your friends.");
        this.out.println("You suddenly wake up in what feels like a basement.");
        this.out.println("You feel a burning pain in your lower abdomen, you see a big cut in your lower abdomen");
        this.out.println("You’re bleeding and need to hurry.");
        this.out.println("When you stand up you notice you don’t have your glasses anymore and you can barely see anything.");
        this.out.println();
        this.out.println("Type 'checkhealth' to see how much HP you have left.");
        this.out.println("Type 'help' if you need help.");
        this.out.println();
        this.out.println(this.currentRoom.description + ' ' + this.currentRoom.detailedDescription);
        this.out.println();
        this.out.print("Exits: ");
        if (this.currentRoom.northExit != null) {
            this.out.print("north ");
        }
        if (this.currentRoom.eastExit != null) {
            this.out.print("east ");
        }
        if (this.currentRoom.southExit != null) {
            this.out.print("south ");
        }
        if (this.currentRoom.westExit != null) {
            this.out.print("west ");
        }
        this.out.println();
        this.out.print(">");
    };
    Game.prototype.gameOver = function () {
        this.isOn = false;
        this.out.println("Game over!");
        this.out.println("Thank you for playing.  Good bye.");
        this.out.println("Hit F5 to restart the game");
    };
    Game.prototype.goRoom = function (params) {
        if (params.length == 0) {
            this.out.println("Go where?");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.out.println("There is no door!");
        }
        else {
            this.currentRoom = nextRoom;
            this.out.println(this.currentRoom.description + ' ' + this.currentRoom.detailedDescription);
            this.out.print("Exits: ");
            if (this.currentRoom.northExit != null) {
                this.out.print("north ");
            }
            if (this.currentRoom.eastExit != null) {
                this.out.print("east ");
            }
            if (this.currentRoom.southExit != null) {
                this.out.print("south ");
            }
            if (this.currentRoom.westExit != null) {
                this.out.print("west ");
            }
            this.out.println();
        }
        return false;
    };
    return Game;
}());
var Item = (function () {
    function Item() {
    }
    return Item;
}());
var Parser = (function () {
    function Parser(game, input) {
        var _this = this;
        this.commands = {};
        this.game = game;
        this.input = input;
        this["default"] = new Default(game);
        this.commands["help"] = new Help(game);
        this.commands["go"] = new Go(game);
        this.commands["checkhealth"] = new Checkhealth(game);
        this.commands["quit"] = new Quit(game);
        input.onkeyup = function (e) {
            if (e.keyCode == 13 && _this.game.isOn) {
                var command = _this.input.value;
                _this.game.out.println(command);
                _this.parse(command.split(" "));
                _this.input.value = "";
                _this.game.out.print(">");
            }
        };
    }
    Parser.prototype.parse = function (words) {
        var wantToQuit = false;
        var params = words.slice(1);
        if (words[0] == "") {
            return;
        }
        var command;
        command = this.commands[words[0]];
        if (command == null) {
            command = this["default"];
        }
        wantToQuit = command.execute(params);
        if (wantToQuit) {
            this.input.disabled = true;
            this.game.gameOver();
        }
    };
    return Parser;
}());
var Printer = (function () {
    function Printer(output) {
        this.output = output;
    }
    Printer.prototype.print = function (text) {
        this.output.innerHTML += text;
    };
    Printer.prototype.println = function (text) {
        if (text === void 0) { text = ""; }
        this.print(text + "<br/>");
        this.output.scrollTop = this.output.scrollHeight;
    };
    return Printer;
}());
var Room = (function () {
    function Room(description, detailedDescription) {
        this.description = description;
        this.detailedDescription = detailedDescription;
    }
    Room.prototype.setExits = function (north, east, south, west) {
        if (north != null) {
            this.northExit = north;
        }
        if (east != null) {
            this.eastExit = east;
        }
        if (south != null) {
            this.southExit = south;
        }
        if (west != null) {
            this.westExit = west;
        }
    };
    return Room;
}());
var Command = (function () {
    function Command(game) {
        this.game = game;
    }
    Command.prototype.execute = function (params) {
        return false;
    };
    return Command;
}());
var Checkhealth = (function (_super) {
    __extends(Checkhealth, _super);
    function Checkhealth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Checkhealth.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("healthcheck what?");
            return false;
        }
        this.game.out.println("you currently have" + " " + this.game.health + " " + "healthpoints");
        return false;
    };
    return Checkhealth;
}(Command));
var Default = (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.execute = function (params) {
        this.game.out.println("I don't know what you mean...");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("go quit help checkhealth pickup use");
        return false;
    };
    return Default;
}(Command));
var Go = (function (_super) {
    __extends(Go, _super);
    function Go() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Go.prototype.execute = function (params) {
        if (params.length == 0) {
            this.game.out.println("Go where?");
            return;
        }
        var direction = params[0];
        var nextRoom = null;
        switch (direction) {
            case "north":
                nextRoom = this.game.currentRoom.northExit;
                break;
            case "east":
                nextRoom = this.game.currentRoom.eastExit;
                break;
            case "south":
                nextRoom = this.game.currentRoom.southExit;
                break;
            case "west":
                nextRoom = this.game.currentRoom.westExit;
                break;
        }
        if (nextRoom == null) {
            this.game.out.println("There is no door!");
        }
        else {
            this.game.health--;
            this.game.currentRoom = nextRoom;
            if (this.game.health < 1) {
                return true;
            }
            this.game.out.println(this.game.currentRoom.description + ' ' + this.game.currentRoom.detailedDescription);
            this.game.out.print("Exits: ");
            if (this.game.currentRoom.northExit != null) {
                this.game.out.print("north ");
            }
            if (this.game.currentRoom.eastExit != null) {
                this.game.out.print("east ");
            }
            if (this.game.currentRoom.southExit != null) {
                this.game.out.print("south ");
            }
            if (this.game.currentRoom.westExit != null) {
                this.game.out.print("west ");
            }
            this.game.out.println();
        }
        return false;
    };
    return Go;
}(Command));
var Help = (function (_super) {
    __extends(Help, _super);
    function Help() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Help.prototype.execute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Help what?");
            return false;
        }
        this.game.out.println("You don't have much time left, hurry!");
        this.game.out.println("find the exit");
        this.game.out.println();
        this.game.out.println("Your command words are:");
        this.game.out.println("go quit help checkhealth pickup use");
        return false;
    };
    return Help;
}(Command));
var Quit = (function (_super) {
    __extends(Quit, _super);
    function Quit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Quit.prototype.excute = function (params) {
        if (params.length > 0) {
            this.game.out.println("Quit what?");
            return false;
        }
        else {
            return true;
        }
    };
    return Quit;
}(Command));
