module.exports = {
    
    tick: function() {
        role = {
            "harvester": "",
            "worker": "",
            "builder": "",
            "soldier": ""
        }
        
        for(i in role){
            console.log(i, _.filter(
                Game.creeps, (creep) => 
                creep.memory.role == i).length);
        }
    }
}