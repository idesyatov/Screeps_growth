var roleWorker = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
          }
          if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
          }
        
          if (creep.memory.upgrading) {
            creep.memory.target = undefined;
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
              creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          } else {
            if (creep.memory.target === undefined) {
                var sources = creep.room.find(FIND_SOURCES);
                let source = sources[Math.floor(Math.random() * sources.length)];
              creep.memory.target = source.id;
            }
        
            let source = Game.getObjectById(creep.memory.target);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleWorker;