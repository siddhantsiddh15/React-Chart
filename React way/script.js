var PieWithLegend = React.createClass({
    getDefaultProps: function() {
      return {
        data: []
      };
    },
    
    componentDidMount: function() {
      // The data-series configuration does not gets loaded automatically.
      // We need to call reloadConfiguration() for this.
      if(ReactDOM.findDOMNode(this).reloadConfiguration) {
        ReactDOM.findDOMNode(this).reloadConfiguration();
      }
    },
    
    shouldComponentUpdate: function() {
      // This prevents React from updating the chart DOM. We should handle
      // all the chart updates manually using charts API.
      return false;
    },
    
    componentWillReceiveProps: function(newProps) {
      // Update the series data
      ReactDOM.findDOMNode(this).chart.series[0].setData(newProps.data);
    },
  
    render: function() {
      // Note: custom non-standard HTML attributes work in React only when
      // custom elements are used (there're hyphens in element's name), or
      // when the "is" attribute is preset.
      return <vaadin-pie-chart>
        <chart-title>Revenue by industry</chart-title>
        <subtitle>2015</subtitle>
        <tooltip is="" point-format="<b>{point.percentage:.1f}%</b>">
        </tooltip>
        <plot-options>
          <pie is="" allow-point-select={true} show-in-legend={true} 
                cursor="pointer">
            <data-labels enabled={true}
                format="{point.name}: {point.y:.1f} M€"></data-labels>
          </pie>
        </plot-options>
        <data-series name="Revenue share">
          <data>{this.props.data.map(JSON.stringify).join(',')}
          </data>
        </data-series>
      </vaadin-pie-chart>;
    }
  });
  
  document.addEventListener('WebComponentsReady', function() {
    ReactDOM.render(
      <PieWithLegend data={[ ["", 98.0], ["Medical", 0.8],
          ["Agriculture ", 0.1], ["Automotive", 0.1],
          ["Consumers", 0.6], ["Subsidies", 0.4] ]}/>,
      document.getElementById('chart')
    );
  });