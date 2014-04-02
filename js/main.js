/**
	LD48 (c)'Florian Fischer^SiENcE^crankgaming.blogspot.com
*/
var jsApp	=
{
	//	Initialize the application
	onload: function()
	{
		//debug
//		me.debug.renderHitBox = true;
		
		// init the video
		if (!me.video.init('jsapp', 640, 400, false, 2.0))	//scale by 2
//		if (!me.video.init('jsapp', 1024, 600, true, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
         return;
		}
	
		// initialize the "sound engine"
		me.audio.init("mp3,ogg");
		
		//me.audio.disable();
		
		// set all ressources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all ressources to be loaded
		me.loader.preload(g_ressources);
		
		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},

	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Menu" Screen Object
		me.state.set(me.state.MENU, new TitleScreen());
		
		// set the "Instructions" Screen Object
//		me.state.set(me.state.READY, new InstructionScreen());
	
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
			
		// set the "Game Over" Screen Object
		me.state.set(me.state.GAMEOVER, new GameOverScreen());

		// set the fade transition effect
		me.state.transition("fade","#FFFFFF", 250);
		
		// disable transition for the GAME OVER STATE
		me.state.setTransition(me.state.GAMEOVER, false);
		
		me.sys.gravity = 0.75;
		
		// add player entity to pool
		me.entityPool.add("playerspawnpoint", PlayerEntity);
		// add dnaentity to pool
		me.entityPool.add("dnadentity1", DnaEntity1);
		// add dnaentity to pool
		me.entityPool.add("dnadentity2", DnaEntity2);
		// add dnaentity to pool
		me.entityPool.add("dnadentity3", DnaEntity3);
		// add dnaentity to pool
		me.entityPool.add("dnadentity4", DnaEntity4);
		// add dnaentity to pool
		me.entityPool.add("dnadentity5", DnaEntity5);
		// add dnaentity to pool
		me.entityPool.add("dnadentity6", DnaEntity6);
		// add dnaentity to pool
		me.entityPool.add("dnadentity7", DnaEntity7);
		// add dnaentity to pool
		me.entityPool.add("dnadentity8", DnaEntity8);
		// add dnaentity to pool
		me.entityPool.add("dnadentity9", DnaEntity9);
		// add dnaentity to pool
		me.entityPool.add("dnadentity10", DnaEntity10);
		// add dnaentity to pool
		me.entityPool.add("dnadentity11", DnaEntity11);
		// add dnaentity to pool
		me.entityPool.add("dnadentity12", DnaEntity12);
		// add dnaentity to pool
		me.entityPool.add("dnadentity13", DnaEntity13);
		// add dnaentity to pool
		me.entityPool.add("dnadentity14", DnaEntity14);
		// add dnaentity to pool
		me.entityPool.add("dnadentity15", DnaEntity15);
		// add dnaentity to pool
		me.entityPool.add("dnadentity16", DnaEntity16);
		// add dnaentity to pool
		me.entityPool.add("dnadentity17", DnaEntity17);
		// add dnaentity to pool
		me.entityPool.add("dnadentity18", DnaEntity18);

		// add enemy entity to pool
		me.entityPool.add("enemyentity", EnemyEntity);
		// add final enemy entity to pool
		me.entityPool.add("enemyentity20", EnemyEntity20);
