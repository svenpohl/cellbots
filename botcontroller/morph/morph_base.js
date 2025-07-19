
// morph_base.js
class MorphBase {


    constructor(startBots, targetBots, params) {
        this.startBots = startBots;
        this.targetBots = targetBots;
        this.params = params;
        this.morphLog = { bots: [], targets: [], waves: [] };
        
        // console.log("Construct base");    

    }

    async run() { throw new Error("Not implemented."); }
    
   
}

module.exports = MorphBase;
