(function(root){
	
	function getPosition(element) {
		var _scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var _scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;

		var rect = element.getBoundingClientRect();

		// for ie <= 7, these two value will be 2
		var _top = document.documentElement.clientTop;
		var _left = document.documentElement.clientLeft;

		var top = rect.top - _top;
		var left = rect.left - _left;

		return {
			x: left + _scrollLeft,
			y: top + _scrollTop,
			top: top,
			left: left,
			width: rect.width || (rect.right - top),
			height: rect.height || (rect.bottom - left)
		}
	}

	function getRelativePosition(element) {
		var parent = element.offsetParent;

		if (parent && _getStyle(parent, 'position') !== 'static') {
			var pPos = getPosition(parent);
			var ppt = getElementMBP(parent).paddings[0];
			var pmt = getElementMBP(parent).margins[0];
			var pbt = getElementMBP(parent).borders[0];

			var ppl = getElementMBP(parent).paddings[3];
			var pml = getElementMBP(parent).margins[3];
			var pbl = getElementMBP(parent).borders[3];


			var cPos = getPosition(element);

			return {
				x: cPos.x,
				y: cPos.y,
				top: cPos.top - pPos.top - ppt - pbt,
				left: cPos.left - pPos.left - ppl - pbl,
				width: cPos.width,
				height: cPos.height
			};

		} else {
			return getPosition(element);
		}
	}

	function getElementMBP(element) {
		return {
			margins: [
				parseFloat(_getStyle(element, 'margin-top')),
				parseFloat(_getStyle(element, 'margin-right')),
				parseFloat(_getStyle(element, 'margin-bottom')),
				parseFloat(_getStyle(element, 'margin-right'))
			],
			paddings: [
				parseFloat(_getStyle(element, 'padding-top')),
				parseFloat(_getStyle(element, 'padding-right')),
				parseFloat(_getStyle(element, 'padding-bottom')),
				parseFloat(_getStyle(element, 'padding-right'))
			],
			borders: [
				parseFloat(_getStyle(element, 'border-top-width')),
				parseFloat(_getStyle(element, 'border-right-width')),
				parseFloat(_getStyle(element, 'border-bottom-width')),
				parseFloat(_getStyle(element, 'border-right-width'))
			]

		}
	}


	function _getStyle(element, prop) {
		// ie will use currentStyle
		if (window.getComputedStyle) {
	        return window.getComputedStyle(element, null).getPropertyValue(prop);
	    } else {
	        return element.currentStyle[prop];
	    }
	}

	root.position = {
		absolute: getPosition,
		relative: getRelativePosition,
		mbp: getElementMBP
	};
})(window);

