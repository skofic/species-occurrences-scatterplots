# Indicator Pairs Scatterplots

This repository contains the [ArangoDB](https://www.arangodb.com) [Foxx micro services](https://www.arangodb.com/docs/stable/foxx.html) to manage species distribution scatterplot data.

The data must be compiled, the setup script of this endpoint will only create the necessary collections and indexes, to compile the data refer to the [species-distribution](https://github.com/skofic/species-distribution) repository.

The idea is to have a series of climate indicator pairs on the X and Y axis of scatterplots and three layers of data:

- *Climate*: the lowest layer contains the combination of the two indicators for the region of interest.
- *Species*: the second layer contains the same pairs of data associated with the location where species were observed.
- *Units*: the last top layer contains the pair of indicators associated with the conservation units.

These scatterplots can show how species are distributed in the climate layer and juxtaposing the units data we can see if the location of the units is marginal or not.

The climate layer is provided by [Chelsa](https://chelsa-climate.org/wp-admin/download-page/CHELSA_tech_specification_V2.pdf), the species layer by [EU-Forest](https://www.nature.com/articles/sdata2016123) and the conservation units layer by [EUFGIS](http://www.eufgis.org).

## Installation

1. You must first either install [ArangoDB](https://www.arangodb.com), or have an existing database available.
2. *Create* or *select* an existing *database*.
3. In the `Services` *left tab* press the `+ Add service` button.
4. Select the `GitHub` *top tab*, set the `Repository*` field to **skofic/species-occurrences-scatterplots** and the `Version*` field to **main**; press the `Install` button.
5. An alert will be presented requesting the `Mount point` for the service, you can provide *any suitable value*, ensure the `Run setup?` checkbox is *checked*. Press the `Install` button.

At this point the service will create the necessary *collections*, if not already there and create the necessary indexes.

## Services

The services are divided into two sections sections: one section handling *statistics* and the other providing *data*. All services are described in the ArangoDB service tabs on the database.

## License

Copyright (c) 2024 Milko Skofic

License: Apache 2