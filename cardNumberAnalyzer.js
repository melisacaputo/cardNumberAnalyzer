// Complete the 'CardNumberAnalyzer' class below. ----------------------------------------------------------------------
// Add as little or as many functions or extra code blocks as you see fit.
class CardNumberAnalyzer {
  constructor(cardNumber) {
    // Store the card number here.
    //Validate its format and throw an error if necessary.
    try {
      this.cardNumber = cardNumber;
      if (
        !/^(\d|\s)+$/.test(this.cardNumber) ||
        !/^(3|4|5)/.test(this.cardNumber)
      ) {
        throw new Error("Invalid card number");
      }
      this.char = this.cardNumber.slice(0, 1);
    } catch (error) {
      this.error = true;
    }
  }

  hasValidCardNumberLength() {
    // Return true if the card number's length is valid
    // for the card brand that was detected, otherwise false.
    const expected = this.getExpectedLength();
    const cardNumberLength = this.cardNumber.match(/\S/g).length;
    return expected === cardNumberLength;
  }

  getCardBrand() {
    const TYPE_MAP = {
      3: "American Express",
      4: "Visa",
      5: "Mastercard",
    };

    return TYPE_MAP[this.char];
  }

  getExpectedLength() {
    return this.char == "3" ? 15 : 16;
  }

  getCodeLocation() {
    return this.char == "3" ? "Front" : "Back";
  }

  getCodeLength() {
    return this.char == "3" ? 4 : 3;
  }

  getCardDetails() {
    if (this.error) return "Invalid card number";
    const number = this.cardNumber.replace(/\s/g, "");

    let brand = this.getCardBrand();
    let length = this.getExpectedLength();
    let valid = this.hasValidCardNumberLength();
    let location = this.getCodeLocation();
    let codeLength = this.getCodeLength();

    return {
      card: {
        number,
        bin: number.slice(0, 7),
        brand,
        expectedLength: length,
        isValid: valid,
      },
      securityCode: {
        location,
        expectedLength: codeLength,
      },
    };
  }
}

const card = new CardNumberAnalyzer("3525 4056 1313 131");
let prueba = card.getCardDetails();
console.log(prueba);
