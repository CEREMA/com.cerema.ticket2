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
		
        this.defaults = {
            split: true
        };

        this.items = [
            {
                region: "east",
                layout: "fit",
                title: "Timeline",
                width: 250,
                tbar: [
                    {
                        text: "Ajouter un commentaire"   
                    }
                ],
                items: [
                    {
                        html: "yes"   
                    }
                ]                
            },
            {
                region: "center",
                layout: "vbox",
                items: [
                    {
                        html: "yes"   
                    }                    
                ]
            }
		];

        this.callParent();
    }
});