/*
		// create a gamestat (to have persistent hiscore during the game )
		var highscore = this.readHiScore();
		if (highscore == -1)
		{
			highscore = 18;
		}
		else
		{
			highscore = this.readHiScore();
		}
		me.gamestat.add("hiscore", highscore);
		me.gamestat.add("score", 0);
*/
		// define a function that display pause
		me.state.onPause = function ()
		{
			// get the current context
			var context = me.video.getScreenFrameBuffer();
			
			// create a black & white copy of the background
			var background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
			
			// draw the background
			context.drawImage(background.canvas, 0, 0);

			//draw a black transparent square
			context.fillStyle = "rgba(0, 0, 0, 0.8)";
			context.fillRect(0, (me.video.getHeight()/2) - 30, me.video.getWidth(), 60);

			// create a font (scale 3x)
			var font = new me.BitmapFont("atascii_48px", 48, 1);
			font.set("left");
			// get the text size
			var measure = font.measureText("P A U S E");
			// a draw "pause" ! 
			font.draw (context, "P A U S E", 
					   (me.video.getWidth()/2) - (measure.width/2) , 
					   (me.video.getHeight()/2) - (measure.height/2));

		};

		// go to the main menu
		me.state.change(me.state.MENU);
	},

	//   write the hiscore in localstorage
	writeHiScore : function (val)
	{
		if (me.sys.localStorage)
		{
			try 
			{	
				//saves to the database, "key", "value"
				localStorage.setItem("toe_hiscore", val); 
			} 
			catch (e){
				//sthg went wrong
			}
		}
	},
	
	//   read the hiscore from localstorage
	readHiScore : function ()
	{
		if (me.sys.localStorage)
		{
			try 
			{	
				//get the database value
				return (localStorage.getItem("toe_hiscore") || -1); 
			} 
			catch (e){
				//sthg went wrong
			}
		}
		return -1;
	}

}; // jsApp

/* game initialization */
var PlayScreen = me.ScreenObject.extend(
{
   // we just defined what to be done on reset
   // no need to do somehting else
	onResetEvent: function()
	{
		// create a gamestat (to have persistent hiscore during the game )
		var highscore = jsApp.readHiScore();
		if (highscore == -1)
		{
			highscore = 18;
		}
		else
		{
			highscore = jsApp.readHiScore();
		}
		me.gamestat.add("hiscore", highscore);
		me.gamestat.add("score", 0);

		// load a level
		me.levelDirector.loadLevel("map0");
		
		// add a default HUD to the game mngr
		me.game.addHUD(0,0,640,80);
		
		// add a new HUD item 
		me.game.HUD.addItem("dnapool", new DnaPoolObject(10,10) );
		
		// make sure everyhting is in the right order
		me.game.sort();
		
		// play some music
		me.audio.playTrack("toe");
	},

	/*---
	
		the menu drawing function
	  ---*/
	onDestroyEvent : function()
	{
		// save the hiscore
		jsApp.writeHiScore(me.gamestat.getItemValue("hiscore"));
		
		// disable the HUD
		me.game.disableHUD();
		
		// unbind all binded keys
		me.input.unbindKey(me.input.KEY.LEFT);
		me.input.unbindKey(me.input.KEY.RIGHT);
		me.input.unbindKey(me.input.KEY.UP);
		me.input.unbindKey(me.input.KEY.DOWN);
		
		// stop the main sound track
		me.audio.stopTrack();
	}
});

/*---------------------------------------------------------------------

	A title screen

  ---------------------------------------------------------------------	*/

var TitleScreen = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true);
		// title screen image
		this.title = null;
		this.font =  null;
	},
	
	/* ---
		reset function
	   ----*/
	onResetEvent : function()
	{
		if (this.title == null)
		{
			// init stuff if not yet done
			this.title = me.loader.getImage("title");
			// font to display the menu items
			this.font = new me.BitmapFont("atascii_16px", 16, 1);
			this.font.set("left");
		}
  		
		me.ImageLayer("background", 640, 400, "background", -1, 10)

		// enable the keyboard
		me.input.bindKey(me.input.KEY.ENTER,	"enter", true);
	},

	/*---
		
		update function
		 ---*/
	update : function()
	{
		// enter pressed ?
		if (me.input.isKeyPressed('enter'))
		{
//			me.state.change(me.state.READY);
			me.state.change(me.state.PLAY);
			return true;
		}
		return false;
	},

	/*---
	
		the manu drawing function
	  ---*/
	draw : function(context)
	{
		context.drawImage(this.title,0,0);
		this.font.draw (context, "PRESS ENTER", 245, 360);
	},

	/*---
	
		the manu drawing function
	  ---*/
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
    },
});

/*---------------------------------------------------------------------

	A level complete screen
	
  ---------------------------------------------------------------------	*/

