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
            split: true
        };

        this.items = [
            {
                region: "east",
                layout: "fit",
                title: "Historique",
                width: 570,
                tbar: [
                    {
                        text: "Ajouter un commentaire"   
                    }
                ],
                items: [
                    {
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
                        xtype: "textfield",
                        width: "100%",
                        fieldLabel: "Titre",
                        labelAlign: "top"
                    },
                    {
                        xtype: "htmleditor",
                        height: 250,
                        width: "100%",
                        fieldLabel: "Demande",
                        labelAlign: "top"
                    }                    
                ]
            }
		];

        this.callParent();
    }
});