/**
 * @typedef {import('estree-jsx').Expression} Expression
 */



/**
 * @param {ReadonlyArray<Expression>} expressions
 *   Expressions.
 * @returns {Expression}
 *   Addition.
 */
export function toBinaryAddition(expressions) {
  let index = -1
  /** @type {Expression | undefined} */
  let left

  while (++index < expressions.length) {
    const right = expressions[index]
    left = left ? {type: 'BinaryExpression', left, operator: '+', right} : right
  }

  if (!left) { throw new Error('expected non-empty `expressions` to be passed'); }
  return left
}
