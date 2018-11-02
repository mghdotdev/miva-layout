import MivaLayoutComponentTree from './MivaLayoutComponentTree';

export default class MivaLayout {

	constructor( layout ) {

		var self = this;

		// validate layout object type
		if ( !Array.isArray( layout ) ) {
			throw new TypeError( '[MivaLayout] - "layout" is not an array'  );
		}

		// assign layout argument to private property
		self.$layout = { ...layout };

		// create finalized components structure
		self.components = new MivaLayoutComponentTree( layout );

		// create flat version
		self.$components = self._createFlatComponentsList( self.components );

	}

	/* ================================ Public Methods ================================ */

	toJSON() {
		return this.components;
	}

	/* ================================ Private Methods ================================ */

	_createFlatComponentsList( components ) {

		var self = this;

		return components.reduce(function( flat, component ) {

			return flat.concat( component, self._createFlatComponentsList( component.children ) );

		}, []);

	}

};