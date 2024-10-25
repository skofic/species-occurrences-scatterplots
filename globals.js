'use strict'

/**
 * globals.js
 *
 * This file contains the global variables used in the project.
 */

///
// Globals.
///
module.exports = Object.freeze({
	
	///
	// Collection types.
	///
	types: {
		list: [ 'full', 'round' ]
	},
	
	///
	// Collection domains.
	///
	domains: {
		list: [ 'chelsa', 'eu', 'eufgis' ],
		
		///
		// Chelsa data.
		///
		chelsa: {
			// Reference key and prefix.
			key: "chelsa",
			
			// Collection types.
			types: {
				
				// Full resolution data.
				full: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [
							{
								name: 'count',
								fields: ["count"]
							}
						],
						// Index indicator values.
						indicators: true
					}
				},
				
				// Rounded data.
				round: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [],
						// Index indicator values.
						indicators: false
					}
				}
			}
			
		}, // Chelsa.
		
		///
		// EU-Forest data.
		///
		eu: {
			// Reference key and prefix.
			key: "eu",
			
			// Collection types.
			types: {
				
				// Full resolution data.
				full: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [
							{
								name: 'count',
								fields: ["count"]
							},
							{
								name: 'species_list',
								fields: ["species_list[*]"]
							}
						],
						// Index indicator values.
						indicators: true
					}
				},
				
				// Rounded data.
				round: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [
							{
								name: 'species_list',
								fields: ["species_list[*]"]
							}
						],
						// Index indicator values.
						indicators: false
					}
				}
			}
			
		}, // EU-Forest.
		
		///
		// EUFGIS data.
		///
		eufgis: {
			// Reference key and prefix.
			key: "eufgis",
			
			// Collection types.
			types: {
				
				// Full resolution data.
				full: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [
							{
								name: 'count',
								fields: ["count"]
							},
							{
								name: 'gcu_id_number_list',
								fields: ["gcu_id_number_list[*]"]
							},
							{
								name: 'gcu_id_unit-id_list',
								fields: ["gcu_id_unit-id_list[*]"]
							}
						],
						// Index indicator values.
						indicators: true
					}
				},
				
				// Rounded data.
				round: {
					// Indexes.
					indexes: {
						// Indexed fields.
						fields: [
							{
								name: 'gcu_id_number_list',
								fields: ["gcu_id_number_list[*]"]
							},
							{
								name: 'gcu_id_unit-id_list',
								fields: ["gcu_id_unit-id_list[*]"]
							}
						],
						// Index indicator values.
						indicators: false
					}
				}
			}
			
		} // EUFGIS.
		
	}, // Domains.
	
	///
	// Indicator pairs.
	///
	pairs: {
		list: [ 'tas_pr', 'bio01_bio12', 'tas_bio12', 'bio06_vpd', 'bio14_bio15' ],
		
		///
		// X: Mean daily air temperature
		// Y: Monthly precipitation amount.
		///
		tas_pr: {
			
			// X-axis.
			X: {
				// Variable name (see data dictionary).
				term: "env_climate_tas",
				// Label.
				label: {
					iso_639_3_eng: "Mean daily air temperature."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of daily mean temperstures at 2 meters from hounrly ERA5 data."
				},
				unit: "°C"
			},
			
			// Y-axis.
			Y: {
				// Variable name (see data dictionary).
				term: "env_climate_pr",
				// Label.
				label: {
					iso_639_3_eng: "Monthly precipitation amount."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of precipitation amount flor each month. 'Amount' means mass per unit area and 'precipitation' means precipitation of water in all phases."
				},
				unit: "kg m^2 month"
			}
		},
		
		///
		// X: Mean annual air temperature
		// Y: Annual precipitation amount.
		///
		bio01_bio12: {
			
			// X-axis.
			X: {
				// Variable name (see data dictionary).
				term: "env_climate_bio01",
				// Label.
				label: {
					iso_639_3_eng: "Mean annual air temperature."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of mean annual daily mean air temperatures averaged over 1 year."
				},
				unit: "°C"
			},
			
			// Y-axis.
			Y: {
				// Variable name (see data dictionary).
				term: "env_climate_bio12",
				// Label.
				label: {
					iso_639_3_eng: "Annual precipitation amount."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of accumulated precipitation amount over 1 year."
				},
				unit: "kg m^2 year"
			}
		},
		
		///
		// X: Mean daily air temperature
		// Y: Annual precipitation amount.
		///
		tas_bio12: {
			
			// X-axis.
			X: {
				// Variable name (see data dictionary).
				term: "env_climate_tas",
				// Label.
				label: {
					iso_639_3_eng: "Mean daily air temperature."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of daily mean temperstures at 2 meters from hounrly ERA5 data."
				},
				unit: "°C"
			},
			
			// Y-axis.
			Y: {
				// Variable name (see data dictionary).
				term: "env_climate_bio12",
				// Label.
				label: {
					iso_639_3_eng: "Annual precipitation amount."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of accumulated precipitation amount over 1 year."
				},
				unit: "kg m^2 year"
			}
		},
		
		///
		// X: Mean daily minimum air temperature of coldest month
		// Y: Mean monthly vapor pressure deficit.
		///
		bio06_vpd: {
			
			// X-axis.
			X: {
				// Variable name (see data dictionary).
				term: "env_climate_bio06",
				// Label.
				label: {
					iso_639_3_eng: "Mean daily minimum air temperature of coldest month."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of the lowest temperature of any monthly daily mean maximum temperature."
				},
				unit: "°C"
			},
			
			// Y-axis.
			Y: {
				// Variable name (see data dictionary).
				term: "env_climate_vpd_mean",
				// Label.
				label: {
					iso_639_3_eng: "Mean monthly vapor pressure deficit."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of average monthly vapor pressure deficit over 1 year."
				},
				unit: "Pa"
			}
		},
		
		///
		// X: Precipitation amount of driest month
		// Y: Precipitation seasonality.
		///
		bio14_bio15: {
			
			// X-axis.
			X: {
				// Variable name (see data dictionary).
				term: "env_climate_bio14",
				// Label.
				label: {
					iso_639_3_eng: "Precipitation amount of driest month."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of the precipitation of the driest month."
				},
				unit: "kg m^2 month"
			},
			
			// Y-axis.
			Y: {
				// Variable name (see data dictionary).
				term: "env_climate_bio15",
				// Label.
				label: {
					iso_639_3_eng: "Precipitation seasonality."
				},
				// Description.
				description: {
					iso_639_3_eng: "Average, for years 1981-2010, of the standard deviation of the monthly precipitation estimates, expressed as a percentage of the mean of those estimates (i.e. the annual mean)."
				},
				unit: "kg m^2"
			}
		}
	
	} // Indicator pairs.
	
})
