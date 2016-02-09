/*
var html='<li><p class="timeline-date">%DATE%</p><div class="timeline-content"><h3>%POSTER%</h3><p>%COMMENT%</p></div></li>';
var tpl=[];
for (var i=0;i<r.result.data.length;i++) {
    var results=html;
    results=results.replace('%DATE%',r.result.data[i].date.toDate().toString('dd/MM/yyyy hh:mm'));
    results=results.replace('%POSTER%',r.result.data[i].nomprenom);
    results=results.replace('%COMMENT%',r.result.data[i].blog);
    tpl.push(results);
};
results='<ul class="timeline">'+tpl.join('')+'</ul>';
*/
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