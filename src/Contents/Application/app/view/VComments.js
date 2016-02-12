App.view.define('VComments', {
    extend: "Ext.window.Window",
    alias: 'widget.VComments',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'fit'
        };

        this.title = "Commentaire";

        this.bbar = [
            '->',
            {
                text: "Enregistrer",
                handler: function(p) {
                    p.up('window').close()   
                }
            },
            {
                text: "Enregistrer",
                itemId: "record"
            }
        ];
		
        this.defaults = {
        };

        this.items = [
            {
                xtype: "htmleditor",
                itemId: "edit"
            }
		];

        this.callParent();
    }
});