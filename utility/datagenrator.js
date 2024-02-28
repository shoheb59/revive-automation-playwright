export class DataGenerator {
    
    generateRandomString()
    {
        return Math.random().toString(36).substring(2);
    }
  
    generateRandomFourDigitPhoneNumber() {
        return Math.floor(Math.random() * 9000 + 10).toString();
      }
  
  
  }