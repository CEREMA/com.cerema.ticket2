const CLUSTER="http://oacluster.cete-mediterranee.i2";

App.controller.define('CMain', {

	views: [
		"VMain",
		"VNewTicket",
        "VComments"
	],
	
	models: [
	],
	
	init: function()
	{

		this.control({
			"menu>menuitem": {
				click: "Menu_onClick"
			},
            "mainform dataview": {
                itemclick: "dataview_onclick"   
            },
			"mainform button#newticket": {
				click: "newticket_onclick"
			},
            "mainform grid#maingrid": {
                itemclick: "grid_onclick"  
            },
            "VNewTicket": {
                show: "newticket_onshow"   
            },
            "VNewTicket button#validate": {
                click: "newticket_validate"
            },
            "VNewTicket button#addComment": {
                click: "addComment_onclick"
            },
            "VComments button#record": {
                click: "recordComments"   
            }
		});
		
		App.init('VMain',this.onLoad);
		
	},
    recordComments: function(p)
    {
        var me=this;
        App.DB.post('infocentre://ticket_timeline',{
            ticket_id: p.up('window').record.id,
            timestamp: new Date(),
            text: App.get(p.up('window'),'htmleditor#edit').getValue(),
            username: Auth.User.lastname+' '+Auth.User.firstname,
            userid: Auth.User.uid
        },function(r){            
            me.updateComments(p.up('window'));
            p.up('window').close();
        });
    },
    addComment_onclick: function(p)
    {
		App.view.create('VComments',{
			modal: true,
            record: p.up('window').record
		}).show();          
    },
    grid_onclick: function(item,record) 
    {
		App.view.create('VNewTicket',{
			modal: true,
            record: record.data
		}).show();        
    },
	Menu_onClick: function(p)
	{
		/*if (p.itemId) {
			Ext.Msg.alert('Status', 'Click event on '+p.itemId);
		};			*/
	},
    newticket_validate: function(p)
    {
        if (!p.record) {
            // c'est un nouveau ticket
            var record=App.get(p.up('window'),'combo#agent').findRecordByValue(App.get(p.up('window'),'combo#agent').getValue());
            var d=new Date();
            var o={
                cli: Auth.User.uid,
                cli_nom: Auth.User.lastname+' '+Auth.User.firstname,
                agent: App.get(p.up('window'),'combo#agent').getValue(),
                agent_nom: App.get(p.up('window'),'combo#agent').getRawValue(),
                titre: App.get(p.up('window'),'textfield#titre').getValue(),
                demande: App.get(p.up('window'),'htmleditor#demande').getValue(),
                date_depot: d,
                agent_departement: record.get('libunic'),
                agent_departement_id: record.get('kuni'),
                agent_service: record.get('libsubc'),
                agent_service_id: record.get('ksub'),
                state: 1
            };
            App.DB.post('infocentre://ticket',o,function(r){
                App.DB.post('infocentre://ticket_timeline',{
                    ticket_id: r.insertId,
                    timestamp: d,
                    username: Auth.User.lastname+' '+Auth.User.firstname,
                    userid: Auth.User.uid,
                    state: 1
                },function(r){
                    p.up('window').close();
                })          
            });
        }
    },
    updateComments: function(p)
    {
        var html0='<li><p class="timeline-date">%DATE%</p><div class="timeline-content"><h3>%POSTER%</h3><p>%COMMENT%</p></div></li>';
        var html1='<li><p class="timeline-date2">%DATE%</p><div class="timeline-content2"><div class="timeline-content2p">%STATE%</div>&nbsp;&nbsp;<br>&nbsp;&nbsp;<br>&nbsp;&nbsp;</div></li>';
        var tpl=[];
        App.DB.get("infocentre://ticket_timeline{id,timestamp-,username,userid,text,state}?ticket_id="+p.record.id,function(e,r){
            for (var i=0;i<r.result.data.length;i++) {
                if (r.result.data[i].text) var results=html0; else var results=html1;
                results=results.replace('%DATE%',r.result.data[i].timestamp.toDate().toString('dd/MM/yyyy<br>hh:mm'));
                results=results.replace('%POSTER%',r.result.data[i].username);
                if (r.result.data[i].text) results=results.replace('%COMMENT%',r.result.data[i].text); else {
                    if (r.result.data[i].state==1) results=results.replace('%STATE%',"Posé");                        
                    if (r.result.data[i].state==2) results=results.replace('%STATE%',"Attribué");                        
                    if (r.result.data[i].state==3) results=results.replace('%STATE%',"En cours");                        
                    if (r.result.data[i].state==4) results=results.replace('%STATE%',"Traité");                        
                    if (r.result.data[i].state==5) results=results.replace('%STATE%',"Clos");                        
                };
                tpl.push(results);
            };
            results='<ul class="timeline">'+tpl.join('')+'</ul>';        
            App.get('VNewTicket panel#timeline').update(results);             
        });        
    },
    newticket_onshow: function(p)
    {
        p.center();
        var me=this;
        if (p.record) {
            if (Auth.User.profiles.indexOf('SII')>-1 || Auth.User.profiles.indexOf('GEST')>-1) {
                App.get(p,'button#attr').show();
            };            
            App.DB.get('infocentre://ticket?id='+p.record.id,p,function(r){
                var html=[];
                html.push("Agent concerné :<br><b>"+r.data[0].agent_nom+"</b><br><br>");
                html.push("Déposé par <b>"+r.data[0].cli_nom+'</b><br><br>');
                App.get(p,"panel#sumup").update(html.join(''));
                App.get(p,"panel#sumup").show();
                App.get(p,'checkbox#DA').show();
                App.get(p,'checkbox#DA').setDisabled(true);
                //
            });  
        } else {
            App.get(p,'combo#agent').show();
            App.get(p,'textfield#titre').show();
            App.get(p,'htmleditor#demande').show();
            App.get(p,'panel#cli').show();            
            App.get(p,'checkbox#DA').show();
            App.get(p,"panel#cli").update("<b>Déposé par "+Auth.User.lastname+' '+Auth.User.firstname+'</b>');
        };
        if (Auth.User.profiles.indexOf('SII')>-1 || Auth.User.profiles.indexOf('GEST')>-1) {
            var store=App.store.create("bpclight://agents{Nom+' '+prenom=nomprenom+,unites.kuni,subdis.ksub,unites.libunic,subdis.libsubc,Kage}?actif=1");  
            App.get(p,'combo#agent').bindStore(store);            
        };
        if (Auth.User.profiles.indexOf('CLI')>-1) {
            var store=App.store.create("bpclight://agents{Nom+' '+prenom=nomprenom+,unites.kuni,subdis.ksub,unites.libunic,subdis.libsubc,Kage}?actif=1&kuni="+Auth.User.kuni);  
            App.get(p,'combo#agent').bindStore(store);            
        };
        App.get(p,'combo#agent').getStore().load();
        me.updateComments(p);
    },
	newticket_onclick: function()
	{
		App.view.create('VNewTicket',{
			modal: true
		}).show();
	},
    dataview_onclick: function(item, record, e) 
    {
        var extraParams=App.get('mainform grid#maingrid').getStore().getProxy().extraParams;
        switch(record.data.id) {
            case 1:
                if (Auth.User.profiles.indexOf('SII')>-1) {
                     var store=App.store.create('App.Demandes.mytickets',{groupField: "agent_departement"});
                     store.getProxy().extraParams=extraParams;
			         store.getProxy().extraParams.id=Auth.User.uid;                    
                };
                if (Auth.User.profiles.indexOf('GEST')>-1) {
                     var store=App.store.create('App.Demandes.mytickets',{groupField: "agent_departement"});
                     store.getProxy().extraParams=extraParams;
			         store.getProxy().extraParams.id=Auth.User.uid;                    
                };
                if (Auth.User.profiles.indexOf('CLI')>-1) {
                     var store=App.store.create('App.Demandes.myclitickets',{groupField: "agent_departement"});
                     store.getProxy().extraParams=extraParams;
			         store.getProxy().extraParams.id=Auth.User.uid;                    
                };
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 2:
                var store=App.store.create('App.Demandes.news',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                store.getProxy().extraParams.state=1;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 3:
                var store=App.store.create('App.Demandes.news',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                store.getProxy().extraParams.state=2;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 4:
                var store=App.store.create('App.Demandes.news',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                store.getProxy().extraParams.state=3;
                App.get('mainform grid#maingrid').bindStore(store);                
                App.get('mainform grid#maingrid').getStore().load();
                break;
            case 5:
                var store=App.store.create('App.Demandes.news',{groupField: "agent_departement"});
                store.getProxy().extraParams=extraParams;
                store.getProxy().extraParams.state=4;
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
                    if ((Auth.User.profiles.indexOf('SII')==-1) && (Auth.User.profiles.indexOf('GEST')==-1) && (Auth.User.profiles.indexOf('CLI')==-1) ) {
                App.blur();
                alert("Désolé ! Vous n'avez pas les droits d'utiliser cette application.");
          } else {
              var data=[];
			  Ext.Ajax.request({
				url: CLUSTER+'/images/'+Auth.User.api,
				success: function(response){
					  var obj = JSON.parse(response.responseText);
					  for (var i=0;i<obj.images.length;i++) data.push({id:i,title:obj.images[i]});
					  App.get('mainform dataview').getStore().loadData(data);
					  App.get('mainform dataview').select(0);
					  var grid=App.get('mainform grid#maingrid').getStore();
					  grid.getProxy().extraParams.uid=Auth.User.uid;
					  grid.getProxy().extraParams.profil=Auth.User.profiles;
					  grid.load();					
				}
			});
          }
		});	
	}
	
	
});
