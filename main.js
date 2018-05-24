var cleaner = require('action.cleaner');
var spawn = require('action.spawn');
var info = require('action.info');

var roleHarvester = require('role.harvester');
var roleWorker = require('role.worker');
var roleSoldier = require('role.soldier');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    cleaner.tick()
    info.tick()
    spawn.tick()
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'worker') {
            roleWorker.run(creep);
        }
        if(creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
};