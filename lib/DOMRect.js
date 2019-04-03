
/**
 * Behaves similar to a bounding rect.
 * A drop-in polyfill for IE11
 * 
 * Enables top, left, right, bottom props
 * if given x, y, width, height
 */
module.exports = function DOMRect (x, y, width, height) {
  if (!x) x = 0
  if (!y) y = 0
  if (!width) width = 0
  if (!height) height = 0

  return {
    x: x,
    y: y,
    width: width,
    height: height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height
  }
}
