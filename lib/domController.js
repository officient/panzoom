var DOMRect = require('./DOMRect')

module.exports = makeDomController

function makeDomController(domElement) {
  var elementValid = (domElement instanceof HTMLElement)
  if (!elementValid) {
    throw new Error('svg element is required for svg.panzoom to work')
  }

  var owner = domElement.parentElement
  if (!owner) {
    throw new Error(
      'Do not apply panzoom to the detached DOM element. '
    )
  }

  domElement.scrollTop = 0;
  owner.setAttribute('tabindex', 1); // TODO: not sure if this is really polite

  var api = {
    getBBox: getBBox,
    getDOMRect: getDOMRect,
    getOwner: getOwner,
    applyTransform: applyTransform,
  }
  
  return api

  function getOwner() {
    return owner
  }

  function getBBox() {
    return DOMRect(
      0, 
      0, 
      domElement.clientWidth, 
      domElement.clientHeight
    )
  }

  function getDOMRect() {
    return DOMRect(
      domElement.offsetLeft,
      domElement.offsetTop,
      domElement.offsetWidth,
      domElement.offsetHeight
    )
  }

  function applyTransform(transform) {
    // TODO: Should we cache this?
    domElement.style.transformOrigin = '0 0 0';
    domElement.style.transform = 'matrix(' +
      transform.scale + ', 0, 0, ' +
      transform.scale + ', ' +
      transform.x + ', ' + transform.y + ')'
  }
}
