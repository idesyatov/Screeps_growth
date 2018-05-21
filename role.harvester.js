var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var source = _.sample(creep.room.find(FIND_SOURCES));
            result = creep.harvest(source)
            if(result == OK) {
                return
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            } else {
                creep.say(result)
            }
        }
        else {
            var spawn = Game.spawns.Spawn1
            result = creep.transfer(spawn, RESOURCE_ENERGY)
            if(result == OK){
                return
            }else if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }else if(result == ERR_FULL) {
                creep.drop(RESOURCE_ENERGY);
            } else {
                creep.say(result);
            }
        }
	}
};

module.exports = roleHarvester;