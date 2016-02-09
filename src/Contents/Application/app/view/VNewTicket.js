App.view.define('VNewTicket', {
    extend: "Ext.window.Window",
    alias: 'widget.VNewTicket',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;
		
		this.title = "Ticket";
		
        this.layout = {
            type: 'vbox'
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
                layout: "vbox",
                width: 250,
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