App.view.define('VNewTicket', {
    extend: "Ext.window.Window",
    alias: 'widget.VNewTicket',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;
		
		this.title = "Ticket";
		
        this.layout = {
            type: 'border'
        };

        this.bbar = [
            {
                text: "Annuler",
                handler: function(p) {
                    p.up('window').close();
                }
            },
            '->',
            {
                text: "Valider",
                itemId: "validate"
            }
        ];

        this.tbar = [
            {
                text: "Attribution",
                iconCls: "attr",
                itemId: "attr",
                hidden: true
            }
        ];
		
        this.defaults = {
            split: false
        };

        this.items = [
            {
                region: "east",
                layout: "fit",
                title: "Historique",
                width: 570,
                tbar: [
                    {
                        text: "Ajouter un commentaire",
                        iconCls: "bd",
                        itemId: "addComment"
                    }
                ],
                items: [
                    {
                        border: false,
                        itemId: "timeline",
                        width: "100%",
                        html: ""
                    }
                ]                
            },
            {
                region: "center",
                layout: "vbox",
                items: [
                    {
                        html: "",
                        flex: 1,
                        width: "100%",
                        margin: 5,
                        border: false,
                        itemId: "sumup",
                        hidden: true
                    },
                    {
                        xtype: "combo",
                        hidden: true,
                        itemId: "agent",
                        width: "100%",
                        typeAhead: false,
                        queryMode: 'local',
                        forceSelection: true, 
                        triggerAction: 'query',                        
                        triggerCls : Ext.baseCSSPrefix + 'form-search-trigger',
                        margin: 5,
                        hideTrigger: false,
                        fieldLabel: "Agent concerné",
                        labelAlign: "top",
                        displayField: "nomprenom",
                        valueField: "Kage",
                        store: App.store.create({fields:[],data:[]}),
                        selectOnFocus:true,
                        bind: "agent"
                    },
                    {
                        xtype: "panel",                        
                        hidden: true,
                        margin: 5,
                        html: "",
                        itemId: "cli",
                        width: "100%",
                        border: false,
                        height: 30
                    },                    
                    {
                        xtype: "textfield",
                        hidden: true,
                        itemId: "titre",
                        width: "100%",
                        margin: 5,
                        fieldLabel: "Titre",
                        labelAlign: "top",
                        bind: "titre"
                    },
                    {
                        xtype: "htmleditor",
                        hidden: true,
                        itemId: "demande",
                        height: 180,
                        margin: 5,
                        width: "100%",
                        fieldLabel: "Demande initiale",
                        labelAlign: "top",
                        bind: "demande"
                    },
                    {
                        xtype: "checkbox",
                        boxLabel: "Demande d'achat",
                        hidden: true,
                        itemId: "DA",
                        margin: 5
                    },
                    {
                        xtype: 'chart',
                        style: 'background:#fff',
                        height: 200,
                        width: "100%",
                        margin: {
                            right: 5
                        },
                        animate: {
                            easing: 'bounceOut',
                            duration: 1000
                        },
                        store: App.store.create(
                        {
                            fields: ['name', 'data1'],
                            data: [{
                                name: "test",
                                data1: 10
                            }]
                        }
                        ),
                        insetPadding: 25,
                        flex: 1,
                        axes: [{
                            type: 'gauge',
                            position: 'gauge',
                            minimum: 0,
                            maximum: 100,
                            steps: 10,
                            margin: 7
                        }],
                        series: [{
                            type: 'gauge',
                            field: 'data1',
                            donut: 80,
                            colorSet: ['#3AA8CB', '#ddd']
                        }]
                    }		                    
                ]
            }
		];

        this.callParent();
    }
});