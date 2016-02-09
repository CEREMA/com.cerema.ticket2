
App.controller.define('CMain', {

	views: [
		"VMain"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
			"button#clickme": {
				click: "clickme_onclick"
			}
		});
		
		App.init('VMain',this.onLoad);
		
	},
	Menu_onClick: function(p)
	{
		if (p.itemId) {
			Ext.Msg.alert('Status', 'Click event on '+p.itemId);
		};			
	},
	clickme_onclick: function()
	{
		Ext.Msg.alert('Omneedia','hello world!');
	},
	onLoad: function()
	{
		Auth.login(function(auth) {
			/*var docked = App.get('mainform grid#maingrid').getDockedItems();
			console.log(Auth.User.profiles);
			if ((Auth.User.profiles.indexOf('SII')==-1) && (Auth.User.profiles.indexOf('GEST')==-1)) {
				docked[2].hide();
			};*/
			me.MAJ_Grid();
		});	
	}
	
	
});
