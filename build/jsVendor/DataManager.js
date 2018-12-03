"use strict";

var Site = Site || {};
var cities = [
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [37, 55, 144]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "Moscow",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	},
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [30, 59, 11]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "St Petersburg",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	},
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [0, 51, 25]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "London",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	},
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [33, 35, 147]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "Cyprus",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	},
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [74, 40, 57]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "New York",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	},
	{
		'id' : 'us1000duuy',
		'type' : 'Feature',
		'geometry' : {
			'type' : 'Point',
			'coordinates' : [139, 35, 44]
		},
		'properties':{
			'alert' : "green",
			'cdi' : 3.3,
			'code' : "1000duuy",
			'detail' : "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us1000duuy.geojson",
			'dmin' : 4.926,
			'felt' : 3,
			'gap' : 21,
			'ids' : ",us1000duuy,",
			'mag' : "",
			'magType' : "mww",
			'mmi' : 3.2,
			'net' : "us",
			'nst' : 'null',
			'place' : "Tokyo",
			'rms' : 1.19,
			'sig' : 519,
			'sources' : ",us,",
			'status' : "reviewed",
			'time' : 1525112693130,
			'title' : "test123",
			'tsunami' : 0,
			'type' : "earthquake",
			'types' : ",dyfi,geoserve,losspager,moment-tensor,origin,phase-data,shakemap,",
			'tz' : 660,
			'updated' : 1525975626327,
			'url' : "https://earthquake.usgs.gov/earthquakes/eventpage/us1000duuy"
		}
	}
]
Site.DataManager = function(){
    var self = this;
    var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
    this.earthquakes = [];
    this.loadSignal = new BK.Signal();

    this.load = function() {
		
				for (var i=0; i<cities.length; i++) {
					self.earthquakes.push(new Site.DataManager.Earthquake(cities[i]));
				}

				self.loadSignal.fire();

    }
}

Site.DataManager.Earthquake = function(data) {
	data.properties['mag'] = '';
    this.magnitude = data.mag;
    this.desc = data.place;
    this.data = data;

    var coords = data.geometry.coordinates;
    this.latLng = new GK.LatLng(coords[1], coords[0]);
    this.pos = GK.LatLng.toWorld(this.latLng);

}