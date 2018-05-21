module.exports = {

    run: function(creep) {
	    if(creep.carry.energy > 0) {
	        this.transfer(creep) ||
	        this.build(creep) ||
	        this.upgrade(creep)
	    }
	    else {
	        target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY)
            if(target) {
                result = creep.pickup(target)
                if(result == OK) {
                    return
                } else if (result == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else {
                    creep.say(result)
                }
            }
	    }
	},
	
	transfer: function(creep) {
	    target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {filter: function(structure) {
	        return structure.energy < structure.energyCapacity
	    }})
	    if(!target) {
	        return false
	    } else {
	        result = creep.transfer(target, RESOURCE_ENERGY, Math.min(target.energyCapacity - target.energy, creep.carry.energy))
	        if(result == OK) {
	            
	        } else if(result == ERR_NOT_IN_RANGE) {
	            creep.moveTo(target)
	        } else {
	            creep.say(result)
	        }
	        return true
	    }
	},
	
	upgrade: function(creep) {
	    result = creep.upgradeController(creep.room.controller)
	    if(result == OK) {
	        
	    } else if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        } else {
            creep.say(result)
        }
        return true
	},
	
	build: function(creep) {
	    var target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
	    if(!target){
	        return false
	    } else {
            result = creep.build(target)
            if(result == OK) {
                
            } else if(result == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else if (result == ERR_INVALID_TARGET){
                creep.room.lookForAt(LOOK_CREEPS, target.pos.x, target.pos.y).forEach(function(blocker){
                    blocker.move(_.sample([TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT]))
                })
            } else {
                creep.say(result)
            }
            return true
        }
	}
};