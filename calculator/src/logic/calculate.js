import Big from "big.js";

import operate from "./operate";
import isNumber from "./isNumber";

/**
 * Given a button name and a calculator data object, return an updated
 * calculator data object.
 *
 * Calculator data object contains:
 *   total:String      the running total
 *   next:String       the next number to be operated on with the total
 *   operation:String  +, -, etc.
 */
export default function calculate(obj, buttonName) {
  if (buttonName === 'AC') {
    return {
      next: null,
      total: null,
      operation: null
    }
  }
  if (isNumber(buttonName)) {
    if (buttonName === "0" && obj.next === "0") {
      return {}
    }
    // Default return will show only single digit. Will work when next is null.
    if (obj.next == null) {
      return {
        next: buttonName
      }
    }
    // This should work when operation is present and input is number.
    if (obj.operation) {
      // If next is present.
      if(obj.next) {
        return {
          next: obj.next + buttonName,
        }
      }
      return {
        next: buttonName,
      }
    }
    // This will concatenate present digit to end of previous digit and show like a number. Will work when next is present.
    else {
      // This is added to keep start with a number after pressing 0's
      const next = obj.next === "0" ? buttonName : obj.next + buttonName;
      return {
        next: next
      }
    }
  }

  // Case for total '=' .
  if (buttonName == '=') {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null
      }
    }
    else {
      return { }
    }
  }

  // To operate after clicking on another operate button.
  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName
    }
  }

  if (!obj.next) {
    return {
      operation: buttonName
    }
  }

  // When we click on an operator. This time next should be null and total should be equal to previous next and operation is updated.
  // 1. Determine button should not be a number.

  return {
    total: obj.next,
    next:null,
    operation: buttonName
  }

}
