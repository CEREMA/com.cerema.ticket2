App.view.define('VComments', {
    extend: "Ext.window.Window",
    alias: 'widget.VComments',
    initComponent: function() {
        this.width = 800;
        this.height = 600;

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