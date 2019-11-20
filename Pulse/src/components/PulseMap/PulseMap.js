import React, { Component } from 'react';
import {setDefaultOptions, loadModules, DotDensityRenderer, Legend, Bookmarks} from 'esri-loader';

const options = {
  url: 'https://js.arcgis.com/4.13/',
  dojoConfig: {
    async: true,
    "esri-featurelayer-webgl": 1,
    packages: [
      {
        location: '/path/to/ddr',
        name: 'ddr'
      }
    ]
  }
};

const styles =  {
  container: {
    height: '100vh',
    width: '100vw'
  },
  mapDiv: {
    padding: 0,
    margin: 0,
    height: '100%',
    width: '100%'
  },
}




class EsriMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
        map: null,
        view: null,
      status: 'loading'
    }
  }



  componentDidMount() {
    setDefaultOptions({ css: 'https://js.arcgis.com/4.13/esri/themes/dark/main.css' });
    loadModules([
    'esri/Map', 
    'esri/views/MapView', 
    'esri/layers/FeatureLayer',
    'esri/widgets/Legend',
    'esri/widgets/Expand',
    // 'esri/widgets/Bookmarks',
    'esri/renderers/DotDensityRenderer'], options)
      .then(([
        WebMap, 
        MapView,
        FeatureLayer,
        Legend,
        Expand,
        // Bookmarks,
    DotDensityRenderer]) => {
        const map = new WebMap({
            basemap: "dark-gray-vector"
          });
        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-118.193741,33.770050],
            highlightOptions: {
              fillOpacity: 0,
              color: [50, 50, 50]
            },
            popup: {
              dockEnabled: true,
              dockOptions: {
                position: "top-right",
                breakpoint: false
              }
            },
            constraints: {
              maxScale: 35000
            },
          zoom: 12,
        });
        view.when(() => {

          const dotDensityRenderer = new DotDensityRenderer({
            dotValue: 5,
            outline: null,
            referenceScale: 577790,
            legendOptions: {
                unit: "Reviews"
              },
              attributes: [
                {
                  field: "Arts",
                  color: "#f23c3f",
                  label: "Arts"
                },
                {
                  field: "Food",
                  color: "#e8ca0d",
                  label: "Food"
                },
                {
                  field: "Entertainment",
                  color: "#00b6f1",
                  label: "Entertainment"
                },
                {
                  field: "Medical",
                  color: "#32ef94",
                  label: "Medical"
                },
                {
                  field: "Other",
                  color: "#ff7fe9",
                  label: "Other"
                },
                {
                  field: "Shopping",
                  color: "#e2c4a5",
                  label: "Shopping"
                },
                {
                  field: "Travel",
                  color: "#ff6a00",
                  label: "Travel"
                },
                {
                  field: "Nightlife",
                  color: "#96f7ef",
                  label: "Nightlife"
                },
              ]
    
        })

        const url =
        "https://services6.arcgis.com/ubHzCnbi2Xj55a1U/arcgis/rest/services/Hopefully/FeatureServer/0";
          const layer = new FeatureLayer({
            url: url,
            minScale: 20000000,
            maxScale: 35000,
            title: "Long Beach Reeviews (2019)",
            popupTemplate: {
              title: "Long Beach, California",
              content: [
                {
                  type: "fields",
                  fieldInfos: [
                    {
                      fieldName: "Arts",
                      label: "Arts",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                   {
                      fieldName: "Food",
                      label: "Food",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Entertainment",
                      label: "Entertainment",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Medical",
                      label: "Medical",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Other",
                      label: "Other",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Shopping",
                      label: "Shopping",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Travel",
                      label: "Travel",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                    {
                      fieldName: "Nightlife",
                      label: "Nightlife",
                      format: {
                        digitSeparator: true,
                        places: 0
                      }
                    },
                  ]
                }
              ]
            },
            renderer: dotDensityRenderer
          });

          map.add(layer);


          view.ui.add(
            [
              new Expand({
                view: view,
                content: new Legend({ view: view }),
                group: "top-left",
                expanded: true
              })
              // new Expand({
              //   view: view,
              //   content: new Bookmarks({ view: view }),
              //   group: "top-left"
              // })
            ],
            "top-left"
          ); 

        });
    
      })    
    
  }

  renderMap() {
    if(this.state.status === 'loading') {
      return <div>loading</div>;
    }
  }

  render() {

    return(
          <div style={styles.container}>
            <div id='viewDiv' style={ styles.mapDiv } >
              {this.renderMap()}
            </div>
        
          </div>
    )
  }
}

export default EsriMap;