GameOverScreen  = me.ScreenObject.extend(
{
	init : function()
	{
		this.parent(true); // next state
		this.font  =  null;
		this.background = null;
	},

	//	reset function
	onResetEvent : function(levelId)
	{
		if (this.font == null)
		{
			// font to display the menu items
			this.font = new me.BitmapFont("atascii_16px", 16);
//			this.font.set("left",1);
		}

		// create a new canvas 
		this.background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");

		me.input.bindKey(me.input.KEY.ENTER, "enter");
		me.input.bindKey(me.input.KEY.ESC,	 "esc");
		
		// game over sound
//		me.audio.play("gameover");
	},

	//	update function
	update : function()
	{
		if (me.input.isKeyPressed('enter'))
		{
			me.state.change(me.state.PLAY);
		}
		else if (me.input.isKeyPressed('esc'))
		{
			me.state.change(me.state.MENU);
		}

		return true;
	},

	//	the menu drawing function
	draw : function(context)
	{
		// draw the background
		context.drawImage(this.background.canvas, 0, 0);
		
		// save the current context
		context.save();

		this.font.draw (context, "TOP RANK", 175, 10);
		// we need to add 1 ... otherwise place 0 is the best
		var toprank = parseInt(me.gamestat.getItemValue("hiscore"))+1;
		this.font.draw (context, toprank, 175+40, 10);
		
		this.font.draw (context, "RANK", 310, 10);
		// we need to add 1 ... otherwise place 0 is the best
		console.log(me.gamestat.getItemValue("score"));
		var rank = parseInt(me.gamestat.getItemValue("score"))+1;
		this.font.draw (context, rank, 310+40, 10);
			
		// restore context
		context.restore();

		this.font.draw (context, "PRESS ENTER TO RETRY", me.video.getWidth()/2+150, 315);
	},

	//	the manu drawing function
	onDestroyEvent : function()
	{
		me.input.unbindKey(me.input.KEY.ENTER);
		me.input.unbindKey(me.input.KEY.ESC);
	}
});

	/**
	 * A class skeleton for "Screen" Object <br>
	 * every "screen" object (title screen, credits, ingame, etc...) to be managed <br>
	 * through the state manager must inherit from this base class.
	 * @class
	 * @extends Object
	 * @memberOf me
	 * @constructor
	 * @see me.state
	 * @example
	 * // create a custom loading screen
	 */
/*
var CustomLoadingScreen = me.ScreenObject.extend(
{
// constructor
    init: function()
    {
       // pass true to the parent constructor
       // as we draw our progress bar in the draw function
       this.parent(true);
       // a font logo
       this.logo = new me.Font('century gothic', 32, 'white');
       // flag to know if we need to refresh the display
       this.invalidate = false;
       // load progress in percent
       this.loadPercent = 0;
       // setup a callback
       me.loader.onProgress = this.onProgressUpdate.bind(this);

    },

    // will be fired by the loader each time a resource is loaded
    onProgressUpdate: function(progress)
    {
       this.loadPercent = progress;
       this.invalidate = true;
    },


    // make sure the screen is only refreshed on load progress
    update: function()
    {
       if (this.invalidate===true)
       {
          // clear the flag
          this.invalidate = false;
          // and return true
          return true;
       }
       // else return false
       return false;
    },

    // on destroy event
    onDestroyEvent : function ()
    {
       // "nullify" all fonts
       this.logo = null;
    },

    //	draw function
    draw : function(context)
    {
       // clear the screen
       me.video.clearSurface (context, "black");

       // measure the logo size
       logo_width = this.logo.measureText(context,"awesome loading screen").width;

       // draw our text somewhere in the middle
       this.logo.draw(context,
                      "awesome loading screen",
                      ((context.canvas.width - logo_width) / 2),
                      (context.canvas.height + 60) / 2);

       // display a progressive loading bar
       var width = Math.floor(this.loadPercent * context.canvas.width);

       // draw the progress bar
       context.strokeStyle = "silver";
       context.strokeRect(0, (context.canvas.height / 2) + 40, context.canvas.width, 6);
       context.fillStyle = "#89b002";
       context.fillRect(2, (context.canvas.height / 2) + 42, width-4, 2);
    },
 });
*/

//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
