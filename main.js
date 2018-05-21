var cleaner = require('action.cleaner');
var spawner = require('action.spawner')

var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleSoldier = require('role.soldier');


module.exports.loop = function () {
    cleaner.tick()
    spawner.tick()
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'soldier'){
            roleSoldier.run(creep)
        }
    }
};