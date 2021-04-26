$.getScript('js/app.js' , function){
    
'use strict';



  
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
    let myChart = new Chart( ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: clicks,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',
          borderColor:
            'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },{
          label: '# of Shown',
          data: shown,
          backgroundColor:
            'rgba(144, 99, 100, 0.2)',
          borderColor:
            'rgba(144, 99, 100, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    } );
  }
  
  renderhart();


