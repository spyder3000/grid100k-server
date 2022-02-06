class Misc {
   static getRangeScore = (val) => { 
      if (isNaN(val) ||  val < 1 || val > 10) return; 
      if (val == 1) return { $gte: 0, $lte: 50 }; 
      let lowNum = (val - 1) * 50 + 5; 
      let highNum = val * 50; 
      return { $gte: lowNum, $lte: highNum }; 
   }
   static getRangeAge = (val) => { 
      if (isNaN(val) ||  val < 1 || val > 10) return; 
      if (val == 1) return { $gte: 0, $lte: 10 }; 
      let lowNum = (val - 1) * 10 + 1; 
      let highNum = val * 10; 
      return { $gte: lowNum, $lte: highNum }; 
   }
}

module.exports = Misc; 


