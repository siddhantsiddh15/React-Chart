

var getCnvsId = '';
var dtaPoint,dtaPoint2,dtaPoint3=[];
dtaPoint=[{ y: 10, label: "Ember"}, { y: 7, label: "Backbone" }, { y: 4, label: "Node" } ];
dtaPoint2=[{ y: getRandm(1,10), label: "Ember"}, { y: getRandm(20,30), label: "Backbone" },{ y: getRandm(20,30), label: "Angular" }, { y: getRandm(10,30), label: "Node" } ];
dtaPoint3=[{ y: getRandm(1,10), label: "Ember"},{ y: getRandm(20,30), label: "Backbone" },{ y: getRandm(20,30), label: "Backbone" }, { y: getRandm(20,30), label: "Backbone" }, { y: getRandm(10,30), label: "Node" } ];

function getRandm(x,y){
	return Math.floor((Math.random() * y) + x);		
}

window.onload = function() {
	//intilizing first time
    createChart('chartContainer',dtaPoint,"color1");
    createChart('chartContainer2',dtaPoint2,"color2");
    createChart('chartContainer3',dtaPoint,"color3");
}

//creating custom ccolor theme
CanvasJS.addColorSet("color1",
     [//colorSet Array
 				"#1abc9c",
                "#2ecc71",
                "#3498db",
                "#9b59b6"
    ]);
CanvasJS.addColorSet("color2",
     [//colorSet Array
  				"#f1c40f",
                "#e67e22",
                "#e74c3c",
                "#f39c12"
    ]); 
CanvasJS.addColorSet("color3",
     [//colorSet Array
 				"#2F4F4F",
                "#008080",
                "#2E8B57",
                "#3CB371",
                "#90EE90"  
    ]); 		 
	
	

function createChart(getCnvsId,dtaPoint,colorTheme) {
	var s='',c='',t='',t2='',z;
    var drwChart = new CanvasJS.Chart(getCnvsId, {
        title: {
            text: "Cool Pie Charts",
            verticalAlign: 'top',
            horizontalAlign: 'left'
        },
		colorSet: colorTheme,
        data: [{
            type: "doughnut",
            startAngle: 20,
            toolTipContent: "{label}: {y} - <strong>#percent%</strong>",
            indexLabel: "{label} #percent%",
            click: function(e) {
                
				s=$('#'+getCnvsId).attr("data-serial");		//getting data-serial attribute here

				c=$('#'+getCnvsId).attr("class");			//getting class attribute vlaue here
				
				z=0;
				$('.main > div').each(function(i){
					t=$(this).attr('data-serial');
					t2=$(this).attr('id');
					console.log(t2);
					if(t==s){
						$('.'+c).animate({left:'0px'},300,'linear');	//animating clicked pie to left
		
					}
					else{
						z++;
						$(this).empty();					//clearing rest div
						if(z==1){
							$(this).css({'left':'35%'});
							createChart(t2,dtaPoint2,"color2");		//creating 1st pie 
						}
						else{
							$(this).css({'left':'69%'});
							createChart(t2,dtaPoint3,"color3");		//creating second pie
						}
		
					}
					
  				});
            },
            dataPoints: dtaPoint
        }]
    });
    drwChart.render();
}
	