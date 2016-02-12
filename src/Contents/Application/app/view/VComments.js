App.view.define('VComments', {
    extend: "Ext.window.Window",
    alias: 'widget.VComments',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

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
		];

        this.callParent();
    }
});