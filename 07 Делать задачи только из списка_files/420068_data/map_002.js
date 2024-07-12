/**
 * @see https://developers.google.com/maps/documentation/javascript/tutorial?hl=ru
 */
$.fn.anketologMap = function (options, params) {
	var $container = this.length > 0 ? this.get(0) : null;

	options = $.extend({
		scrollwheel: true,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: true
	}, options);

	params = $.extend({
		kind: null,
		limitMax: null,
		isLimited: false,
		draggable: false,
		allowModify: false,
	}, params);

	return new (function () {
		var self = this;

		this.geocoder = new google.maps.Geocoder();
		this.map = new google.maps.Map($container, options);
		this.markers = [];

		this.map.addListener('click', function (e) {
			if (!params.allowModify) {
				return;
			}

			self.addMarker(e.latLng);
		});


		this.intersect = function (a, b) {
			return a.filter(function (v) {
				return b.indexOf(v) !== -1;
			});
		};

		this.getGeocode = function (location, kind) {
			var d = $.Deferred();

			var types = null;
			if (kind === 'house') {
				types = {
					'house': ['street_number'],
					'street': ['route'],
					'locality': ['locality'],
					'province': ['administrative_area_level_1', 'administrative_area_level_2'],
					'country': ['country'],
				};
			} else if (kind === 'street') {
				types = {
					'house': [],
					'street': ['route'],
					'locality': ['locality'],
					'province': ['administrative_area_level_1', 'administrative_area_level_2'],
					'country': ['country'],
				};
			} else if (kind === 'locality') {
				types = {
					'house': [],
					'street': [],
					'locality': ['locality'],
					'province': ['administrative_area_level_1', 'administrative_area_level_2'],
					'country': ['country'],
				};
			} else {
				types = {
					'house': ['street_number'],
					'street': ['route'],
					'locality': ['locality'],
					'province': ['administrative_area_level_1', 'administrative_area_level_2'],
					'country': ['country'],
				};
			}

			self.geocoder.geocode({location: location}, function (results, status) {
				if (status !== 'OK') {
					return;
				}
				if (results.length < 1) {
					return;
				}

				var first = results.shift();
				if (!first) {
					return;
				}

				var address = {};
				$.each(first.address_components, function (i, component) {
					if (self.intersect(types['house'], component.types).length > 0) {
						address.house = component.long_name;
					}
					if (self.intersect(types['street'], component.types).length > 0) {
						address.street = component.long_name;
					}
					if (self.intersect(types['locality'], component.types).length > 0) {
						address.locality = component.long_name;
					}
					if (self.intersect(types['province'], component.types).length > 0) {
						address.province = component.long_name;
					}
					if (self.intersect(types['country'], component.types).length > 0) {
						address.country = component.long_name;
					}
				});

				d.resolve({
					address: address,
					location: {
						lat: first.geometry.location.lat(),
						lng: first.geometry.location.lng(),
					},
				});
			});

			return d.promise();
		};

		this.buildDescription = function (geocode) {
			var parts = [];
			if (geocode.country) {
				parts.push(geocode.country);
			}
			if (geocode.province) {
				parts.push(geocode.province);
			}
			if (geocode.locality) {
				parts.push(geocode.locality);
			}
			if (geocode.street) {
				parts.push(geocode.street);
			}
			if (geocode.house) {
				parts.push(geocode.house);
			}
			return parts.join(', ');
		};

		this.removeDescription = function (marker) {
			marker.infowindows.forEach(function (infowindow) {
				infowindow.close();
			});
		};

		this.renderDescription = function (marker) {
			self.removeDescription(marker);

			var infowindow = new google.maps.InfoWindow({
				content:
					'<div id="content">' +
						'<div id="bodyContent">' +
							marker.description +
						'</div>'+
					'</div>',
				maxWidth: 180,
				zIndex: 100 * (self.markers.length + 1)
			});

			infowindow.open(self.map, marker);

			infowindow.addListener('closeclick', function () {
				if (!params.allowModify) {
					return;
				}

				marker.setMap(null);

				$.each(self.markers, function (i, m) {
					if (marker === m) {
						self.markers.splice(i, 1);
					}
				});

				google.maps.event.trigger(self.map, 'marker:remove', self.markers);
			});

			marker.infowindows.push(infowindow);
		};

		this.addMarker = function (location, silent) {
			if (params.isLimited && params.limitMax <= self.markers.length) {
				return;
			}

			var marker = new google.maps.Marker({
				position: location,
				draggable: params.draggable,
			});

			marker.infowindows = [];

			marker.setMap(self.map);

			self.markers.push(marker);

			$.when(self.getGeocode(location, params.kind))
				.done(function (data) {
					marker.address = data.address;
					marker.location = data.location;
					marker.description = self.buildDescription(data.address);

					self.renderDescription(marker);

					if (!silent) {
						google.maps.event.trigger(self.map, 'marker:add', self.markers);
					}
				});

			marker.addListener('dragend', function (e) {
				$.when(self.getGeocode(e.latLng, params.kind))
					.done(function (data) {
						marker.address = data.address;
						marker.location = data.location;
						marker.description = self.buildDescription(data.address);

						self.renderDescription(marker);

						google.maps.event.trigger(self.map, 'marker:move', self.markers);
					});
			});

			marker.addListener('dragstart', function (e) {
				self.removeDescription(marker);
			});

			marker.addListener('remove', function (e) {
				self.removeDescription(marker);
			});

			return marker;
		};
	});
};