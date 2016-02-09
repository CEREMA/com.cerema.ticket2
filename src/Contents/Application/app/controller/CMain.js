
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
			},
            "mainform dataview": {
                itemclick: "dataview_onclick"   
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
    dataview_onclick: function(item, record, e) 
    {
        var extraParams=App.get('mainform grid#maingrid').getStore().getProxy().extraParams;
        switch(record.data.id) {
            case 1:
                var store=App.store.create('App.Demandes.mytickets',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
			    store.getProxy().extraParams.id=Auth.User.uid;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 2:
                var store=App.store.create('App.Demandes.news',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 6:
                var store=App.store.create('App.Demandes.toutes_archives',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            default:
        };
    },
	MAJ_Grid: function()
	{
		var grid=App.get('mainform grid#maingrid').getStore();
		grid.getProxy().extraParams.uid=Auth.User.uid;
		grid.getProxy().extraParams.profil=Auth.User.profiles;
		grid.load();
        /*if (this.ItemID) {
			//App.info.loading("chargement en cours...");			
            App.DB.get('infocentre://ticket?id='+this.ItemID,function(e,r) {
                var data={};
                if (r.result.data.length>0) data=r.result.data[0];
                App.view.create('VNewTicket',{
                    data: data,
                    modal: true
                }).show();
				//App.info.hide();
            });
			delete this.ItemID;
        };*/        
	},	
	onLoad: function()
	{
		var me=this;
		Auth.login(function(auth) {
			/*var docked = App.get('mainform grid#maingrid').getDockedItems();
			console.log(Auth.User.profiles);
			if ((Auth.User.profiles.indexOf('SII')==-1) && (Auth.User.profiles.indexOf('GEST')==-1)) {
				docked[2].hide();
			};*/
              App.get('mainform dataview').select(0);
		      var grid=App.get('mainform grid#maingrid').getStore();
		      grid.getProxy().extraParams.uid=Auth.User.uid;
		      grid.getProxy().extraParams.profil=Auth.User.profiles;
		      grid.load();
		});	
	}
	
	
});
