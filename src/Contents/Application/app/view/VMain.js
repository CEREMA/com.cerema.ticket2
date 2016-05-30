App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
			]		
		},
		{
			region: 'north',
			height: 50,
			minHeight: 50,
			hidden: true,
            baseCls: 'cls-header',
			border:false,
			tbar: [
                {
                    xtype: "button",
					itemId: "newticket",
                    iconCls: "add_ticket",
                    scale: "large",
                    margin: 3,
                    text: "Ajouter un drône"
                }
			]		
		},
        {
            region: "west",
            split: true,
            layout:"fit",
            width: 250,
			title: "Mes drones",
            items: [
                {
                    xtype: "dataview",
                    store: App.store.create({fields:[
                        "id","title"
                    ],data:[
                    ]}),
                    selModel: {
                        mode: 'SINGLE',
                        listeners: {
                            scope: this/*,
                            selectionchange: this.onSelectionChange*/
                        }
                    },/*
                    listeners: {
                        scope: this,
                        contextmenu: this.onContextMenu
                    },*/
                    trackOver: true,
                    cls: 'feed-list',
                    itemSelector: '.feed-list-item',
                    overItemCls: 'feed-list-item-hover',
                    tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'                    
                }
            ]
        },
		{
			region: "center",			
			split:true,
			layout: "vbox",
			items: [
				{
					xtype: "grid",
					flex: 1,
					itemId: "maingrid",
                    border: false,
					width: "100%",
					tbar: [
					'->',
					{
						text: "Ajouter"
					}
					],
					columns: [
					{
						header: "worker",
						width: 200
					},
					{
						header: "URL",
						flex: 1
					},
					{
						header: "port"
					},
					{
						header: "pid"
					},
					{
						header: "status"
					}
					],					
					store: App.store.create({fields:[],data:[]})
				}
			]
		}
	]
	
});