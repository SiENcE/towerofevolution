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
		if (!me.video.init('jsapp', 640, 400, false, 1.0))	//scale by 2
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
		
//		me.applyRGBFilter()
	},

	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		
		// set the fade transition effect
		me.state.transition("fade","#FFFFFF", 250);
		
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

		// switch to PLAY state
		me.state.change(me.state.PLAY);
	}
}; // jsApp

/* game initialization */
var PlayScreen = me.ScreenObject.extend(
{
   // we just defined what to be done on reset
   // no need to do somehting else
	onResetEvent: function()
	{	
		// load a level
		me.levelDirector.loadLevel("map0");
		
		// add a default HUD to the game mngr
		me.game.addHUD(0,0,620,30);
		
		// add a new HUD item 
		me.game.HUD.addItem("dnapool", new DnaPoolObject(390,10));
		
		// add a new HUD item 
		me.game.HUD.addItem("dnadesc", new TextObject(350,10));
		
		// make sure everyhting is in the right order
		me.game.sort();
		
		// play some music
		me.audio.playTrack("my_song6");
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
