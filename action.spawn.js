/* 
    CREEP BODY:
    
MOVE            50
WORK            100
CARRY           50
ATTACK          80
RANGED_ATTACK   150
HEAL            250
CLAIM           600
TOUGH           10

*/


module.exports = {
    blocked: false,
    levels: [
        {
            workerCount: 6,
            worker: [WORK, CARRY, MOVE],
            builderCount: 2,
            builder: [WORK, WORK, MOVE],
            soldier: [ATTACK, MOVE]
        },
        {
            workerCount: 4,
            worker: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
            builderCount: 2,
            builder: [WORK, WORK, MOVE],
            soldier: [ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE]
        },
        {
            workerCount: 4,
            worker: [WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            builderCount: 2,
            builder: [WORK, WORK, MOVE],
            soldier: [ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]
        }
    ],
    
    tick: function() {
        if(this.blocked) {
            console.log("Spawner blocked")
            return
        }
        level = this.getLevel()
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var workers = _.filter(Game.creeps, (creep) => creep.memory.role == 'worker');
        var soldiers = _.filter(Game.creeps, (creep) => creep.memory.role == 'soldier');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        
        var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var extensionConstructionSites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES, {
            filter: { structureType: STRUCTURE_EXTENSION }
        });
        var numExtensions = extensions.length + extensionConstructionSites.length
        
        
        if(harvesters.length < level.workerCount) {
            Game.spawns.Spawn1.createCreep(level.worker, undefined, {role: 'harvester'})
            console.log("spawn harvester")
            
        } else if(workers.length < level.workerCount) {
            Game.spawns.Spawn1.createCreep(level.worker, undefined, {role: 'worker'})
            console.log("spawn worker")
        } else if(builders.length < level.builderCount) {
            Game.spawns.Spawn1.createCreep(level.worker, undefined, {role: 'builder'})  
            console.log("spawn builder")
        } else {
            Game.spawns.Spawn1.createCreep(level.soldier, undefined, {role: 'soldier', target: Game.spawns.Spawn1.room.name})
            console.log("spawn soldier")
        }
    },
    
    getLevel: function(){
        max = Game.spawns.Spawn1.room.energyCapacityAvailable
        if (max < (300 + 5 * 50)) {
            return this.levels[0]
        } else if (max < (300 + 10*50)) {
            return this.levels[1]
        } else if (max < (300 + 20*50)) {
            return this.levels[2]
        } else {
            console.log("Update designs!")
            return this.levels[2]
        }
    }

};