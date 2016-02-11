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
        ];

        this.tbar = [
        ];
        
        this.record = {};
		
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
                        iconCls: "bd"
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
                        xtype: "combo",
                        width: "100%",
                        typeAhead: false,
                        queryMode: 'local',
                        forceSelection: true, 
                        triggerAction: 'query',                        
                        /*tpl: '<tpl for="."><div class="x-combo-list-item"><b>{nomprenom}</b><br>Département: {libunic} - Service: {libsubc}</div></tpl>', */
                        triggerCls : Ext.baseCSSPrefix + 'form-search-trigger',
                        margin: 5,
                        hideTrigger: false,
                        fieldLabel: "Agent concerné",
                        labelAlign: "top",
                        displayField: "nomprenom",
                        valueField: "Kage",
                        store: App.store.create("bpclight://agents{Nom+' '+prenom=nomprenom+,unites.libunic,subdis.libsubc,Kage}?actif=1",{autoLoad: true}),
                        selectOnFocus:true
                    },
                    {
                        xtype: "textfield",
                        width: "100%",
                        margin: 5,
                        fieldLabel: "Titre",
                        labelAlign: "top"
                    },
                    {
                        xtype: "htmleditor",
                        height: 180,
                        margin: 5,
                        width: "100%",
                        fieldLabel: "Demande initiale",
                        labelAlign: "top"
                    },
                    {
                        xtype: "checkbox",
                        boxLabel: "Demande d'achat",
                        margin: 5
                    }
                ]
            }
		];

        this.callParent();
    }
});