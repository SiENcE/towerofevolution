/**
	LD48 (c)'Florian Fischer^SiENcE^crankgaming.blogspot.com
*/

	/************************************************************************************/
	/*		player																		*/
	/************************************************************************************/
	var PlayerEntity = me.ObjectEntity.extend(
	{	
		init: function(x, y, settings)
		{
//			this.settings=settings;
			
			// call the constructor
			this.parent(x, y , settings);
			
			this.setRespawnPosition(x, y);
			
			// walking & jumping speed
			this.setVelocity(3, 10);
			
			this.setFriction(2.2,0);
			
			// update the hit box
//			this.updateColRect(7,12, -1,0);
			this.updateColRect(5,14, 6,26);
			
			this.dying = false;
		
			// set the display around our position
			me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
					
			// enable the keyboard
			// walk
			me.input.bindKey(me.input.KEY.LEFT,	 "left");
			me.input.bindKey(me.input.KEY.RIGHT, "right");
			// jump
//			me.input.bindKey(me.input.KEY.X,	"fight", true);
			// go left & right
			me.input.bindKey(me.input.KEY.UP,	"up");
			me.input.bindKey(me.input.KEY.DOWN,	"down");

			// climbing animatin
			this.addAnimation ("climb", [0,1,2]);
			// walking animatin
			this.addAnimation ("walk",  [3,4,5]);
			// climbing animatin
			this.addAnimation ("dead", [6,7,8]);

			// set default one
			this.setCurrentAnimation("walk");
			
			// set animation layer
			me.gamestat.add("layer", 0);
			me.gamestat.add("lastlayer", 0);
		},
		
		//	update player
		update : function ()
		{
			var layer = me.gamestat.getItemValue("layer");
			var lastlayer = me.gamestat.getItemValue("lastlayer");

			if (!(layer == lastlayer))
			{
//				console.log(layer);
				me.gamestat.setValue("lastlayer", layer);
				//first part
				if (layer==1) { this.addAnimation ("climb",  [9,10,11]); this.addAnimation ("walk",  [12,13,14]); this.addAnimation ("dead",  [15,16,17]); }
				if (layer==2) { this.addAnimation ("climb",  [18,19,20]); this.addAnimation ("walk",  [21,22,23]); this.addAnimation ("dead",  [24,25,26]); }
				if (layer==3) { this.addAnimation ("climb",  [27,28,29]); this.addAnimation ("walk",  [30,31,32]); this.addAnimation ("dead",  [33,34,35]); }
				if (layer==4) { this.addAnimation ("climb",  [36,37,38]); this.addAnimation ("walk",  [39,40,41]); this.addAnimation ("dead",  [42,43,44]); }
				if (layer==5) { this.addAnimation ("climb",  [45,46,47]); this.addAnimation ("walk",  [48,49,50]); this.addAnimation ("dead",  [51,52,53]); }
				if (layer==6) { this.addAnimation ("climb",  [54,55,56]); this.addAnimation ("walk",  [57,58,59]); this.addAnimation ("dead",  [60,61,62]); }
				if (layer==7) { this.addAnimation ("climb",  [63,64,65]); this.addAnimation ("walk",  [66,67,68]); this.addAnimation ("dead",  [69,70,71]); }
				if (layer==8) { this.addAnimation ("climb",  [72,73,74]); this.addAnimation ("walk",  [75,76,77]); this.addAnimation ("dead",  [78,79,80]); }
				if (layer==9) { this.addAnimation ("climb",  [81,82,83]); this.addAnimation ("walk",  [84,85,86]); this.addAnimation ("dead",  [87,88,89]); }
				// second part
				if (layer==10) { this.addAnimation ("climb",  [90,91,92]); this.addAnimation ("walk",  [93,94,95]); this.addAnimation ("dead",  [96,97,98]); }
				if (layer==11) { this.addAnimation ("climb",  [99,100,101]); this.addAnimation ("walk",  [102,103,104]); this.addAnimation ("dead",  [105,106,107]); }
				if (layer==12) { this.addAnimation ("climb",  [108,109,110]); this.addAnimation ("walk",  [111,112,113]); this.addAnimation ("dead",  [114,115,116]); }
				if (layer==13) { this.addAnimation ("climb",  [117,118,119]); this.addAnimation ("walk",  [120,121,122]); this.addAnimation ("dead",  [123,124,125]); }
				if (layer==14) { this.addAnimation ("climb",  [126,127,128]); this.addAnimation ("walk",  [129,130,131]); this.addAnimation ("dead",  [132,133,134]); }
				if (layer==15) { this.addAnimation ("climb",  [135,136,137]); this.addAnimation ("walk",  [138,139,140]); this.addAnimation ("dead",  [141,142,143]); }
				if (layer==16) { this.addAnimation ("climb",  [144,145,146]); this.addAnimation ("walk",  [147,148,149]); this.addAnimation ("dead",  [150,151,152]); }
				if (layer==17) { this.addAnimation ("climb",  [153,154,155]); this.addAnimation ("walk",  [156,157,158]); this.addAnimation ("dead",  [159,160,161]); }
				if (layer==18) { this.addAnimation ("climb",  [162,163,164]); this.addAnimation ("walk",  [165,166,167]); this.addAnimation ("dead",  [168,169,170]); }
				
				// TOOD: make a ingame button to enable or disable this to choose difficulty
				this.setRespawnPosition(this.pos.x, this.pos.y);
				
				this.flicker(45);
				this.setCurrentAnimation("walk");
			}

			var doClimb = false;
			
			if (me.input.isKeyPressed('left'))
			{
				this.doWalk(true);
			}
			else if (me.input.isKeyPressed('right'))
			{
				this.doWalk(false);
			}
					
			if (me.input.isKeyPressed('up'))
			{
				if (this.doJump()) 
				{
					me.audio.play("jump", false);
				}
				doClimb = this.doClimb(true);
			}
			else if (me.input.isKeyPressed('down'))
			{
				doClimb = this.doClimb(false);
			}
/*
			if (me.input.isKeyPressed('fight'))
			{	
				if (this.doJump()) 
				{
					me.audio.play("jump", false);
				}
				
			}
*/
			// check for collision with environment
			var env_res = this.updateMovement();
			
			if (this.onladder)
			{
				// cancel residual y vel
				this.vel.y = 0;
				
				// make sure we have the right animation
				if ((doClimb || this.jumping) && this.isCurrentAnimation("walk"))
				{
					this.setCurrentAnimation("climb");
				}
			} 
			else if (this.isCurrentAnimation("climb"))
			{
				this.setCurrentAnimation("walk");
			}

							
			// check for collision with enemy
			var res = me.game.collide(this);
			
			if (res)
			{
				if (res.obj.type == me.game.ENEMY_OBJECT)
				{
				   if ((res.y>0) && !this.jumping)
				   {
					  this.forceJump();
				   }
				   else
				   {
					  this.die();
				   }
				}
				else if (res.obj.type == "trapObject")
				{
				   this.forceJump();
				   this.die();
				}
				else if (res.obj.type == "crossObject")
				{
				   this.dieCross();
				}
				else if (res.obj.type == "endObject")
				{
					me.state.change(me.state.GAMEOVER);
				}
			}
			
			if (this.vel.x!=0 || this.vel.y!=0 || (this.onladder && doClimb) || this.isFlickering())
			{
				this.parent();
				return true;
			}
			return false;
		},

		setRespawnPosition: function (x,y) {
			this.respawn.x = x;
			this.respawn.y = y;
		},

		respawn: function () {
			this.pos.x = this.respawn.x;
			this.pos.y = this.respawn.y;
			this.setCurrentAnimation("walk");
		},
		
		won: function () {
			this.pos.x = 710;
			this.pos.y = 160;
			
			// TODO: wenn in memory of bild, dann switchen!
//			this.addAnimation ("climb",  [171,172,173]);
//			this.addAnimation ("walk",  [174,175,176]);
//			this.addAnimation ("dead",  [177,178,179]);
			this.setCurrentAnimation("dead");
			
			me.audio.stopTrack();
			me.audio.play("explosion", false);
		},
	
		// help function
		die : function ()
		{
			if (!this.flickering)
			{
				this.setCurrentAnimation("dead", "walk");

				// DIE sound!!
				me.audio.play("die_post", false);

				// flash the screen
//				me.game.viewport.fadeIn("#FFFFFF", 75);
				me.game.viewport.fadeOut("#FFFFFF", 1000, this.respawn() );
			}
		},
		
		// helper function
		dieCross : function ()
		{
			if (!this.flickering)
			{
				this.setCurrentAnimation("dead");

				// DIE sound!!
				me.audio.play("die_post", false);
				
				// flash the screen
//				me.game.viewport.fadeIn("#FFFFFF", 75);
				me.game.viewport.fadeIn("#FFFFFF", 150, this.won() );

				if ( parseInt(me.gamestat.getItemValue("score")) < parseInt(me.gamestat.getItemValue("hiscore")) )
				{
					console.log(me.gamestat.getItemValue("score"));
					me.gamestat.setValue("hiscore", parseInt( me.gamestat.getItemValue("score")) );
				}
			
				this.dying = true;
			}
		},
		
		// helper function
		stopdying : function()
		{
			this.dying = false;
		}
	});
	
	/************************************************************************************/
	/*		a DNA entity																*/
	/************************************************************************************/
	var DnaEntity = me.CollectableEntity.extend(
	{	
		init: function (x, y, settings)
		{
			// define this here instead of tiled
			settings.image = "dna";
			settings.spritewidth = 32;
			
			// call the parent constructor
			this.parent(x, y , settings);

			// animation speed		
			this.animationspeed = 8;

			// bounding box
//			this.updateColRect(8,16,-1,32);
			this.updateColRect(10,15, 2,30);
		},
			
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
		}
		
	});
	
	var DnaEntity1 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
				
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			// add a "stars" item
			me.gamestat.setValue("layer", 1);
			me.gamestat.setValue("lastlayer", 0);
		}
	});
	
	var DnaEntity2 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 2);
			me.gamestat.setValue("lastlayer", 1);
		}
	});
	
	var DnaEntity3 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 3);
			me.gamestat.setValue("lastlayer", 2);
		}
	});
	
	var DnaEntity4 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 4);
			me.gamestat.setValue("lastlayer", 3);
		}
	});
	
	var DnaEntity5 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 5);
			me.gamestat.setValue("lastlayer", 4);
		}
	});
	
	var DnaEntity6 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 6);
			me.gamestat.setValue("lastlayer", 5);
		}
	});
	
	var DnaEntity7 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 7);
			me.gamestat.setValue("lastlayer", 6);
		}
	});

	var DnaEntity8 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 8);
			me.gamestat.setValue("lastlayer", 7);
		}
	});

	var DnaEntity9 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 9);
			me.gamestat.setValue("lastlayer", 8);
		}
	});

	var DnaEntity10 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 10);
			me.gamestat.setValue("lastlayer", 9);
		}
	});

	var DnaEntity11 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 11);
			me.gamestat.setValue("lastlayer", 10);
		}
	});

	var DnaEntity12 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 12);
			me.gamestat.setValue("lastlayer", 11);
		}
	});

	var DnaEntity13 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 13);
			me.gamestat.setValue("lastlayer", 12);
		}
	});


	var DnaEntity14 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 14);
			me.gamestat.setValue("lastlayer", 13);
		}
	});

	var DnaEntity15 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 15);
			me.gamestat.setValue("lastlayer", 14);
		}
	});

	var DnaEntity16 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 16);
			me.gamestat.setValue("lastlayer", 15);
		}
	});

	var DnaEntity17 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 17);
			me.gamestat.setValue("lastlayer", 16);
		}
	});

	var DnaEntity18 = DnaEntity.extend(
	{
		onCollision : function ()
		{
			// do something when collide
			me.audio.play("cling", false);
			// give some dna
			me.game.HUD.updateItemValue("dnapool", 1);
			
			//avoid further collision and delete it
			this.collidable = false;
			me.game.remove(this);
			
			me.gamestat.setValue("layer", 18);
			me.gamestat.setValue("lastlayer", 17);
		}
	});

	/************************************************************************************/
	/*		an enemy Entitys															*/
	/************************************************************************************/
	
	// GODs Helper
	var EnemyEntity = me.ObjectEntity.extend(
	{	
		init: function (x, y, settings)
		{
			// call the parent constructor
			this.parent(x, y , settings);
			
			this.startX = x;
			this.endX   = x+settings.width - settings.spritewidth; // size of sprite
			
			// make him start from the right
			this.pos.x = x + settings.width - settings.spritewidth;
			this.walkLeft = true;

			// walking & jumping speed
			this.setVelocity(1, 6);
			
			// make it collidable
			this.collidable = true;
			this.type = me.game.ENEMY_OBJECT;
		
			// bounding box
//			this.updateColRect(-1,0,4,28);
			this.updateColRect(-1,0, 10,22);

			// walking animatin
			this.addAnimation ("walk", [3,4,5]);
			// dead animatin
			this.addAnimation ("dead", [6,7,8]);

			// set default one
			this.setCurrentAnimation("walk");
		},
			
		onCollision : function (res)
		{
				
			// res.y >0 means touched by something on the bottom
			// which mean at top position for this one
			if (this.alive && (res.y > 0))
			{
				// make it dead
				this.alive = false;
				// and not collidable anymore
				this.collidable = false;
				// set dead animation
				this.setCurrentAnimation("dead");
				// make it flicker and call destroy once timer finished
				this.flicker(45, function(){me.game.remove(this)});
				// dead sfx
				me.audio.play("enemykill", false);
			}
		},

		
		// manage the enemy movement
		update : function ()
		{
			// do nothing if not visible
			if (!this.visible)
				return false;
				
			if (this.alive)
			{
				if (this.walkLeft && this.pos.x <= this.startX)
				{
					this.walkLeft = false;
				}
				else if (!this.walkLeft && this.pos.x >= this.endX)
				{
					this.walkLeft = true;
				}
				
				//console.log(this.walkLeft);
				this.doWalk(this.walkLeft);
			}
			else
			{
				this.vel.x = 0;
			}
			// check & update movement
			this.updateMovement();
			
			// call the parent function
			this.parent();
			
			return (this.vel.x!=0 || this.vel.y!=0);
		}
	});

	// GOD
	var EnemyEntity20 = me.ObjectEntity.extend(
	{	
		init: function (x, y, settings)
		{
			// call the parent constructor
			this.parent(x, y , settings);
			
			this.startX = x;
			this.endX   = x+settings.width - settings.spritewidth; // size of sprite

			// make him start from the right
			this.pos.x = x + settings.width - settings.spritewidth;
			this.walkLeft = true;

			// walking & jumping speed
			this.setVelocity(1, 6);
			
			// make it collidable
			this.collidable = true;
			this.type = me.game.ENEMY_OBJECT;
		
			// bounding box
			this.updateColRect(-1,0,4,28);
			
			// walking animatin
			this.addAnimation ("walk", [3,4,5]);
			// dead animatin
			this.addAnimation ("dead", [6,7,8]);

			// set default one
			this.setCurrentAnimation("dead");
		},
/*
		onCollision : function (res)
		{
				
			// res.y >0 means touched by something on the bottom
			// which mean at top position for this one
			if (this.alive && (res.y > 0))
			{
				// make it dead
				this.alive = false;
				// and not collidable anymore
				this.collidable = false;
				// set dead animation
				this.setCurrentAnimation("dead");
				// make it flicker and call destroy once timer finished
				this.flicker(45, function(){me.game.remove(this)});
				// dead sfx
				me.audio.play("enemykill", false);
				
				// give some dna
//				me.game.HUD.updateItemValue("dnapool", 150);
			}
		},

		// manage the enemy movement
		update : function ()
		{
			// do nothing if not visible
			if (!this.visible)
				return false;
				
			if (this.alive)
			{
				if (this.walkLeft && this.pos.x <= this.startX)
				{
					this.walkLeft = false;
				}
				else if (!this.walkLeft && this.pos.x >= this.endX)
				{
					this.walkLeft = true;
				}
				
				//console.log(this.walkLeft);
				this.doWalk(this.walkLeft);
			}
			else
			{
				this.vel.x = 0;
			}
			// check & update movement
			this.updateMovement();
			
			// call the parent function
			this.parent();
			
			return (this.vel.x!=0 || this.vel.y!=0);
		}
*/
	});

	/************************************************************************************/
	/*		a Gui Objects																*/
	/************************************************************************************/
	var DnaPoolObject = me.HUD_Item.extend(
	{	
		init: function(x, y, val)
		{
         // call the parent constructor
			this.parent(x, y, val);
			// create a font
			this.font = new me.BitmapFont("atascii_16px", 16);
			this.font.set("right");
		},

		// update the item value
		update : function(value) {
			this.parent(value);
			if ( this.value != me.gamestat.getItemValue("score") )
			{
				me.gamestat.setValue("score", this.value);
			}
			return true;
		},

		//	draw our dna
		draw : function (context, x, y)
		{
			this.font.draw (context, "MUTATIONS", this.pos.x +x+505, this.pos.y+y);
			this.font.draw (context, this.value, this.pos.x +x+545, this.pos.y+y);
		}
	});

// END
